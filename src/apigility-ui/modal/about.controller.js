/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('About', About);

  About.$inject = [ '$modalInstance', '$stateParams', 'api', '$timeout', 'version' ];

  function About($modalInstance, $stateParams, api, $timeout, version) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.version = version;
  }
})();
