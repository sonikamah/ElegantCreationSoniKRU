'use strict';
angular.module('appCreation')
    .controller('ProductsController', [
        '$scope',  '$localStorage','ProductsService',
        function($scope, $localStorage, ProductsService) {
            
            console.log("********** products controller ***********");

            // load the products
            ProductsService.getProducts().then(
                function(response) {
                    console.log('success in getting products !!!');
                    $scope.products = response;
                } , 
                function(error) {
                    console.log(error);
                });
            
            

            $scope.addToCart = function(product) {

                var existingCart = $localStorage.cart ;
                var storedItemID;

                if(existingCart) {
                    for (var prod in existingCart) {
                        storedItemID = existingCart[prod].product.productId;
                        if(storedItemID === product.productId) {
                            existingCart[prod].qty ++;
                            existingCart[prod].price = product.price * existingCart[prod].qty;
                            return;
                        }
                    }
                    // if the cart is not stored one , then add it to localStorage cart .
                   $localStorage.cart.push({ product: product , qty: 0 , price: 0 });            
                } else { 
                    // first entry in the cart
                    $localStorage.cart = [];
                    $localStorage.cart.push({ product: product , qty: 0 , price: 0 });
                }
            }

            
            $('.banner').remove();
            $(".header").css("background-image", "none");
    }]);
