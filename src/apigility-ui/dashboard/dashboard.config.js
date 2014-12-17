/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.dashboard')
    .config(config);

  var index = {
    url: '/',
    views: {
      'content@': {
        templateUrl: 'apigility-ui/dashboard/dashboard.html',
        controller: 'Dashboard',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('ag.index', index)
  }

})();
