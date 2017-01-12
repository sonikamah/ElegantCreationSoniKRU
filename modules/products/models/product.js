module.exports = G.baseModel.extend({
    collection: "products",
    schema: {
        imagePath: {type: String},
        info: {type: String},
        price: {type: String}
    },
    get: function () {
        var def = _.Deferred();

        var json = [
                {
                    imagepath: '/images/pic-1.jpg',
                    info: 'Black and Purple Dress',
                    price: '10'
                },
                {
                    imagepath: '/images/pic-2.jpg',
                    info: 'Black and Purple Dress',
                    price: '10'
                },
                {
                    imagepath: '/images/pic-3.jpg',
                    info: 'Black and Purple Dress',
                    price: '10'
                },
                {
                    imagepath: '/images/pic-4.jpg',
                    info: 'Black and Purple Dress',
                    price: '10'
                },
                {
                    imagepath: '/images/pic-5.jpg',
                    info: 'Black and Purple Dress',
                    price: '10'
                }
            ];
        return def.resolve(json);

    }
});