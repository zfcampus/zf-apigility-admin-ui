/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.rest')
  .controller('NewFieldModal', NewFieldModal);

  NewFieldModal.$inject = [ '$modalInstance', '$stateParams' ];

  function NewFieldModal($modalInstance, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    function submit() {

    }
  }
})();
