angular.module('<%= _.slugify(appName) %>')
    .config(function ($routeProvider){
        'use strict';
        $routeProvider
            .when('/', {
                templateUrl: '../../pages/main/main.html',
                controller: 'MainCtrl'
            });
    });