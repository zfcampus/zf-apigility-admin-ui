/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('EditFieldModal', EditFieldModal);

  EditFieldModal.$inject = [ '$modalInstance', '$stateParams', 'fieldName', 'vmParent' ];

  function EditFieldModal($modalInstance, $stateParams, fieldName, vmParent) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    vmParent.rest.fields.forEach(function(entry){
      if(entry.name === fieldName) {
        vm.field = entry;
        return;
      }
    });

    function submit() {

    }

  }
})();
