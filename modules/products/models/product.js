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
                    productId: 101,
                    imagepath: '/images/pic-1.jpg',
                    info: 'Black and Purple Dress 1',
                    price: 30
                },
                {
                    productId: 102,
                    imagepath: '/images/pic-2.jpg',
                    info: 'Black and Purple Dress 2',
                    price: 200
                },
                {
                    productId: 103,
                    imagepath: '/images/pic-3.jpg',
                    info: 'Black and Purple Dress 3',
                    price: 70
                },
                {
                    productId: 104,
                    imagepath: '/images/pic-4.jpg',
                    info: 'Black and Purple Dress 4',
                    price: 90
                },
                {
                    productId: 105,
                    imagepath: '/images/pic-5.jpg',
                    info: 'Black and Purple Dress 5',
                    price: 60
                }
            ];
        return def.resolve(json);

    }
});