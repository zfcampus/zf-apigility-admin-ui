/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.content-negotiation')
    .config(config);

  var content = {
    url: '/content',
    views: {
      'content@': {
        templateUrl: 'apigility-ui/content-negotiation/content-negotiation.html',
        controller: 'ContentNegotiation',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('ag.content', content)
  }

})();
