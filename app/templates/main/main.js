App.config(function ($routeProvider){
        'use strict';
        $routeProvider
            .when('/', {
                templateUrl: 'pages/main/main.html',
                controller: 'MainCtrl'
            });
    });