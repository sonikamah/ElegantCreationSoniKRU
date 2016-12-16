module.exports = {
    module: 'home',
    controllers: {
        'index': 'home/controllers/index'
    },
    routers: {
        'home': {
            route: '/',
            controller: 'index',
            action: 'index',
            type: 'get'
        },
        'get': {
            route: '/get',
            controller: 'index',
            action: 'get',
            type: 'get'
        },
        'post': {
            route: '/post',
            controller: 'index',
            action: 'post',
            type: 'post'
        },
        'put': {
            route: '/put',
            controller: 'index',
            action: 'put',
            type: 'put'
        },
        'delete': {
            route: '/delete',
            controller: 'index',
            action: 'delete',
            type: 'delete'
        }
    }
};