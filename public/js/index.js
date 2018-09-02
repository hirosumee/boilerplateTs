(function () {
    'use strict';
    angular.module('BlankApp', ['ngMaterial', 'ngMessages', 'ui.router'])
        .config(['$locationProvider','$mdAriaProvider', function ($locationProvider,$mdAriaProvider) {
           // $locationProvider.html5Mode(true).hashPrefix('!');
            $mdAriaProvider.disableWarnings();
        }])
        .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

            $stateProvider
                .state({
                    name: 'home',
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: '/angular/views/home/index.html',
                            controller: 'HomeController as vm',
                            data: {}
                        }
                    }
                })
                .state({
                    name: 'login',
                    url: '/login',
                    views: {
                        'content@': {
                            templateUrl:'/angular/views/login/index.html',
                            controller: 'LoginController as vm',
                        }
                    }
                })
                .state({
                    name:'file-upload',
                    url:'/upload',
                    views:{
                        'content@':
                            {
                                templateUrl:'/angular/views/file_upload/index.html',
                                controller:'UploadController as vm'
                            }
                    }
                });
            $urlRouterProvider.otherwise("/");
        }]);
}());