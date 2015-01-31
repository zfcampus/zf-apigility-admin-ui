/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility')
    .controller('Header', Header);

  Header.$inject = [];

  function Header(){
    /* jshint validthis:true */
    var vm = this;

    vm.apigilityVersion = 'version 1.1';
  }
})();
