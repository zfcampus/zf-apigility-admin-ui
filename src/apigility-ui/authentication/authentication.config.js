/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.authentication')
    .config(config);

  var content = {
    url: '/auth',
    views: {
      'content@': {
        templateUrl: 'apigility-ui/authentication/authentication.html',
        controller: 'Authentication',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('ag.authentication', content)
  }

})();
