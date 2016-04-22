angular
    .module('routes', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('start',{
            url:'/',
            templateUrl: "partials/Start.html",
            controller: 'StartCtrl'
        });
        $urlRouterProvider.otherwise('/');
    });