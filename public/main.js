require.config({
    baseUrl: "js",    
    paths: {
        'jquery': '/node_modules/jquery/dist/jquery.min.js',
        'angular': '/node_modules/angular/angular.min.js',
        'angular-ui-router': '/node_modules/angular-ui-router/release/angular-ui-router.min.js'
    },
    shim: { 'angular-route': ['angular'] },
    deps: ['app']
});