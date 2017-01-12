module.exports = {
    module: 'auth',
    controllers: {
        'authentication': 'auth/controllers/authentication'
    },
    models: {
        'user': 'auth/models/user'
    },
    routers: {
        'login': {
            route: '/login',
            controller: 'authentication',
            action: 'login',
            type: 'post'
        },
        'signin': {
            route: '/signin',
            controller: 'authentication',
            action: 'signin',
            type: 'post'
        }
    }
};