var App = angular.module('<%= _.slugify(appName) %>', ['ngRoute']);

App.config(function ($routeProvider) {
    $routeProvider
      .when('/', {  templateUrl: 'templates/states/main.html', controller: 'MainCtrl'  })
      .when('/about', {  templateUrl: 'templates/states/about.html', controller: 'AboutCtrl'  })
      .otherwise({
        redirectTo: '/'
      });
  });