/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.modal')
  .controller('DeleteSelector', DeleteSelector);

  DeleteSelector.$inject = [ '$modalInstance', '$stateParams', 'api', 'selector' ];

  function DeleteSelector($modalInstance, $stateParams, api, selector) {
    /* jshint validthis:true */
    var vm = this;

    vm.cancel = $modalInstance.dismiss;
    vm.selector = selector;

    vm.ok = function() {
      api.deleteSelector(selector.content_name, function(err, response){
        vm.loading = false;
        if (err) {
          vm.alert = response;
          return;
        }
        $modalInstance.close(selector.content_name);
      });
    }

  }
})();
