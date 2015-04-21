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
      'apigility.about',

      'ngSanitize',
      'ui.bootstrap',
      'ui.router',
      'ui.tree',
      'ui.select',
      'angular-ladda',
      'unsavedChanges',
      'ngTagsInput',
      'checklist-model',
      'toggle-switch',
      'angular-growl'
    ]);
})();
