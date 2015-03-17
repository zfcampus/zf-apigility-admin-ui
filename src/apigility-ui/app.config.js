/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .config(config)
    .directive('autofocus', ['$timeout', function($timeout) {
      return {
        restrict: 'A',
        link : function($scope, $element) {
          $timeout(function() {
            $element[0].focus();
          });
        }
      }
    }]);

  config.$inject = [
    '$provide',
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    'localStorageServiceProvider'
  ];

  function config ($provide, $stateProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider) {

    $provide.value(
      'agApiPath',
      angular.element('body').data('ag-api-path') ||
      angular.element('body').data('api-base-path') ||
      '/api'
    );

    $stateProvider.state({
      name : 'ag',
      url : '/',
      controller: 'Application',
      views: {
        'header@' : {
          templateUrl: 'apigility-ui/header/header.html',
          controller: 'Header',
          controllerAs: 'vm',
          parent : this
        },
        'sidebar@': {
          templateUrl: 'apigility-ui/sidebar/sidebar.html',
          controller: 'Sidebar',
          controllerAs: 'vm',
          parent : this
        },
        'content@': {
          templateUrl: 'apigility-ui/dashboard/dashboard.html',
          controller: 'Dashboard',
          controllerAs: 'vm',
          parent : this
        }
      }
    });

    $urlRouterProvider.otherwise('/');
    
    localStorageServiceProvider
      .setPrefix('apigility');

  }

})();
