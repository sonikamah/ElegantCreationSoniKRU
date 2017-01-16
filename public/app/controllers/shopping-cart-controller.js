'use strict';
angular.module('appCreation')
    .controller('ShoppingCartController', [
        '$scope',
        '$localStorage',
        function($scope, $localStorage) {
            console.log("********** shopping cart controller ***********");
           
            $('.banner').remove();
            $(".header").css("background-image", "none");
            
            // showing total count of selected cart.
            if($localStorage.cart){
                $scope.totalItemsCount = $localStorage.cart.length;
            } else {
                $scope.totalItemsCount = 0;
            }
            
            $scope.totalItems = $localStorage.cart;

            // $scope.totalPrice = ;
    }]);
