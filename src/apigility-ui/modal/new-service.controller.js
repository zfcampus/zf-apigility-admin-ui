/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewService', NewService);

  NewService.$inject = [ '$modalInstance', 'Apis', 'api', '$timeout', 'apiname' ];

  function NewService($modalInstance, Apis, api, $timeout, apiname) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.apis = Apis.getApis();
    vm.tabs = {};
    vm.apiname = vm.apis[0];
    // If apiname is not empty, we select it
    if (apiname) {
      for (var i=0; i < vm.apis.length; i++) {
        if (vm.apis[i].name == apiname) {
          vm.apiname = vm.apis[i];
          break;
        }
      }
    }

    vm.ok = function() {
      vm.loading = true;
      if (vm.tabs.rest) {
        if (!vm.restname) {
          vm.alert = 'The service name cannot be empty';
          vm.loading = false;
          return;
        }
        api.newRest(vm.apiname.name, vm.restname, function(err, response) {
          if (err) {
            vm.alert = response;
            vm.loading = false;
          } else {
            $timeout(function(){
              vm.loading = false;
              $modalInstance.close({ 'api' : vm.apiname.name, 'rest' : vm.restname });
            }, 2000);
          }
        });
      } else if (vm.tabs.rpc) {

      } else if (vm.tabs.db) {

      }
    }
  }
})();
