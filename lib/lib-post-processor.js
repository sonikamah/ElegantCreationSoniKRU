"use strict";
module.exports.send = function(req, res, next) {
    switch (req.method) {
        case "GET":
            //get method
            res.status(200).send({});
            break;
        case "POST":
            //post method
            res.status(201).send({});
            break;
        case "PUT":
            //put method
            res.status(200).send({});
            break;
        case "DELETE":
            //delete method
            res.status(204).send({});
            break;
        default:

    }
    return next();
};