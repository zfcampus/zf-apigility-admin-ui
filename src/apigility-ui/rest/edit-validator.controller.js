/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('EditValidatorModal', EditValidatorModal);

  EditValidatorModal.$inject = [ '$modalInstance', '$modal', '$stateParams', 'vmParent', 'validatorName', 'api' ];

  function EditValidatorModal($modalInstance, $modal, $stateParams, vmParent, validatorName, api) {
    /* jshint validthis:true */
    var vm = this;

    vm.validatorName = validatorName;
    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    api.getValidators(function(result){
      vm.validators = result;
    });

    function submit() {

    }

    vm.deleteValidatorModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/rest/delete-validator.modal.html',
        controller: 'DeleteValidatorModal',
        controllerAs: 'vm',
        resolve : {
          validatorName : function() {
            return validatorName;
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
