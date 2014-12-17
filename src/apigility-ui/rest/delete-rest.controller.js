/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('DeleteRestModal', DeleteRestModal);

  DeleteRestModal.$inject = [ '$modalInstance', '$stateParams' ];

  function DeleteRestModal($modalInstance, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.restName = $stateParams.rest;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    function submit() {

    }
  }
})();
