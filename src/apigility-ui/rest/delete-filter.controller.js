/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('DeleteFilterModal', DeleteFilterModal);

  DeleteFilterModal.$inject = [ '$modalInstance', '$stateParams', 'filterName', 'vmParent' ];

  function DeleteFilterModal($modalInstance, $stateParams, filterName, vmParent) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;
    vm.filterName = filterName;

    function submit() {

    }

  }
})();
