/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.documentation')
    .config(config);

  var content = {
    url: '/doc/:api/:ver',
    views: {
      'content@': {
        templateUrl: 'apigility-ui/documentation/documentation.html',
        controller: 'Documentation',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('ag.documentation', content);
  }

})();
