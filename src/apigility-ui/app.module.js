(function () {
  'use strict';

  angular
    .module('apigility', [
      'apigility.core',
      'apigility.service',
      'apigility.modal',
      'apigility.api-module',
      'apigility.rest',
      'apigility.content-negotiation',
      'apigility.authentication',
      'apigility.database',

      'ui.bootstrap',
      'ui.router',
      'ui.tree',
      'angular-ladda'
      /*
      'ngSanitize',
      'ngTagsInput',
      'ui-sortable',
      'ui-select2',
      'toggle-switch',
      */
      //'templates-main' // the "js/templates.js" created by minifying all templates

    ]);
})();
