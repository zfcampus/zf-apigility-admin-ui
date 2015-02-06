/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.database')
    .controller('Database', Database);

    Database.$inject = ['api', '$modal', '$state', '$stateParams'];

  function Database(api, $modal, $state, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.driver_types = [
      'IbmDb2',
      'Mysqli',
      'Oci8',
      'PDO_Mysql',
      'PDO_Oci',
      'PDO_Pgsql',
      'PDO_Sqlite',
      'Pgsql',
      'Sqlsrv'
    ];

    api.getDatabase(function(err, result){
      vm.db_adapter = result.db_adapter;
    });

    vm.newDbModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-db.html',
        controller: 'NewDb',
        controllerAs: 'vm',
        resolve : {
          driver_types : function() {
            return vm.driver_types;
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.db_adapter.push(response);
      });
    };

    vm.deleteDbModal = function(db) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-db.html',
        controller: 'DeleteDb',
        controllerAs: 'vm',
        resolve : {
          db : function() {
            return db;
          }
        }
      });

      modalInstance.result.then(function (response) {
        for (var i = 0; i < vm.db_adapter.length; i++) {
          if (vm.db_adapter[i].adapter_name === response) {
            vm.db_adapter.splice(i, 1);
            break;
          }
        }
      });
    };

    vm.editDbModal = function(db) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-db.html',
        controller: 'EditDb',
        controllerAs: 'vm',
        resolve : {
          db : function() {
            return db;
          },
          driver_types : function() {
            return vm.driver_types;
          }
        }
      });

      modalInstance.result.then(function (response) {
        updateDb(response);
      });
    };

    vm.addDbOptionModal = function(db) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/add-dboption.html',
        controller: 'AddDbOption',
        controllerAs: 'vm',
        resolve : {
          db : function() {
            return db;
          }
        }
      });

      modalInstance.result.then(function (response) {
        updateDb(response);
      });
    }

    vm.editDbOptionModal = function(db, option) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-dboption.html',
        controller: 'EditDbOption',
        controllerAs: 'vm',
        resolve : {
          db : function() {
            return db;
          },
          option : function() {
            return option;
          }
        }
      });

      modalInstance.result.then(function (response) {
        updateDb(response);
      });
    }

    function updateDb(db) {
      for (var i = 0; i < vm.db_adapter.length; i++) {
        if (vm.db_adapter[i].adapter_name === db.adapter_name) {
          vm.db_adapter[i] = db;
          break;
        }
      }
    }
  }
})();
