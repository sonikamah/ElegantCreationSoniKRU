'use strict';
angular.module('appCreation')
    .controller('CartCheckoutController', [
        '$scope',
        '$localStorage',
        '$state',
        '$location',
        '$http','$rootScope', 
        function($scope, $localStorage, $state, $location, $http,$rootScope) {
            console.log("********** cart-checkout controller ***********");
           
            $('.banner').remove();
            $(".header").css("background-image", "none");
            
    }]);
