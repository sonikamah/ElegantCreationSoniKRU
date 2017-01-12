'use strict';
angular.module('appCreation')
    .service('ProductsService', function ($q, $http) {

        this.getProducts = function () {
            var defered = $q.defered;
            
            return $http({
                    method: 'GET',
                    url: '/service/products',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    return response.data;
                });
        }

    });