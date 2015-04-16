/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditViewModel', EditViewModel);

  EditViewModel.$inject = [ '$modalInstance', '$modal', '$stateParams', 'api', 'selector', 'classname'];

  function EditViewModel($modalInstance, $modal, $stateParams, api, selector, classname) {
    /* jshint validthis:true */
    var vm = this;
    vm.classname = classname;
    vm.mediatypes = selector.selectors[classname];

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      if (vm.mediatypes.length == 0) {
        vm.alert = 'The Mediatypes cannot be empty';
        return;
      }
      vm.loading = true;
      var newSelector = angular.copy(selector);
      newSelector.selectors[classname] = vm.mediatypes.map(api.mapTagInput);
      api.saveSelector(newSelector, function(err, response){
        vm.loading = false;
        if (err) {
          vm.alert = response;
          return;
        }
        $modalInstance.close(response);
      });
    }

    vm.deleteViewModelModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-viewmodel.html',
        controller: 'DeleteViewModel',
        controllerAs: 'vm',
        resolve : {
          selector : function() {
            return selector;
          },
          classname : function() {
            return classname;
          }
        }
      });

      modalInstance.result.then(function (response) {
        $modalInstance.close(response);
      });
    };
  }
})();
