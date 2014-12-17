/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.sidebar')
  .controller('NewApiModal', NewApiModal);

  NewApiModal.$inject = [ '$modalInstance' ];

  function NewApiModal($modalInstance) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    function submit() {

    }
  }
})();
