/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteDbOption', DeleteDbOption);

  DeleteDbOption.$inject = [ '$modalInstance', '$stateParams', 'api', 'db', 'option' ];

  function DeleteDbOption($modalInstance, $stateParams, api, db, option) {
    /* jshint validthis:true */
    var vm = this;
    vm.option = option;
    vm.db = db;
    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      var newDb = angular.copy(db);
      delete newDb.driver_options[option];
      if (Object.keys(newDb.driver_options).length === 0) {
        delete newDb.driver_options;
      }
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
