'use strict';
angular.module('appCreation')
    .controller('CartCheckoutController', [
        '$scope',
        '$state',
        '$location',
        '$http','$rootScope', 
        function($scope, $localStorage, $state, $location, $http,$rootScope) {
            console.log("********** cart-checkout controller ***********");
            $('.banner').remove();
            //$(".banner").css("background", "");
    }]);
