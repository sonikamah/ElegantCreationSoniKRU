"use strict";
module.exports = G.baseController.extend({
    //actions
    login: function () {
        var def = _.Deferred();
        var params = this.getParams();
        var userModel = this.getModel('user');

        userModel.save({username: params.username, password: params.password}).done(function() {
            def.resolve( {message: "success"} );
        }).fail(function() {
            def.reject({message: "error"});
        });
        return def;
    },
    signin: function() {
        var def = _.Deferred();
        var params = this.getParams();
        var userModel = this.getModel('user');

        userModel.getAllLogin({username: params.username}).done(function(response) {
            return def.resolve(response);
        }).fail(function() {
            return def.reject({message: "error"});
        });
        return def;
    }
});