'use strict';
angular.module('appCreation')
    .controller('HeaderController', [
        '$scope',
        '$localStorage',
function($scope, $localStorage) {
    console.log("********** header controller ***********");

    // showing total count of selected cart.
    if($localStorage.cart){
        $scope.totalItemsCount = $localStorage.cart.length;
    } else {
        $scope.totalItemsCount = 0;
    }
}]);
