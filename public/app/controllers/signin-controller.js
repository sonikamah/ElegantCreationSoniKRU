'use strict';
angular.module('appCreation')
    .controller('SigninController', [
        '$scope',
        '$state',
        '$location',
        '$http', '$rootScope', 'SigninService', '$localStorage',
        function ($scope, $state, $location, $http, $rootScope, SigninService, $localStorage) {

            $scope.loginFormData = {};
            $scope.signinData = {};

            $scope.signup = function () {

                SigninService.signup($scope.loginFormData)
                    .then(function (response) {
                        console.log(response);

                        //after successful signup delete the login form details
                        delete $scope.loginFormData;
                    }, function (error) {
                        console.log(error);
                    });
            }

            $scope.signin = function () {

                SigninService.signin($scope.signinData)
                    .then(function (response) {
                    // after successful signup delete the login form details.
                    $localStorage.loginData = response;
                    $scope.isLogin = true;

                    }, function (error) {
                        console.log(error);
                    });
            }


            $('.banner').remove();
            $(".header").css("background-image", "none");
        }
    ]);