(function () {
  'use strict';

  angular
    .module('apigility.service')
    .service('Apis', Apis);

  Apis.$inject = [ 'api' ];

  function Apis(api) {
    var apis = [];

    var setApis = function(data) {
      apis = data;
    };

    var addApi = function(api) {
      apis.push(api);
    };

    var removeApi = function(apiName) {
      var newApis = [];
      apis.forEach(function(api) {
        if (api.name != apiName) {
          newApis.push(api);
        }
      });
      apis = newApis;
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
          api.rest.splice(api.rest.indexOf(serviceName)-1,1);
        }
        newApis.push(api);
      })
      apis = newApis;
    };

    var removeRpcService = function(apiName, serviceName){
      var newApis = [];
      apis.forEach(function(api){
        if (api.name == apiName) {
          api.rpc.splice(api.rpc.indexOf(serviceName)-1,1);
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

    return {
      setApis   : setApis,
      addApi    : addApi,
      getApis   : getApis,
      removeApi : removeApi,
      addRestService : addRestService,
      removeRestService : removeRestService,
      addRpcService : addRpcService,
      removeRpcService : removeRpcService
    };
  }

})();
