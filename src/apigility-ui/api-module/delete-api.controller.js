/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.api-module')
  .controller('DeleteRestModal', DeleteRestModal);

  DeleteRestModal.$inject = [ '$modalInstance', '$stateParams' ];

  function DeleteRestModal($modalInstance, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    function submit() {

    }
  }
})();
