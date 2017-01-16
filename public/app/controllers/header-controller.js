'use strict';
angular.module('appCreation')
    .controller('HeaderController', [
        '$scope',
        '$localStorage',
function($scope, $localStorage) {
    console.log("********** header controller ***********");
    $scope.totalItemsCount = 0;
    
    // showing total count of selected cart.
    $scope.$watch(function () { 
        return $localStorage.cart.length; },
        function(newVal,oldVal){
            $scope.totalItemsCount = newVal || 0; 
    });

    // if($localStorage.cart){
    //     $scope.totalItemsCount = $localStorage.cart.length;
    // } else {
    //     $scope.totalItemsCount = 0;
    // }

}]);
