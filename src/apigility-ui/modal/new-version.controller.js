/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('NewVersion', NewVersion);

  NewVersion.$inject = [ '$modalInstance', '$stateParams' ];

  function NewVersion($modalInstance, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.newVersion = parseInt($stateParams.ver) + 1;
    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    function submit() {

    }
  }
})();
