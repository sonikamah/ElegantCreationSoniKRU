module.exports = {
    module: 'products',
    controllers: {
        'products-controller': 'products/controllers/products-controller'
    },
    models: {
        'product': 'products/models/product'
    },
    routers: {
        'products': {
            route: '/products',
            controller: 'products-controller',
            action: 'getProducts',
            type: 'get'
        }
    }
};