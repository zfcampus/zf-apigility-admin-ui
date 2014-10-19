(function(_) {
    'use strict';

angular.module('ag-admin').controller(
  'ApiRestServicesController', 
  function ($scope, $state, $stateParams, $sce, $modal, $timeout, flash, filters, hydrators, validators, selectors, ApiRepository, api, dbAdapters, doctrineAdapters, toggleSelection, agFormHandler) {

    $scope.activeService     = $stateParams.service ? $stateParams.service : '';
    $scope.inEdit            = !!$stateParams.edit;
    $scope.view              = $stateParams.view ? $stateParams.view : 'settings';
    $scope.ApiRepository     = ApiRepository; // used in child controller (input filters)
    $scope.flash             = flash;
    $scope.api               = api;
    $scope.version           = $stateParams.version;
    $scope.dbAdapters        = dbAdapters;
    $scope.doctrineAdapters  = doctrineAdapters;
    $scope.filterOptions     = filters;
    $scope.hydrators         = hydrators;
    $scope.validatorOptions  = validators;
    $scope.selectors         = selectors;
    $scope.sourceCode        = [];
    $scope.deleteRestService = false;
    $scope.toggleSelection   = toggleSelection;
    $scope.newService        = {
        restServiceName: '',
        dbAdapterName:   '',
        dbTableName:     '',
        doctrineObjectManager: '',
        doctrineUseGeneratedHydrator: true,
        doctrineHydrateByValue: true,
        doctrineServiceName: '',
        doctrineEntityClass: '',
        doctrineHydratorStrategies : []
    };

    $scope.resetForm = function () {
        agFormHandler.resetForm($scope);
        $scope.showNewRestServiceForm     = false;
        $scope.newService.restServiceName = '';
        $scope.newService.dbAdapterName   = '';
        $scope.newService.dbTableName     = '';
        $scope.newService.doctrineObjectManager   = '';
        $scope.newService.doctrineUseGeneratedHydrator = true;
        $scope.newService.doctrineServiceName    = '';
        $scope.newService.doctrineEntityClass     = '';
        $scope.newService.doctrineHydratorName     = '';
    };

    $scope.newService.action = 'plus';

    $scope.isLatestVersion = function () {
        return $scope.ApiRepository.isLatestVersion($scope.api);
    };
    if (!$scope.isLatestVersion()) {
        $scope.inEdit = false;
        $state.go($state.$current.name, {edit: ''}, {reload: true});
    }

    $scope.toggleEditState = function (service, flag) {
        flag = !!flag;
        $state.go($state.$current.name, {service: service, edit: (flag ? true : null)}, {notify: false});
        $scope.inEdit = flag;
    };

    $scope.isDbConnected = function (restService) {
        if (typeof restService !== 'object' || typeof restService === 'undefined') {
            return false;
        }
        if (restService.hasOwnProperty('adapter_name') || restService.hasOwnProperty('table_name') || restService.hasOwnProperty('table_service')) {
            return true;
        }
        return false;
    };

    $scope.isDoctrineConnected = function (restService) {
        if (typeof restService !== 'object' || typeof restService === 'undefined') {
            return false;
        }
        if (restService.hasOwnProperty('object_manager') || restService.hasOwnProperty('entity_class') ) {
            return true;
        }
        return false;
    };

    $scope.newService.createNewRestService = function () {
        var newServiceName = $scope.newService.restServiceName;
        ApiRepository.createNewRestService($scope.api.name, newServiceName).then(
            function (restResource) {
                flash.success = 'New Code-Connected REST service created; please wait for the list to refresh';
                $scope.resetForm();
                ApiRepository.refreshApi($scope, true, 'Finished reloading REST service list').then(
                    function () {
                        return $timeout(function () {
                            $state.go('.', { service: newServiceName, view: 'settings' }, { reload: true });
                        }, 100);
                    }
                );
            }
        ).catch(
            function (error) {
                agFormHandler.reportError(error, $scope);
            }
        );
    };

    $scope.newService.createNewDbConnectedService = function () {
        var newServiceName = $scope.newService.dbTableName;
        ApiRepository.createNewDbConnectedService($scope.api.name, $scope.newService.dbAdapterName, newServiceName).then(
            function (restResource) {
                flash.success = 'New DB-Connected REST service created; please wait for the list to refresh';
                $scope.resetForm();
                ApiRepository.refreshApi($scope, true, 'Finished reloading REST service list').then(
                    function () {
                        return $timeout(function () {
                            $state.go('.', { service: newServiceName, view: 'settings' }, { reload: true });
                        }, 100);
                    }
                );
            }
        ).catch(
            function (error) {
                agFormHandler.reportError(error, $scope);
            }
        );
    };

    $scope.newService.createNewDoctrineConnectedService = function() {
        var newServiceName = $scope.newService.doctrineServiceName;
        var route = newServiceName.toLowerCase();
        var routeIdentifier = route + '_id';
        ApiRepository.createNewDoctrineConnectedService(
            $scope.api.name,
            $scope.newService.doctrineObjectManager,
            $scope.newService.doctrineServiceName,
            $scope.newService.doctrineEntityClass,
            routeIdentifier,
            'id',
            '/' + route,
            $scope.newService.doctrineHydrateByValue,
            $scope.newService.doctrineUseGeneratedHydrator,
            $scope.newService.doctrineHydratorName,
            $scope.newService.doctrineHydratorStrategies
        ).then(
            function(restResource) {
                flash.success = "New Doctrine-Connected REST service created; please wait for the list to refresh";
                $scope.resetForm();
                ApiRepository.refreshApi($scope, true, 'Finished reloading REST service list').then(function() {
                    return $timeout(function() {
                        $state.go('.', { service: newServiceName, view: 'settings'}, { reload: true});
                    }, 1500);
                });
            },
            function(error) {
                agFormHandler.reportError(error, $scope);
            }
        );
    };

    $scope.newService.addStrategy = function() {
        $scope.newService.searching = true;
        ApiRepository.serviceExist($scope.newService.newStrategy).then(
            function(response) {
                $scope.newService.searching = false;
                var result = response.data;
                result.exist = !!result.exist;
                if (result.exist == true) {
                    $scope.newService.doctrineHydratorStrategies.push($scope.newService.newStrategy);
                    $scope.newService.newStrategy = '';
                } else {
                    flash.error = 'This strategy is not declared in the service manager';
                }
            }
        );
    };

    $scope.newService.removeStrategy = function(index) {
        $scope.newService.doctrineHydratorStrategies.splice(index, 1);
    }

      $scope.editService = {
          addStrategy: function (parent) {
              $scope.editService.searching = true;
              ApiRepository.serviceExist($scope.editService.newStrategy).then(
                  function(response) {
                      $scope.editService.searching = false;
                      var result = response.data;
                      result.exist = !!result.exist;
                      if (result.exist == true) {
                          $scope.api.restServices[parent].hydrator_strategies.push($scope.editService.newStrategy);
                          $scope.editService.newStrategy = '';
                      } else {
                          flash.error = 'This strategy is not declared in the service manager';
                      }
                  }
              );
          },
          removeStrategy: function(parent, index) {
              $scope.api.restServices[parent].hydrator_strategies.splice(index, 1);
          }
      };

    $scope.saveRestService = function (index) {
        var restServiceData = _.clone($scope.api.restServices[index]);
        var doctrineConnected = $scope.isDoctrineConnected(restServiceData);

        ApiRepository.saveRestService($scope.api.name, restServiceData, doctrineConnected).then(
            function (data) {
                agFormHandler.resetForm($scope);
                flash.success = 'REST Service updated';
                $state.go($state.$current.name, { edit: null }, {reload: true});
            }
        ).catch(
            function (error) {
                agFormHandler.reportError(error, $scope);
            }
        );
    };

    $scope.removeRestService = function (restService, recursive) {
        var doctrineConnected = $scope.isDoctrineConnected(restService);
        ApiRepository.removeRestService($scope.api.name, restService.controller_service_name, !!recursive, doctrineConnected).then(
            function (data) {
                ApiRepository.refreshApi($scope, true, 'REST Service deleted');
                $scope.deleteRestService = false;
            }
        );
    };

    $scope.getSourceCode = function (className, classType) {
        ApiRepository.getSourceCode ($scope.api.name, className).then(
            function (data) {
                $scope.filename = className + '.php';
                $scope.classType = classType + ' Class';
                if (typeof data.source === 'string') {
                    $scope.sourceCode = $sce.trustAsHtml(data.source);
                } else {
                    $scope.sourceCode = '';
                }
                $modal.open({
                    scope: $scope,
                    templateUrl: 'html/modals/source-code.html'
                });
            }
        );
    };
});

})(_);
