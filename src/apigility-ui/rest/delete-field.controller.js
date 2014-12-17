/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('DeleteFieldModal', DeleteFieldModal);

  DeleteFieldModal.$inject = [ '$modalInstance', '$stateParams', 'fieldName', 'vmParent' ];

  function DeleteFieldModal($modalInstance, $stateParams, fieldName, vmParent) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;
    vm.fieldName = fieldName;

    function submit() {

    }

  }
})();
