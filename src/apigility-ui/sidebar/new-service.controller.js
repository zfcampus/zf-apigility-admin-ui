/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.sidebar')
  .controller('NewServiceModal', NewServiceModal);

  NewServiceModal.$inject = [ 'api', '$modalInstance' ];

  function NewServiceModal(api, $modalInstance) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.submit = submit;

    api.getApiList(function(result){
      vm.apis = result;
    });

    function submit() {

    }
  }
})();
