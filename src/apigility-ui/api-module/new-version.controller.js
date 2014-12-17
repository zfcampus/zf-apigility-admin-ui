/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.api-module')
  .controller('NewVersionModal', NewVersionModal);

  NewVersionModal.$inject = [ '$modalInstance', '$stateParams' ];

  function NewVersionModal($modalInstance, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.newVersion = parseInt($stateParams.ver) + 1;
    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    function submit() {

    }
  }
})();
