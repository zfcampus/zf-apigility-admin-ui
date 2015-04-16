/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewService', NewService);

  NewService.$inject = [ '$modalInstance', 'SidebarService', 'api', '$timeout' ];

  function NewService($modalInstance, SidebarService, api, $timeout) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.apis = SidebarService.getApis();
    vm.tabs = {};
    vm.apiname = vm.apis[0];
    vm.hasDoctrine = false;

    // We use the selected API, if any
    for (var i = 0; i < vm.apis.length; i++) {
      if (('api' + vm.apis[i].name) === SidebarService.getSelected()) {
        vm.apiname = vm.apis[i];
        break;
      }
    }

    vm.toggle = function(scope) {
      scope.toggle();
    };

    api.getDatabase(function(err, response){
      vm.db = response;
    });

    api.getDoctrineAdapters(function(err, response) {
      if (err && response == 204) {
        return;
      }
      vm.hasDoctrine = true;
      vm.doctrine = response;
    });

    vm.discoverDb = function() {
      vm.discovering = true;
      api.autodiscover(vm.apiname.name, SidebarService.getSelectedVersion(vm.apiname.name), false, encodeURIComponent(vm.adapter.adapter_name), function (err, response) {
        vm.dbServices = [];
        vm.discovering = false;
        vm.tables = response;
      });
    };

    vm.discoverDoctrine = function () {
      vm.discovering = true;
      api.autodiscover(vm.apiname.name, SidebarService.getSelectedVersion(vm.apiname.name), true, vm.doctrineAdapter.adapter_name, function (err, response) {
        vm.doctrineEntities = [];
        vm.discovering = false;
        vm.entities = response;
      });
    };

    vm.ok = function() {
      vm.loading = true;
      var lastversion = 1;
      // Get the last version of selected API
      vm.apis.forEach(function(api){
        if (api.name === vm.apiname.name) {
          lastversion = Math.max.apply(Math, api.versions);
        }
      });
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
              $modalInstance.close({ 'api' : vm.apiname.name, 'rest' : vm.restname, 'ver' : lastversion });
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
              $modalInstance.close({ 'api' : vm.apiname.name, 'rpc' : vm.rpcname, 'ver' : lastversion });
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
          $modalInstance.close({ 'api' : vm.apiname.name, 'rests' : rests, 'ver' : lastversion });
        }, 2000);
      } else if (vm.tabs.doctrine) { // DOCTRINE-CONNECTED
        if (!vm.doctrineAdapter) {
          vm.alert = 'The DB adapter name cannot be empty';
          vm.loading = false;
          return;
        }

        if (vm.doctrineEntities.length == 0) {
          vm.alert = 'Please choose at least one entity';
          vm.loading = false;
          return;
        }
        var rests = [];
        vm.doctrineEntities.forEach(function(entity) {
          api.newDoctrine(vm.apiname.name, vm.doctrineAdapter.adapter_name, entity, function (err, response) {
            if (err) {
              vm.alert = response;
              vm.loading = false;
            } else {
              api.saveRestField(vm.apiname.name, SidebarService.getSelectedVersion(vm.apiname.name), entity.service_name, entity.fields, function(err, response) {
                if (err) {
                  //TODO: warn upon error
                }
              });
              rests.push(entity.service_name);
              vm.entities.splice(entity, 1);
            }
          });
        });
        $timeout(function(){
          vm.loading = false;
          $modalInstance.close({ 'api' : vm.apiname.name, 'rests' : rests, 'ver' : lastversion });
        }, 2000);
      }
    }
  }
})();
