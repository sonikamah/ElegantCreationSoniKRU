var baseController = function(init) {
    this.response = false;
    this.request = false;
    this.module = false;
    this.controller = false;
    this.action = false;
    this.responseCode = 200;
    if (init.dispatched) {
        this.response = init.response;
        this.request = init.request;
        this.module = init.module;
        this.controller = init.controller;
        this.action = init.action;
    }
    /**
     * Call the constuctor function
     */
    this.initialize.apply(this);
};
/**
 * method for extend
 * @param {type} properties
 * @returns {Object}
 */
baseController.extend = function(properties) {
    var parent = this;
    var child = function() {
        return parent.apply(this, arguments);
    };
    var Surrogate = function() {
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
    _.extend(child.prototype, properties);
    return child;
};
baseController.prototype = {
    initialize: function() {
    },
    /**
     * set ResponseCode
     * @param {type} type
     * @returns {module.exports.prototype}
     */
    setResponseCode: function(code) {
        this.response.responseCode = code;
        return this;
    },
    /**
     * get response code
     * @returns {code}
     */
    getResponseCode: function() {
        return this.response.responseCode;
    },
    /**
     * get all parameters
     * @returns {object}
     */
    getParams: function() {
        var routeParams = this.request.params;
        var postParams = this.request.body;
        var queryParams = this.request.query;
        var files = this.request.files;
        var params = _.extend(routeParams, postParams, queryParams, files);
        return params;
    },
    /**
     * get a single parameter
     * @param {type} name
     * @returns {module.exports.prototype@pro;request@call;param}
     */
    getParam: function(name) {
        return this.request.params[name];
    },
    /**
     * url redirector / redirect helper
     * @param {type} route
     */
    redirect: function(route) {
        this.response.redirect(route);
    },
    getModel: function(modelName) {
        return G.Bootstrap.getModel(modelName);
    },
    noCache: function() {
        this.response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        this.response.header('Expires', '-1');
        this.response.header('Pragma', 'no-cache');
    }
};
module.exports = baseController;