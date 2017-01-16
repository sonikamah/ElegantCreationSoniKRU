'use strict';
angular.module('appCreation')
    .controller('CartCheckoutController', [
        '$scope',
        '$localStorage',
        function($scope, $localStorage) {
            console.log("********** cart-checkout controller ***********");
           
            $('.banner').remove();
            $(".header").css("background-image", "none");
            
            // Stripe Response Handler
            $scope.stripeCallback = function (code, result) {
                if (result.error) {
                    window.alert('it failed! error: ' + result.error.message);
                } else {
                    window.alert('success! token: ' + result.id);
                }
        

            // Simple POST request example (passing data) :
                $http.post('/charge', result)
                .success(function(data, status, headers, config) {
                    alert(data);
                })
                .error(function(data, status, headers, config) {
                    alert(data);
                });
                
            };
    }]);
