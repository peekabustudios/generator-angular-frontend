var App = angular.module('<%= _.camelize(appName) %>', ['ngRoute']);


App.config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });