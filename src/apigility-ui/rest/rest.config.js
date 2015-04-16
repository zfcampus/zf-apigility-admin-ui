/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.rest')
    .config(config);

  var content = {
    url: '/module/:api/:ver/rest/:rest',
    views: {
      'content@': {
        templateUrl: 'apigility-ui/rest/rest.html',
        controller: 'Rest',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('ag.rest', content)
  }

})();
