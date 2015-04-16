/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.content-negotiation')
    .controller('ContentNegotiation', ContentNegotiation);

  ContentNegotiation.$inject = ['api', '$modal', '$state', '$stateParams'];

  function ContentNegotiation(api, $modal, $state, $stateParams) {
    /* jshint validthis:true */
    var vm = this;

    api.getContentNegotiation(function(result){
      vm.content_negotiation = result;
    });

    vm.newSelectorModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-selector.html',
        controller: 'NewSelector',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (response) {
        vm.content_negotiation.push(response);
      });
    };

    vm.deleteSelectorModal = function(selector) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/delete-selector.html',
        controller: 'DeleteSelector',
        controllerAs: 'vm',
        resolve : {
          selector : function() {
            return selector;
          }
        }
      });

      modalInstance.result.then(function (response) {
        for(var i = 0; i < vm.content_negotiation.length; i++) {
          if (vm.content_negotiation[i].content_name === response) {
            vm.content_negotiation.splice(i, 1);
            break;
          }
        }
      });
    };

    vm.addViewModel = function(selector) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/new-viewmodel.html',
        controller: 'NewViewModel',
        controllerAs: 'vm',
        resolve : {
          selector : function() {
            return selector;
          }
        }
      });

      modalInstance.result.then(function (response) {
        updateContentNegotiation(response);
      });
    };

    vm.editViewModel = function(selector, classname) {
      var modalInstance = $modal.open({
        templateUrl: 'apigility-ui/modal/edit-viewmodel.html',
        controller: 'EditViewModel',
        controllerAs: 'vm',
        resolve : {
          selector : function() {
            return selector;
          },
          classname : function() {
            return classname;
          }
        }
      });

      modalInstance.result.then(function (response) {
        updateContentNegotiation(response);
      });
    }

    function updateContentNegotiation(selector) {
      for (var i = 0; i < vm.content_negotiation.length; i++) {
        if (vm.content_negotiation[i].content_name === selector.content_name) {
          vm.content_negotiation[i] = selector;
          break;
        }
      }
    }
  }
})();
