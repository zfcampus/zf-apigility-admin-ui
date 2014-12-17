/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('EditFilterModal', EditFilterModal);

  EditFilterModal.$inject = [ '$modalInstance', '$modal', '$stateParams', 'vmParent', 'filterName', 'api' ];

  function EditFilterModal($modalInstance, $modal, $stateParams, vmParent, filterName, api) {
    /* jshint validthis:true */
    var vm = this;

    vm.filterName = filterName;
    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    api.getValidators(function(result){
      vm.validators = result;
    });

    function submit() {

    }

    vm.deleteFilterModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/delete-filter.modal.html',
        controller: 'DeleteFilterModal',
        controllerAs: 'vm',
        resolve : {
          filterName : function() {
            return filterName;
          },
          vmParent : function() {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        //$scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
})();
