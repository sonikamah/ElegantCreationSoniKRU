"use strict";
module.exports = G.baseController.extend({
    //actions
    index: function () {
        return {"message": "RestServer - Sample Response"};
    },
    get: function () {
        return {"message": "GET Call"};
    },
    post: function () {
        return {"message": "POST Call"};
    },
    put: function () {
        return {"message": "PUT Call"};
    },
    delete: function () {
        return {"message": "DELETE Call"};
    }
});