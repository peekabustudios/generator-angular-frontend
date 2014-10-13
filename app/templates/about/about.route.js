angular.module('<%= _.slugify(appName) %>')
    .config(function ($routeProvider){
        'use strict';
        $routeProvider
            .when('/about', {
                templateUrl: '../../pages/about/about.html',
                controller: 'AboutCtrl'
            });
    });