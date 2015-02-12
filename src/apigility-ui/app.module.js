(function () {
  'use strict';

  angular
    .module('apigility', [
      'apigility.core',
      'apigility.service',
      'apigility.modal',
      'apigility.api-module',
      'apigility.rest',
      'apigility.rpc',
      'apigility.content-negotiation',
      'apigility.authentication',
      'apigility.database',
      'apigility.documentation',
      'apigility.package',

      'ui.bootstrap',
      'ui.router',
      'ui.tree',
      'angular-ladda',
      'unsavedChanges',
      'ngTagsInput',
      'checklist-model'

      /*
      'ui-sortable',
      'ui-select2',
      'toggle-switch',
      */
      //'templates-main' // the "js/templates.js" created by minifying all templates

    ]);
})();
