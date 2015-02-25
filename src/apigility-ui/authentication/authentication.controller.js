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
    var emptyBasic = false;

    function initBasic() {
      api.getAuthentication(function(err,result){
        vm.basic = result;
        emptyBasic = (!result.htpasswd);
      });
    };

    initBasic();

    vm.change = function(tab) {
      vm.changed[parseInt(tab)] = true;
    }

    vm.saveBasic = function() {
      if (!vm.changed[0]) {
        return;
      }
      vm.loading = true;
      api.updateBasicAuthentication(vm.basic, function(err, result){
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
