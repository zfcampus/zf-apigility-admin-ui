/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.package')
    .config(config);

  var content = {
    url: '/package',
    views: {
      'content@': {
        templateUrl: 'apigility-ui/package/package.html',
        controller: 'Package',
        controllerAs: 'vm'
      }
    }
  };

  config.$inject = [ '$stateProvider' ];
  function config ($stateProvider) {
    $stateProvider
      .state('ag.package', content)
  }

})();
