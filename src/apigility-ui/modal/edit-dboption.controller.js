/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('EditDbOption', EditDbOption);

  EditDbOption.$inject = [ '$modalInstance', '$modal', '$stateParams', 'api', 'db', 'option' ];

  function EditDbOption($modalInstance, $modal, $stateParams, api, db, option) {
    /* jshint validthis:true */
    var vm = this;
    vm.db = db;
    vm.option = option;
    vm.value = db.driver_options[option];

    vm.cancel = $modalInstance.dismiss;

    vm.deleteDbOptionModal = function(db, option) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-dboption.html',
        controller: 'DeleteDbOption',
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
        $modalInstance.close(response);
      });
    }

    vm.ok = function() {
      if (!vm.value) {
        vm.alert = 'The option value cannot be empty';
        return;
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
