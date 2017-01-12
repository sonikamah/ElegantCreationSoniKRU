"use strict";
var Bootstrap = function () {
    var winston = require('winston');
    var path = require('path');
    GLOBAL._ = require('underscore')._;
    _.mixin(require('underscore.deferred'));
    var serverConfig = require(baseDir + '/config/server.config')();
    var modelCache = [];
    var pluginCache = [];
    /**
     * check application environment in pre-defined configurations
     */
    if (env !== serverConfig.env) {
        env = "development";
    }
    return _.extend({
        /**
         * Init application
         */
        _init: function () {
            this._initGlobals();
            this._registerEvents();
            this._configureServer(function () {
                this._initDB();
            });
        },
        /**
         * init globals, configurations and packages
         */
        _initGlobals: function () {
            GLOBAL.G = {};
            G.env = env;
            G.express = require('express');
            G.app = G.express();
            G.router = G.express.Router();
            G.favicon = require('serve-favicon');
            G.mongoose = require('mongoose');
            G.clogger = require(baseDir + '/lib/lib-color');
            G.libCommon = require(baseDir + '/lib/lib-common');
            G.routes = require(baseDir + '/config/routes');
            G.globalCfg = _.extend(require(baseDir + '/config/global.config'));
            G.serverCfg = serverConfig;
            G.baseController = require(baseDir + "/lib/base/controllers/baseStandardController");
            G.baseModel = require(baseDir + "/lib/base/models/baseModel");
            G.fs = require('fs');
            G.moment = require('moment');
            G.event = new (require("events").EventEmitter);
            G.qs = require('querystring');
            G.jwt = require('jwt-simple');
            G.fse = require('fs-extra');
            G.nodemailer = require("nodemailer");
            G.mime = require('mime');
            G.path = require('path');
            G.bcrypt = require('bcryptjs');
            G.expressSession = require('express-session');
        },
        /**
         * register application events
         */
        _registerEvents: function () {
            G.event.on("request.post.dispatch", function (httpObj) {
                //self._postDispatch(httpObj.request, httpObj.response);
            });
        },
        /*
         * initialize db and connection
         */
        _initDB: function () {
            var self = this;
            //mongodb connection
            var db = G.serverCfg.mongo;
            var dsn = "mongodb://" + db.host + ":" + db.port + "/" + db.database;
            G.mongoose.connect(dsn);
            G.mongoose.connection.on('error', function (err) {
                G.mongoose.connection.isConnected = false;
                G.mongoose.connection.errors = err;
                self.wlogger.error("MongoDB " + err.toString());
            });
            G.mongoose.connection.once('open', function () {
                G.mongoose.connection.isConnected = true;
            });
            G.mongoose.connection.on('connected', function () {
                self.wlogger.info('Mongoose default connection open to ' + dsn);
                /*
                 * modules initialization
                 */
                self.initModules();
            });
            G.mongoose.connection.on('disconnected', function () {
                self.wlogger.error('Mongoose default connection disconnected');
            });

        },
        /**
         * configure server
         * @param {type} cb
         * @returns {undefined}
         */
        _configureServer: function (cb) {
            var self = this,
                    _logger = require('morgan'),
                    bodyParser = require('body-parser'),
                    fsr = require('file-stream-rotator');

            /**
             * TODO:
             * Configure Views
             */
            //G.app.set('views', path.join(__dirname, 'views'));
            //G.app.set('view engine', 'ejs');

            if (env !== process.env.ENV) {
                this.wlogger.warn('No Matching ENVIRONMENT has been found, So it has been considered as "' + serverConfig.env + '"');
            }
            /**
             * Generating logs directory
             */
            if (G.fs.existsSync(path.join(baseDir, 'logs', env))) {
            } else {
                G.fse.mkdirpSync(path.join(baseDir, 'logs', env));
            }

            /*
             * set env for app
             */
            G.app.set('env', G.serverCfg.env);

            /*
             * set port for app
             */
            G.app.set('port', G.serverCfg.port || 3000);

            /*
             * global parameters/config
             */
            G.app.locals = {
                appName: G.globalCfg.appName,
                appDomain: G.serverCfg.app.domain,
                appDetails: G.globalCfg.appDetails,
                moment: G.moment
            };

            /*
             * logger configuration
             */
            if (G.app.set('env') === "development") {
                G.app.use(_logger('dev'));
            } else {
                var accessLogStream = fsr.getStream({
                    date_format: 'YYYYMMDD',
                    filename: path.join(baseDir, 'logs', env, '/access-%DATE%.log'),
                    frequency: 'daily',
                    verbose: false
                })
                var httpLog = _logger('combined', {
                    format: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
                    stream: accessLogStream
                });
                G.app.use(httpLog);
            }

            /*
             * configure parsers
             */
            G.app.use(bodyParser.json());
            G.app.use(bodyParser.urlencoded({extended: true}));

            /**
             * Serve static files
             * @type type
             */
            G.app.use(G.express.static(baseDir + '/public'));
            G.app.use(G.express.static(baseDir + '/'));

            /*
             * request dispatcher to add x-powered-by header
             */
            G.app.use(function (req, res, next) {
                res.setHeader('X-Powered-By', 'CodeByte v'+require("./package.json").version);
                next();
            });
            
            /**
             * serve index.html
            **/
            G.app.all('/*', function (req, res, next) {
                var regex = new RegExp(/^\/service\//)
                if (!req.path.match(regex)) {
                    res.sendFile(baseDir + '/public/index.html');
                }else{
                    next();
                }
            });


            /*
             * load module configurations
             */
            G.modulesConfig = this.loadModules(G.globalCfg.modules);

            /*
             * centralized error handling and logging it to the file located in logs directory
             */
            process.on('uncaughtException', function (err) {
                if (err && err.stack) {
                    self.wlogger.error("\n" + err.stack + "\n");
                } else {
                    self.wlogger.error("\n" + err + "\n");
                }
            });

            /*
             * close connection on process termination
             */
            process.on('SIGINT', function () {
                G.mongoose.connection.close(function () {
                    self.wlogger.info('Mongoose default connection disconnected through app termination.');
                    process.exit(0);
                });
            });
            /*
             * close connection on process exit
             */
            process.on('exit', function () {
                G.mongoose.connection.close(function () {
                    self.wlogger.info('Mongoose default connection disconnected through app process exit.');
                    process.exit(0);
                });
            });

            cb.apply(this);
        },
        /**
         * Load all modules into memory
         * @param {type} modules
         * @returns {Bootstrap.Anonym$0.loadModules.config}
         */
        loadModules: function (modules) {
            var moduleBaseDir = path.join(baseDir, 'modules');
            var config = {};
            config.config = {};
            config.routers = {};
            config.controllers = {};
            config.models = {};
            config.plugins = {};
            _.each(modules, function (val) {
                try {
                    config.config[val] = require(path.join(moduleBaseDir, val, "module.config"));
                    config.routers[val] = config.config[val].routers;
                    config.controllers[val] = config.config[val].controllers;
                    config.models = _.extend(config.models, config.config[val].models);
                    config.plugins = _.extend(config.plugins, config.config[val].plugins);
                } catch (e) {
                    return new Error(e.toString());
                }
            });
            return config;
        },
        wlogger: new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    json: false,
                    timestamp: true,
                    colorize: true
                }),
                new winston.transports.File({
                    filename: path.join(baseDir, 'logs', env, 'debug.log'),
                    json: false
                })
            ],
            exceptionHandlers: [
                new (winston.transports.Console)({
                    json: true,
                    timestamp: true
                }),
                new winston.transports.File({
                    filename: path.join(baseDir, 'logs', env, 'error.log'),
                    json: false
                })
            ],
            colors: {
                info: 'cyan',
                error: 'red',
                warn: 'yellow'
            },
            exitOnError: false
        }),
        /**
         * initialize all modules
         * @returns {undefined}
         */
        initModules: function () {
            var moduleRoutes = G.modulesConfig.routers;
            var moduleControllers = G.modulesConfig.controllers;
            var moduleBaseDir = path.join(baseDir, 'modules');
            var moduleStack = {};

            /*
             * register all controllers
             */
            _.each(moduleControllers, function (mKey, mVal) {
                _.each(mKey, function (cKey, cVal) {
                    moduleStack[mVal] = moduleStack[mVal] || {};
                    moduleStack[mVal][cVal] = require(path.join(moduleBaseDir, cKey));
                });
                if (Object.keys(moduleStack).length === Object.keys(moduleControllers).length) {
                    this.moduleStack = _.extend({}, moduleStack);
                    this.emit('ready:moduleStack');
                }
            }, this);

            /*
             * register all routes
             */
            var self = this;
            //console.log(moduleRoutes);
            _.each(moduleRoutes, function (rmKey, rmVal) {
                _.each(rmKey, function (rKey, rVal) {
                    var funcName = "";
                    var responseCode = 200;
                    switch (rKey.type) {
                        case 'get':
                            funcName = 'get';
                            responseCode = 200;
                            break;
                        case 'post':
                            funcName = 'post';
                            responseCode = 201;
                            break;
                        case 'delete':
                            funcName = 'delete';
                            responseCode = 204;
                            break;
                        case 'put':
                            funcName = 'put';
                            responseCode = 204;
                            break
                    }
                    G.app[funcName]('/service'+rKey.route.toString(), function (req, res, next) {
                        if (!req.headers.authorization && G.routes['whiteList'].indexOf(rKey.route.toString()) === -1) {
                            return res.status(401).send({message: 'Unauthorized.'});
                        }
                        if (!_.isUndefined(req.headers.authorization)) {
                            var token = req.headers.authorization.split(' ')[1];
                            G.authPayload = G.libCommon.decodeToken(token);
                            if (G.authPayload.exp <= G.moment().unix()) {
                                return res.status(401).send({message: 'Token has been expired'});
                            }
                        }
                        var initObj = {};
                        initObj.controller = rKey.controller;
                        initObj.action = rKey.action;
                        initObj.module = rmVal;
                        initObj.dispatched = true;
                        initObj.request = req;
                        initObj.response = res;
                        initObj.responseCode = responseCode;
                        try {
                            var controller = new moduleStack[rmVal][rKey.controller](initObj);
                        } catch (e) {
                            self.wlogger.error(e.toString());
                        }
                        var returnData = controller[rKey.action]();
                        if (!_.isUndefined(returnData)) {
                            if (self.isDeferred(returnData)) {
                                returnData.done(function (defReturnData) {
                                    var respCode = res.responseCode || responseCode;
                                    res.status(respCode).send(defReturnData);
                                }).fail(function (err) {
                                    var respCode = res.responseCode || 500;
                                    res.status(respCode).send(err);
                                });
                            } else {
                                var respCode = res.responseCode || responseCode;
                                res.status(respCode).send(returnData);
                            }
                        }
                    });
                }, this);
            }, this);
        },
        moduleStack: {},
        isDeferred: function (obj) {
            if (typeof obj['done'] === 'function' && typeof obj['resolve'] === 'function') {
                return true;
            }
            return false;
        },
        getController: function (module, controller) {
            return this.moduleStack[module][controller];
        },
        getModel: function (modelName) {
            var modelPath = null;
            try {
                modelPath = path.join(baseDir, 'modules', G.modulesConfig.models[modelName]);
            } catch (e) {
                this.wlogger.error("Model: " + modelName + " dose not exists.");
            }
            var existingModel = _.findWhere(modelCache, {name: modelName});
            if (existingModel) {
                return existingModel['data'];
            }
            var data = require(modelPath);
            modelCache.push({name: modelName, data: data});
            return data;
        },
        getPlugin: function (pluginName) {
            var pluginPath = path.join(baseDir, 'modules', G.modulesConfig.plugins[pluginName]);
            var existingPlugin = _.findWhere(pluginCache, {name: pluginName});
            if (existingPlugin) {
                return existingPlugin['data'];
            }
            var data = require(pluginPath);
            pluginCache.push({name: pluginName, data: data});
            return data;
        },
        /**
         * start server
         */
        startServer: function () {
            var self = this,
                    http = require('http');
            //create server
            var server = http.createServer(G.app);
            //if cors is enabled
            if (G.globalCfg.CORS.hasOwnProperty("isEnabled") && G.globalCfg.CORS.isEnabled) {
                G.app.use(function (req, res, next) {
                    if (G.globalCfg.CORS.hasOwnProperty("domains")) {
                        res.setHeader("Access-Control-Allow-Origin", G.globalCfg.CORS.domains.join(", "));
                    }
                    if (G.globalCfg.CORS.hasOwnProperty("allowHeaders")) {
                        res.setHeader("Access-Control-Allow-Headers", G.globalCfg.CORS.allowHeaders.join(", "));
                    }
                    if (G.globalCfg.CORS.hasOwnProperty("exposeHeaders")) {
                        res.setHeader("Access-Control-Expose-Headers", G.globalCfg.CORS.exposeHeaders.join(", "));
                    }
                    next();
                });
            }
            /**
             * Set Default Headers
             */
            G.app.use(function (req, res, next) {
                _.each(G.globalCfg.defaultHeaders, function (headerKey, headerValue) {
                    res.setHeader(headerValue, headerKey);
                });
                next();
            });

            server.on('error', function (e) {
                if (e['code'] === 'EADDRINUSE') {
                    self.wlogger.error("Address in use, Port " + G.app.get('port') + " is already occupied.");
                } else {
                    self.wlogger.error(e.toString());
                }
            });
            server.listen(G.app.get('port'), function () {
                if (env === process.env.ENV) {
                    self.wlogger.info("Server has been started on port " + G.serverCfg.port + " ENV=" + env);
                } else {
                    self.wlogger.warn('Server has been started on port ' + G.serverCfg.port + " and ENVIRONMENT has been considered as " + env);
                }
            });
        }
    }, require("events").EventEmitter.prototype);
};
module.exports = Bootstrap;