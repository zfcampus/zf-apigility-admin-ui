/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .controller('Header', Header);

  Header.$inject = [ 'SidebarService', '$modal' ];

  function Header(SidebarService, $modal){
    /* jshint validthis:true */
    var vm = this;
    vm.setSelected = SidebarService.setSelected;

    vm.apigilityVersion = '1.1dev';

    vm.aboutModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/about.html',
        controller: 'About',
        controllerAs: 'vm',
        resolve : {
          version : function() {
            return vm.apigilityVersion;
          }
        }
      });
    };
  }
})();
