/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.modal')
    .controller('NewDoctrineStrategy', NewDoctrineStrategy);

  NewDoctrineStrategy.$inject = [ '$modalInstance', '$stateParams', 'api', 'fields' ];

  function NewDoctrineStrategy($modalInstance, $stateParams, api, fields) {
    /* jshint validthis:true */
    var vm = this;

    vm.apiName = $stateParams.api;
    vm.version = $stateParams.ver;
    vm.cancel = $modalInstance.dismiss;
    vm.fields = fields;

    vm.ok = function() {
      if (vm.strategy == '' || vm.strategy == undefined) {
        vm.alert = 'Please choose a field and provide a declared strategy service';
        return;
      }
      vm.loading = true;
      api.strategyExists(encodeURIComponent(vm.strategy), function (err, response) {
        if (err) {
          vm.loading = false;
          vm.alert = response.data.detail;
          return;
        }
        $modalInstance.close({field:vm.field, strategy:vm.strategy});
      });
    };
  }
})();
