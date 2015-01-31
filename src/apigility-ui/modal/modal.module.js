(function () {
  'use strict';

  angular
    .module('apigility.modal', [
      'ui.router'
    ])
    .filter('emptyObject', function () {
      return function (obj) {
        return angular.equals({}, obj);
      };
    });
})();
