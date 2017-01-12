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
                if(existingCart) {
                    for (var prod in existingCart) {
                        if (existingCart[prod].imagepath === product.imagepath) {
                            console.log("product already exist in cart ...");
                            return ;
                        } else {
                            return existingCart.push(product);
                        }
                    }
                } else {
                    $localStorage.cart = [];
                    $localStorage.cart.push(product);
                }
            

                // if(!storedItem) { // not retieving stored item
                //     storedItem = { item: product , qty: 0 , price: 0 };
                // }
                // storedItem.qty++;
                // storedItem.price = storedItem.item.price * storedItem.qty;

                // this.totalQty++;
                // this.totalPrice +=  storedItem.price

                // $localStorage.cart = storedItem;
            }

            
            $('.banner').remove();
            $(".header").css("background-image", "none");
    }]);
