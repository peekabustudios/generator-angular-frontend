var App = angular.module('<%= _.slugify(appName) %>', ['ngRoute']);


App.config(function ($routeProvider) {
    $routeProvider
      .when('/', {  templateUrl: 'html/main.html', controller: 'MainCtrl'  })
      .when('/about', {  templateUrl: 'html/about.html', controller: 'AboutCtrl'  })
      .otherwise({
        redirectTo: '/'
      });
  });