/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewService', NewService);

  NewService.$inject = [ '$modalInstance', 'SidebarService', 'api', '$timeout', 'apiname' ];

  function NewService($modalInstance, SidebarService, api, $timeout, apiname) {
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

    vm.toggle = function(scope) {
      scope.toggle();
    };

    api.getDatabase(function(err, response){
      vm.db = response;
    });

    vm.discoverDb = function() {
      vm.discovering = true;
      api.autodiscover(vm.apiname.name, SidebarService.getSelectedVersion(vm.apiname.name), encodeURIComponent(vm.adapter.adapter_name), function (err, response) {
        vm.dbServices = [];
        vm.discovering = false;
        vm.tables = response;
      });
    };

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
        if (vm.dbServices.length == 0) {
          vm.alert = 'Please choose at least one table';
          vm.loading = false;
          return;
        }
        /*api.newDbConnected(vm.apiname.name, vm.adapter.adapter_name, vm.table_name, function(err, response) {
          if (err) {
            vm.alert = response;
            vm.loading = false;
          } else {
            $timeout(function(){
              vm.loading = false;
              $modalInstance.close({ 'api' : vm.apiname.name, 'rest' : vm.table_name });
            }, 2000);
          }
        });*/
        var rests = [];
        vm.dbServices.forEach(function(table) {
          api.newDbConnected(vm.apiname.name, vm.adapter.adapter_name, table.table_name, function(err, response) {
            if (err) {
              vm.alert = response;
              vm.loading = false;
            } else {
              var fields = [];
              table.columns.forEach(function(column) {
                if (column.filters != undefined && column.validators != undefined) {
                  fields.push({
                    name: column.name,
                    required: column.required,
                    filters: column.filters,
                    validators: column.validators
                  });
                }

              });
              api.saveRestField(vm.apiname.name, SidebarService.getSelectedVersion(vm.apiname.name), table.table_name, fields, function(err, response) {
                if (err) {
                  //TODO: warn upon error
                }
              });
              rests.push(table.table_name);
              vm.tables.splice(table, 1);
            }
          });
        });
        $timeout(function(){
          vm.loading = false;
          $modalInstance.close({ 'api' : vm.apiname.name, 'rests' : rests });
        }, 2000);
      }
    }
  }
})();
