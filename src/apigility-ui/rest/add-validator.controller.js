/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('AddValidatorModal', AddValidatorModal);

  AddValidatorModal.$inject = [ '$modalInstance', '$stateParams', 'vmParent', 'fieldName', 'api' ];

  function AddValidatorModal($modalInstance, $stateParams, vmParent, fieldName, api) {
    /* jshint validthis:true */
    var vm = this;

    vm.fieldName = fieldName;
    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    api.getValidators(function(result){
      vm.validators = result;
    });

    function submit() {

    }

  }
})();
