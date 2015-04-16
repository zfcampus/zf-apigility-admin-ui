/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditDb', EditDb);

  EditDb.$inject = [ '$modalInstance', 'api', '$timeout' , 'driver_types', 'db' ];

  function EditDb($modalInstance, api, $timeout, driver_types, db) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel  = $modalInstance.dismiss;
    vm.driver_types = driver_types;
    vm.db = db;
    vm.loading = false;

    vm.ok = function() {
      if (!vm.db.database) {
        vm.alert = 'The Database name cannot be empty';
        return;
      }
      vm.loading = true;
      api.saveDatabase(vm.db, function(err, response){
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
