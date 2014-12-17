/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .config(config);

  config.$inject = [
    '$provide',
    '$stateProvider',
    '$urlRouterProvider',
    'localStorageServiceProvider',
    '$httpProvider'
  ];

  var ag = {
    abstract: true,
    views: {
      sidebar: {
        templateUrl: 'apigility-ui/sidebar/sidebar.html',
        controller: 'Sidebar',
        controllerAs: 'vm'
      }
    }
  };

  function config ($provide, $stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider) {

    $provide.value(
      'agApiPath',
      angular.element('body').data('ag-api-path') ||
      angular.element('body').data('api-base-path') ||
      '/api'
    );

    $stateProvider
    .state('ag', ag);

    $urlRouterProvider
    .otherwise('/');

    localStorageServiceProvider
    .setPrefix('ag');
  }

})();
