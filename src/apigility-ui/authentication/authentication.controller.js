/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.authentication')
    .controller('Authentication', Authentication);

    Authentication.$inject = ['api', '$modal', '$state', '$stateParams'];

  function Authentication(api, $modal, $state, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    vm.auth_types = [
      'HTTP Basic',
      'HTTP Digest',
      'OAuth2 PDO',
      'OAuth2 Mongo'
    ];

    api.getAuthenticationAdapters(function(err, result){
      vm.adapters = result;
    });

    vm.newAuthModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-auth.html',
        controller: 'NewAuth',
        controllerAs: 'vm',
        resolve : {
          auth_types : function() {
            return vm.auth_types;
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.adapters.push(response);
      });
    };

    vm.deleteAuthModal = function(auth) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-auth.html',
        controller: 'DeleteAuth',
        controllerAs: 'vm',
        resolve : {
          auth : function() {
            return auth;
          }
        }
      });

      modalInstance.result.then(function (response) {
        for (var i = 0; i < vm.adapters.length; i++) {
          if (vm.adapters[i].name === response) {
            vm.adapters.splice(i, 1);
            break;
          }
        }
      });
    };

    vm.editAuthModal = function(auth) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-auth.html',
        controller: 'EditAuth',
        controllerAs: 'vm',
        resolve : {
          auth : function() {
            return auth;
          },
          auth_types : function() {
            return vm.auth_types;
          }
        }
      });

      modalInstance.result.then(function (response) {

      });
    };

    vm.addAuthOptionModal = function(auth) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/add-authoption.html',
        controller: 'AddAuthOption',
        controllerAs: 'vm',
        resolve : {
          auth : function() {
            return auth;
          }
        }
      });

      modalInstance.result.then(function (response) {
        updateAuth(response);
      });
    }

    vm.editAuthOptionModal = function(auth, option) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-authoption.html',
        controller: 'EditAuthOption',
        controllerAs: 'vm',
        resolve : {
          auth : function() {
            return auth;
          },
          option : function() {
            return option;
          }
        }
      });

      modalInstance.result.then(function (response) {
        updateAuth(response);
      });
    }

    function updateAuth(auth) {
      for (var i = 0; i < vm.adapters.length; i++) {
        if (vm.adapters[i].name === auth.name) {
          vm.adapters[i] = auth;
          break;
        }
      }
    }
  }
})();
