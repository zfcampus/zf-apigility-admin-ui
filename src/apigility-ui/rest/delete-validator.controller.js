/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('DeleteValidatorModal', DeleteValidatorModal);

  DeleteValidatorModal.$inject = [ '$modalInstance', '$stateParams', 'validatorName', 'vmParent' ];

  function DeleteValidatorModal($modalInstance, $stateParams, validatorName, vmParent) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;
    vm.validatorName = validatorName;

    function submit() {

    }

  }
})();
