/* jshint latedef: false */
(function() {
  'use strict';

  angular
    .module('apigility.core')
    .controller('Nav', Nav);

  function Nav() {
    var vm = this;
    vm.select = select;
    vm.tabs = {
      'content-negotiation': {
        title: 'Content Negotiation',
        active: false
      },
      'authentication': {
        title: 'Authentication',
        active: false
      },
      'documentation': {
        title: 'Documentation',
        active: false
      },
      'backend': {
        title: 'Generate Backend',
        active: false
      }
    };

    activate();

    function select(selected) {
      for (var tab in vm.tabs) {
        vm.tabs[tab].active = (tab === selected);
      }
    }

    function activate() {
      select('content-negotiation');
    }
  }
})();
