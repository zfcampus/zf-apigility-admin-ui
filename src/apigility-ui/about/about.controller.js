/* jshint latedef: false */
(function () {
  'use strict';

  angular
  .module('apigility.about')
  .controller('About', About);

  About.$inject = [ '$stateParams', 'api', '$timeout' ];

  function About($stateParams, api, $timeout) {
    /* jshint validthis:true */
    var vm = this;

    vm.version = '@dev';

    function init() {
      api.getApigilityVersion(function (data) {
        vm.version = data.version;
      });
    }

    init();
  }
})();
