/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.about')
    .config(config);

  var apimodule = {
    url: '/about',
    views: {
      'content@': {
        templateUrl: 'apigility-ui/about/about.html',
        controller: 'About',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('ag.about', apimodule)
  }

})();
