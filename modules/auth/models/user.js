module.exports = G.baseModel.extend({
    collection: "users",
    schema: {
        username: {type: String},
        password: {type: String}
    },
    save: function (user) {
        var def = _.Deferred();
        var self = this;
        var schema = new self(user);
        schema.save(function (err, result) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(result);
            }
        });
        return def;
    },
    getAllLogin : function(userdata) {
        var def = _.Deferred();
        var self = this;

        this.find({},function(err, docs) {
            console.log("Getting login data from db");

            docs.forEach(function(user) {
                if(user.username === userdata.username){
                    return def.resolve(user);
                }else{
                    def.reject("not able to login..");
                }
                //console.log("----" + user)
            });
        });
        return def;
    },
    get: function (id) {
        var def = _.Deferred();

        console.log(id);
        this.findById(id, "-__v", function (err, activity) {
            if (!err) {
                def.resolve(activity);
            } else {
                def.resolve(err);
            }
        });
        return def;
    }
});