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
    }

    var addApi = function(api) {
      apis.push(api);
    }

    var removeApi = function(apiName) {
      var newApis = [];
      apis.forEach(function(api){
        if (api.name != apiName){
          newApis.push(api);
        }
      });
      apis = newApis;
    }

    var getApis = function(){
      return apis;
    }

    return {
      setApis   : setApis,
      addApi    : addApi,
      getApis   : getApis,
      removeApi : removeApi
    };
  }

})();
