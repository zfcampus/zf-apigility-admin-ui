/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .controller('Header', Header);

  Header.$inject = [ 'Apis'];

  function Header(Apis){
    /* jshint validthis:true */
    var vm = this;
    vm.setSelected = Apis.setSelected;

    vm.apigilityVersion = 'version 1.1';
  }
})();
