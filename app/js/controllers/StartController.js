"use strict";
angular
    .module(AppConfig.name, AppConfig.dependencies)
    .controller('StartCtrl', ['$scope', 'heatMapService',  function ($scope, heatMapService) {
        console.log('StartCtrl');
        heatMapService.getHeatData(function (result) {
            $scope.modelMap = result;
        });
        heatMapService.getHeatMapData(function (result) {
            $scope.modelHeatMap = result;
        });
    }]);