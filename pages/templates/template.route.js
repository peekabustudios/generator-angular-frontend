'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'app/pages/template/template.html'
            })
    })