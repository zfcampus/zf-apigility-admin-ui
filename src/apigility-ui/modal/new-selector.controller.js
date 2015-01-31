/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewSelector', NewSelector);

  NewSelector.$inject = [ '$modalInstance', 'api' ];

  function NewSelector($modalInstance, api) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel  = $modalInstance.dismiss;
    vm.selectorname = '';
    vm.loading = false;

    vm.ok = function() {
      if (!vm.selectorname) {
        vm.alert = 'The Selector name cannot be empty';
        return;
      }
      vm.loading = true;
      api.newSelector(vm.selectorname, function(err, response) {
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
