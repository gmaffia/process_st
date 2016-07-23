'use strict'
angular.module('process').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .when('', '/')
    .otherwise('/404');


  $stateProvider
    .state('app', {
      url: '/',
      templateUrl: 'app/views/upload_video.html'
    })

    .state('404', {
      url: '/404',
      templateUrl: 'app/views/404.html'
    });
}]);
