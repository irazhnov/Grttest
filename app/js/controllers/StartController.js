"use strict";
angular
    .module(AppConfig.name, ['routes'])
    .controller('StartCtrl', ['$scope', 'heatMapService',  function ($scope, heatMapService) {
        console.log('StartCtrl');
        heatMapService.getHeatData(function (result) {
            $scope.model = result;
        });
    }]);