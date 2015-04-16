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
      for(var i = 0; i < apis.length; i++) {
        if (apis[i].name === apiName) {
          apis[i].selected_version = version;
          api.getRestList(apiName, version, function(result){
            apis[i].rest = [];
            result.forEach(function(entry){
              apis[i].rest.push(entry.service_name);
            });
          });
          api.getRpcList(apiName, version, function(result){
            apis[i].rpc = [];
            result.forEach(function(entry){
              apis[i].rpc.push(entry.service_name);
            });
          });
          return;
        }
      }
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
    }

    var addRestService = function(apiName, serviceName){
      apis.forEach(function(api){
        if (api.name == apiName) {
          api.rest.push(serviceName);
          return;
        }
      });
    };

    var removeRestService = function(apiName, serviceName){
      var newApis = [];
      apis.forEach(function(api){
        if (api.name == apiName) {
          api.rest.splice(api.rest.indexOf(serviceName),1);
        }
        newApis.push(api);
      })
      apis = newApis;
    };

    var removeRpcService = function(apiName, serviceName){
      var newApis = [];
      apis.forEach(function(api){
        if (api.name == apiName) {
          api.rpc.splice(api.rpc.indexOf(serviceName),1);
        }
        newApis.push(api);
      })
      apis = newApis;
    };

    var addRpcService = function(apiName, serviceName){
      apis.forEach(function(api){
        if (api.name == apiName) {
          api.rpc.push(serviceName);
          return;
        }
      });
    }

    var getSelected = function(){
      return selected;
    }

    var setSelected = function(data){
      selected = data;
    }

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
