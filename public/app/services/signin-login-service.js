'use strict';
angular.module('appCreation')
    .service('SigninService', function ($q, $http) {

        this.signup = function (userLoginData) {
            var defered = $q.defered;
            
            return $http({
                    method: 'POST',
                    url: '/service/login',
                    data: userLoginData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    return response.config.data;
                });
        }

        this.signin = function (siginData) {
            var defered = $q.defered;
            
            return $http({
                    method: 'POST',
                    url: '/service/signin',
                    data: siginData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    console.log(response);
                    return response.config.data;
                });
        }
    });