(function () {
    'use strict';
    angular.module('BlankApp', ['ngMaterial', 'ngMessages', 'ui.router'])
        // .constant('socket_io',io())
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
                    name: 'with_scope',
                    url: '/:scope',
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
                    name: 'register',
                    url: '/register',
                    views: {
                        'content@': {
                            templateUrl:'/angular/views/register/index.html',
                            controller: 'RegisterController as vm',
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
                })
                .state({
                    name:'file-info',
                    url:'/info/:id',
                    views:{
                        'content@':{
                            templateUrl:'/angular/views/file_info/file_info.html',
                            controller:'FileInfoController as vm'
                        }
                    }
                })
                .state({
                    name:'chat-room',
                    url:'/chat',
                    views:{
                        'content@':{
                            templateUrl:'/angular/views/chat/chat.html',
                            controller:'ChatController as vm'
                        }
                    }
                });
            $urlRouterProvider.otherwise("/global");
        }]);
}());