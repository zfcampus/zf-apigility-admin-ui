/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewViewModel', NewViewModel);

  NewViewModel.$inject = [ '$modalInstance', '$stateParams', 'api', 'selector'];

  function NewViewModel($modalInstance, $stateParams, api, selector) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      if (!vm.classname) {
        vm.alert = 'The View Model class name cannot be empty';
        return;
      }
      if (vm.mediatypes.length == 0) {
        vm.alert = 'The Mediatypes cannot be empty';
        return;
      }
      for (var key in selector.selectors) {
        if (key === vm.classname) {
          vm.alert = 'The View Model class already exists!';
          return;
        }
      }
      vm.loading = true;
      var newSelector = angular.copy(selector);
      if (newSelector.selectors.length == 0) {
        newSelector.selectors = {};
      }
      newSelector.selectors[vm.classname] = vm.mediatypes.map(api.mapTagInput);
      api.saveSelector(newSelector, function(err, response){
        vm.loading = false;
        if (err) {
          vm.alert = response;
          return;
        }
        $modalInstance.close(response);
      });
    }
  }
})();
