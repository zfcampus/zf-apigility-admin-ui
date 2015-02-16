/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.modal')
    .controller('ViewDoctrineParams', ViewDoctrineParams);

  ViewDoctrineParams.$inject = [ '$modalInstance', 'doctrine_adapter', 'driver_types' ];

  function ViewDoctrineParams($modalInstance, doctrine_adapter, driver_types) {
    var vm = this;
    vm.adapter = doctrine_adapter;
    vm.driver_types = driver_types;
    vm.ok = $modalInstance.dismiss;
  }
})();