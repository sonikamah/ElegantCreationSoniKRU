"use strict";
var clc = require('cli-color');
module.exports.color = {
    error: function(message) {
        console.log(clc.red(message));
    },
    warn: function(message) {
        console.log(clc.yellow(message));
    },
    notice: function(message) {
        console.log(clc.blue(message));
    },
    info: function(message) {
        console.log(clc.cyan(message));
    }
};