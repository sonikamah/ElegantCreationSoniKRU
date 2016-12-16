'use strict';
angular.module('appCreation')
    .controller('SigninController', [
        '$scope',
        '$state',
        '$location',
        '$http','$rootScope', 
        function($scope, $localStorage, $state, $location, $http,$rootScope) {
            console.log("********** signin controller ***********");
            $('.banner').remove();
    }]);
