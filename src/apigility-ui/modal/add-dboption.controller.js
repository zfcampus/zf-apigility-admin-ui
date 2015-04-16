/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('AddDbOption', AddDbOption);

  AddDbOption.$inject = [ '$modalInstance', '$stateParams', 'api', 'db' ];

  function AddDbOption($modalInstance, $stateParams, api, db) {
    /* jshint validthis:true */
    var vm = this;
    vm.db = db;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      if (!vm.option) {
        vm.alert = 'The option name cannot be empty';
        return;
      }
      if (!vm.value) {
        vm.alert = 'The option value cannot be empty';
        return;
      }
      if (db.hasOwnProperty('driver_options')) {
        if (db.driver_options.hasOwnProperty(vm.option)) {
          vm.alert = 'The option already exists';
          return;
        }
      } else {
        db.driver_options = {};
      }
      vm.loading = true;
      var newDb = angular.copy(db);
      newDb.driver_options[vm.option] = vm.value;
      api.saveDatabase(newDb, function(err, response){
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
