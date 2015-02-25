/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteDb', DeleteDb);

  DeleteDb.$inject = [ '$modalInstance', '$stateParams', 'api', 'db' ];

  function DeleteDb($modalInstance, $stateParams, api, db) {
    /* jshint validthis:true */
    var vm = this;
    vm.db = db;

    vm.cancel = $modalInstance.dismiss;

    vm.ok = function() {
      vm.loading = true;
      api.deleteDatabase(vm.db.adapter_name, function(err,result){
        vm.loading = false;
        if (err) {
          vm.alert = 'Error during the delete of the Database adapter';
          return;
        }
        $modalInstance.close(vm.db.adapter_name);
      });
    }
  }
})();
