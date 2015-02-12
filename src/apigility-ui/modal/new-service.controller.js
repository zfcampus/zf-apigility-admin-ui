/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewService', NewService);

  NewService.$inject = [ '$modalInstance', 'SidebarService', 'api', '$timeout', 'apiname', 'version' ];

  function NewService($modalInstance, SidebarService, api, $timeout, apiname, version) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.apis = SidebarService.getApis();
    vm.tabs = {};
    vm.apiname = vm.apis[0];
    // If apiname is not empty, we select it
    if (apiname) {
      for (var i = 0; i < vm.apis.length; i++) {
        if (vm.apis[i].name == apiname) {
          vm.apiname = vm.apis[i];
          break;
        }
      }
    }

    api.getDatabase(function(err, response){
      vm.db = response;
    });

    vm.ok = function() {
      vm.loading = true;
      if (vm.tabs.rest) { // REST
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
      } else if (vm.tabs.rpc) { // RPC
        if (!vm.rpcname) {
          vm.alert = 'The service name cannot be empty';
          vm.loading = false;
          return;
        }
        if (!vm.route) {
          vm.alert = 'The route to match cannot be empty';
          vm.loading = false;
          return;
        }
        api.newRpc(vm.apiname.name, vm.rpcname, vm.route, function(err, response) {
          if (err) {
            vm.alert = response;
            vm.loading = false;
          } else {
            $timeout(function(){
              vm.loading = false;
              $modalInstance.close({ 'api' : vm.apiname.name, 'rpc' : vm.rpcname });
            }, 2000);
          }
        });
      } else if (vm.tabs.db) { // DB-CONNECTED
        if (!vm.adapter) {
          vm.alert = 'The DB adapter name cannot be empty';
          vm.loading = false;
          return;
        }
        if (!vm.table_name) {
          vm.alert = 'The Table name cannot be empty';
          vm.loading = false;
          return;
        }
        api.newDbConnected(vm.apiname.name, vm.adapter.adapter_name, vm.table_name, function(err, response) {
          if (err) {
            vm.alert = response;
            vm.loading = false;
          } else {
            $timeout(function(){
              vm.loading = false;
              $modalInstance.close({ 'api' : vm.apiname.name, 'rest' : vm.table_name });
            }, 2000);
          }
        });
      }
    }
  }
})();
