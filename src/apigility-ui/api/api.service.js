/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.api')
    .service('api', Api);

  Api.$inject = [ 'xhr', 'agApiPath' ];

  function Api(xhr, agApiPath) {

    this.getApiList = function(callback) {
      xhr.get(agApiPath + '/dashboard', '_embedded')
        .then(function (response) {
          return callback(response.module);
        })
        .catch(function (err) {
          console.log('Failed to get the list of APIs', err);
          return false;
        });
    };

    this.getRestList = function(module, version, callback) {
      xhr.get(agApiPath + '/module/' + module + '/rest?version=' + version, '_embedded')
        .then(function (response) {
          return callback(response.rest);
        })
        .catch(function (err) {
          console.log('Failed to get the list of REST services', err);
          return false;
        });
    };

    this.getRpcList = function(module, version, callback) {
      xhr.get(agApiPath + '/module/' + module + '/rpc?version=' + version, '_embedded')
      .then(function (response) {
        return callback(response.rpc);
      })
      .catch(function (err) {
        console.log('Failed to get the list of RPC services', err);
        return false;
      });
    };

    this.getRest = function(module, version, rest, callback) {
      xhr.get(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + rest + '-Controller' )
      .then(function (response) {
        return callback(response);
      })
      .catch(function (err) {
        console.log('Failed to get the REST service', err);
        return false;
      });
    };

    this.getHydrators = function(callback) {
      xhr.get(agApiPath + '/hydrators', 'hydrators' )
      .then(function (response) {
        return callback(response);
      })
      .catch(function (err) {
        console.log('Failed to get the list of Hydrators', err);
        return false;
      });
    };

    this.getContentNegotiation = function(callback) {
      xhr.get(agApiPath + '/content-negotiation', '_embedded' )
      .then(function (response) {
        return callback(response);
      })
      .catch(function (err) {
        console.log('Failed to get the list of Content Negotiation', err);
        return false;
      });
    };

    this.getValidators = function(callback) {
      xhr.get(agApiPath + '/validators', 'validators' )
      .then(function (response) {
        return callback(response);
      })
      .catch(function (err) {
        console.log('Failed to get the list of Validators', err);
        return false;
      });
    };

    this.getFilters = function(callback) {
      xhr.get(agApiPath + '/filters', 'filters' )
      .then(function (response) {
        return callback(response);
      })
      .catch(function (err) {
        console.log('Failed to get the list of Filters', err);
        return false;
      });
    };
  }
})();
