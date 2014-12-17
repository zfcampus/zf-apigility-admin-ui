/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('AddFilterModal', AddFilterModal);

  AddFilterModal.$inject = [ '$modalInstance', '$stateParams', 'vmParent', 'fieldName', 'api' ];

  function AddFilterModal($modalInstance, $stateParams, vmParent, fieldName, api) {
    /* jshint validthis:true */
    var vm = this;

    vm.fieldName = fieldName;
    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    api.getFilters(function(result){
      vm.filters = result;
    });

    function submit() {

    }

  }
})();
