/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteViewModel', DeleteViewModel);

  DeleteViewModel.$inject = [ '$modalInstance', '$stateParams', 'api', 'selector', 'classname' ];

  function DeleteViewModel($modalInstance, $stateParams, api, selector, classname) {
    /* jshint validthis:true */
    var vm = this;
    vm.classname = classname;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      var newSelector = angular.copy(selector);
      delete newSelector.selectors[classname];
      if (Object.keys(newSelector.selectors).length === 0) {
        api.newSelector(selector.content_name, function(err, response) {
          vm.loading = false;
          if (err) {
            vm.alert = response;
            return;
          }
          $modalInstance.close(response);
        });
      } else {
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
  }
})();
