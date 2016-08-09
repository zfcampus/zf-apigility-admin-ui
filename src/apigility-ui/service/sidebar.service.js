(function () {
  'use strict';

  angular
    .module('apigility.service')
    .service('SidebarService', SidebarService);

  SidebarService.$inject = [ 'api' ];

  function SidebarService(api) {
    var apis = [];
    var selected = '';

    var addVersion = function(apiName, version) {
      for(var i = 0; i < apis.length; i++) {
        if (apis[i].name === apiName) {
          apis[i].versions.push(version);
          return;
        }
      }
    };

    var setSelectedVersion = function(apiName, version) {
      apis.forEach(function (currentApi) {
        if (currentApi.name !== apiName) {
          return;
        }

        api.getRestList(apiName, version, function (restResult) {
          currentApi.rest = [];
          restResult.forEach(function (entry) {
            currentApi.rest.push(entry);
          });
        });

        api.getRpcList(apiName, version, function (rpcResult) {
          currentApi.rpc = [];
          rpcResult.forEach(function (entry) {
            currentApi.rpc.push(entry);
          });
        });
      });
    };

    var getSelectedVersion = function(apiName){
      for(var i = 0; i < apis.length; i++) {
        if (apis[i].name === apiName) {
          return apis[i].selected_version;
        }
      }
    };

    var isLastVersion = function(version, apiName){
      for(var i = 0; i < apis.length; i++) {
        if (apis[i].name === apiName) {
          return (version == Math.max.apply(Math, apis[i].versions));
        }
      }
      return false;
    };

    var setApis = function(data) {
      apis = data;
    };

    var addApi = function(api) {
      if (!api.hasOwnProperty('selected_version')) {
        api.selected_version = Math.max.apply(Math, api.versions);
      }
      apis.push(api);
    };

    var removeApi = function(apiName) {
      for(var i = 0; i < apis.length; i++) {
        if (apis[i].name === apiName) {
          apis.splice(i,1);
          return;
        }
      }
    };

    var getApis = function(){
      return apis;
    };

    var addRestService = function(apiName, serviceName){
      apis.forEach(function(api){
        if (api.name == apiName) {
          api.rest.push(serviceName);
          return;
        }
      });
    };

    var removeRestService = function(apiName, serviceName) {
      var newApis = [];
      var apiToUpdate;
      var toRemove;

      apis.forEach(function (api) {
        if (api.name !== apiName) {
          newApis.push(api);
          return;
        }

        toRemove = false;
        api.rest.forEach(function (service, index) {
          if (service.controller_service_name !== serviceName) {
            return;
          }

          toRemove = index;
        });

        if (false === toRemove) {
          newApis.push(api);
          return;
        }

        apiToUpdate = angular.copy(api);
        apiToUpdate.rest.splice(toRemove, 1);
        newApis.push(apiToUpdate);
      });

      apis = newApis;
    };

    var removeRpcService = function(apiName, serviceName) {
      var newApis = [];
      var apiToUpdate;
      var toRemove;

      apis.forEach(function (api) {
        if (api.name !== apiName) {
          newApis.push(api);
          return;
        }

        toRemove = false;
        api.rpc.forEach(function (service, index) {
          if (service.controller_service_name !== serviceName) {
            return;
          }

          toRemove = index;
        });

        if (false === toRemove) {
          newApis.push(api);
          return;
        }

        apiToUpdate = angular.copy(api);
        apiToUpdate.rpc.splice(toRemove, 1);
        newApis.push(apiToUpdate);
      });

      apis = newApis;
    };

    var addRpcService = function(apiName, serviceName){
      apis.forEach(function(api){
        if (api.name == apiName) {
          api.rpc.push(serviceName);
          return;
        }
      });
    };

    var getSelected = function(){
      return selected;
    };

    var setSelected = function(data){
      selected = data;
    };

    return {
      addVersion : addVersion,
      setSelectedVersion : setSelectedVersion,
      getSelectedVersion : getSelectedVersion,
      isLastVersion : isLastVersion,
      setApis   : setApis,
      addApi    : addApi,
      getApis   : getApis,
      removeApi : removeApi,
      addRestService : addRestService,
      removeRestService : removeRestService,
      addRpcService : addRpcService,
      removeRpcService : removeRpcService,
      getSelected : getSelected,
      setSelected : setSelected
    };
  }

})();
