/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.authentication')
    .controller('Authentication', Authentication);

    Authentication.$inject = ['api', '$modal', '$state', '$stateParams'];

  function Authentication(api, $modal, $state, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.changed = [false, false, false];

    function initBasic() {
      
    };

    vm.change = function(tab) {
      vm.changed[parseInt(tab)] = true;
    }

    vm.saveBasic = function() {
      if (!vm.changed[0]) {
        return;
      }
      vm.loading = true;
      api.updateGeneralRest(vm.apiName, vm.version, vm.restName, vm.rest, function(err, result){
        vm.loading = false;
        if (err) {
          vm.alert = result;
          return;
        }
        vm.changed[0] = false;
      });
    };

    vm.resetBasic = function() {
      if (vm.changed[0]) {
        initBasic();
        vm.changed[0] = false;
      }
    };

  }
})();
