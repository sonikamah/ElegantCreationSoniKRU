"use strict";
module.exports = {
    /**
     * to generate random string combination of alpha-numeric
     * @returns {String}
     */
    generateRandom: function () {
        return Math.random().toString(36).substr(3, 8);
    },
    /**
     * checks is values is empty or not
     * @param {mixed} value
     * @returns {mixed}
     */
    isEmpty: function (value) {
        return value && value.length;
    },
    /**
     * fetch errors from error object with error code(internal)
     * @param {object} req
     * @param {object} res
     * @param {object} errors
     * @returns {object}
     */
    _getErrors: function (errors) {
        var messages = {};
        try {
            if (errors.name !== 'undefined' && errors.name === 'ValidationError') {
                var errs = {};
                for (var key in errors.errors) {
                    if (errors.errors.hasOwnProperty(key)) {
                        errs[key] = errors.errors[key].message;
                        if (errs[key].indexOf("Path")) {
                            errs[key] = errs[key].replace("Path ", "");
                        }
                    }
                }
                messages.code = 400;
                messages.message = errs;
                return messages;
            } else if (errors.message !== 'undefined' && errors.code !== 'undefined') {
                messages.code = 500;
                messages.message = errors.message;
                return messages;
            } else {
                return errors;
            }
        } catch (e) {
            messages.code = 500;
            messages.message = e.toString();
            return messages;
        }
    },
    /**
     * common method to handle all errors
     * @param {object} res
     * @param {object} errors
     */
    errorHandler: function (res, errors) {
        var error = this._getErrors(errors);
        if (error.code && error.message) {
            res.status(error.code).send(error);
        } else {
            res.status(500).send({
                "message": "unknown error",
                "code": 500
            });
        }
    },
    /**
     * parse/fetch all cookies from the response
     * @param {type} res
     * @returns {String} ncookie
     */
    parseCookies: function (res) {
        var cookies = res.headers['set-cookie'];
        var ncookies = "";
        _.each(cookies, function (val, key) {
            //var dataCookie = getCookie(val.split(";")[0] + '; Expires=' + new Date(new Date().getTime() + 86409000).toUTCString());
            if (key === 0) {
                ncookies += val.split(";")[0];
            } else {
                ncookies += ";" + val.split(";")[0];
            }
        });
        return ncookies;
    },
    /**
     * fetches cookie from cookie string
     * @param {type} cookie
     * @returns {@var;t}
     */
    getCookie: function (cookie) {
        var t, j;
        cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
        for (var x = 0; x < cookie.length; x++) {
            cookie[x] = cookie[x].split("; ");
            j = cookie[x][0].split("=");
            t = {
                key: j[0],
                value: j[1]
            };
            for (var i = 1; i < cookie[x].length; i++) {
                j = cookie[x][i].split("=");
                t[j[0]] = j[1];
            }
            cookie[x] = t;
        }
        return cookie;
    },
    /**
     * 
     * @param {type} dataCookie
     * @returns {String}convert cookie to string
     */
    cookieToString: function (dataCookie) {
        var t = "";
        for (var x = 0; x < dataCookie.length; x++) {
            t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
        }
        return t;
    },
    /**
     * 
     * @param {type} options
     * @returns {module.exports.dispatchRequest.def|nm$_lib-common.module.exports.dispatchRequest.def|Module.exports.dispatchRequest.def}
     */
    dispatchRequest: function (options) {
        var body = "";
        var def = _.Deferred();
        var req = G.https.request(options.options, function (res) {
            res.setEncoding('utf8');
            if (typeof options.log !== 'undefined' && env === 'development') {
                G.fs.unlink("./logs/" + options.log, function () {
                });
            }
            res.on('data', function (chunk) {
                if (typeof options.log !== 'undefined' && env === 'development') {
                    G.fs.writeFile("./logs/" + options.log, chunk, {flag: 'a'});
                }
                body += chunk;
            });
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
            def.reject(e);
        });
        req.on('end', function () {
            console.log("safe-pass sent.");
            def.resolve(body);
        });
        if (typeof options.form !== 'undefined' && options.options.method === 'POST') {
            req.write(options.form);
        }
        req.end();
        return def;
    },
    /**
     * Auth token generator
     * @param {type} user
     * @returns {string}
     */
    authTokenGenerate: function (user) {
        var payload = {
            sub: user._id,
            iat: G.moment().unix(),
            exp: G.moment().add(G.serverCfg['app']['auth']['expiry'], 'days').unix()
        };
        var encodedToken = "";
        try {
            encodedToken = G.jwt.encode(payload, G.serverCfg['app']['auth']['token_secret']);
        } catch (e) {
        }
        return encodedToken;
    },
    /**
     * Decode token payload
     * @returns {object}
     */
    decodeToken: function (token) {
        var decodedToken = "";
        try {
            decodedToken = G.jwt.decode(token, G.serverCfg['app']['auth']['token_secret']);
        } catch (e) {
        }
        return decodedToken;
    },
    /**
     * 
     * @param {type} self
     * @returns {object.sub|module.exports.decodeToken.decodedToken.sub}
     */
    getUserId: function (self) {
        var token = self.request.headers.authorization.split(' ')[1];
        var payload = this.decodeToken(token);
        return payload.sub;
    },
    /**
     * 
     * @param {type} seconds
     * @returns {module.exports.getTime.time|String|Module.exports.getTime.time}
     */
    getTime: function (seconds) {
        var sec_num = parseInt(seconds, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = "00:00";
        if (hours == "00") {
            time = minutes + ':' + seconds;
        } else {
            time = hours + ':' + minutes + ':' + seconds;
        }
        return time;
    },
    /**
     * 
     * @returns {unresolved}
     */
    getSMTPTransport: function () {
        return G.nodemailer.createTransport("SMTP", G.serverCfg.smtp);
    },
    /**
     * read range header
     * @param {type} range
     * @param {type} totalLength
     * @returns {module.exports.readRangeHeader.result}
     */
    readRangeHeader: function (range, totalLength) {

        /*
         
         * Example of the method 'split' with regular expression.
         
         *
         * Input: bytes=100-200
         * Output: [null, 100, 200, null]
         *
         * Input: bytes=-200
         * Output: [null, null, 200, null]
         */
        if (range == null || range.length == 0)
            return null;
        var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
        var start = parseInt(array[1]);
        var end = parseInt(array[2]);
        var result = {
            Start: isNaN(start) ? 0 : start,
            End: isNaN(end) ? (totalLength - 1) : end
        };
        if (!isNaN(start) && isNaN(end)) {
            result.Start = start;
            result.End = totalLength - 1;
        }
        if (isNaN(start) && !isNaN(end)) {
            result.Start = totalLength - end;
            result.End = totalLength - 1;
        }
        return result;
    },
    /**
     * 
     * @param {type} res
     * @param {type} responseCode
     * @param {type} responseHeaders
     * @param {type} readable
     * @returns {undefined}
     */
    sendResponse: function (res , responseCode, responseHeaders, readable) {
        var fstream = readable;
        fstream.once('open', function (fd) {
            _.each(responseHeaders, function(val, key){
                res.set(key, val);
            });
            setTimeout(function () {
                fstream.pipe(res);
                res.writeHead(responseCode);
                fstream.once('end', function () {
                    next(false);
                });
            }, 1000);
        });
    }
};