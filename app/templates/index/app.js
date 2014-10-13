var App = angular.module('<%= _.slugify(appName) %>', ['ngRoute']);


App.config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });