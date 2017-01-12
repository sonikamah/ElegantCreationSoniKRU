"use strict";
module.exports = G.baseController.extend({
    
    //actions 
    getProducts: function() {
        var def = _.Deferred();
        var productModel = this.getModel('product');

        productModel.get().done(function(response) {
            return def.resolve(response);
        }).fail(function() {
            return def.reject({message: "error"});
        });
        return def;
    }
});