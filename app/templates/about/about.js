App.config(function ($routeProvider){
  'use strict';
    $routeProvider
      .when('/about', {
        templateUrl: 'pages/about/about.html',
        controller: 'AboutCtrl'
  });
});