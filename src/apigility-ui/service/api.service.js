/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.service')
    .service('api', Api);

  Api.$inject = [ 'xhr', 'agApiPath' ];

  function Api(xhr, agApiPath) {

    var httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    this.getApiList = function(callback) {
      xhr.get(agApiPath + '/dashboard', '_embedded')
        .then(function (response) {
          return callback(false, response.module);
        })
        .catch(function (err) {
          return callback(true, null);
        });
    };

    this.getApi = function(name, callback) {
      xhr.get(agApiPath + '/module/' + name)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, err.detail);
      });
    };

    this.newApi = function(name, callback) {
      var allowed = [ 'name' ];
      xhr.create(agApiPath + '/module', [ name ], allowed)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        switch (err.status) {
          case 500 :
            return callback(true, 'I cannot create the API module, please check if already exists');
            break;
        }
        return callback(true, 'I cannot create the API module, please enter a valid name (alpha characters)');
      });
    };

    this.deleteApi = function(name, recursive, callback) {
      xhr.remove(agApiPath + '/module/' + name + '?recursive=' + (recursive ? 1 : 0))
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true);
      });
    };

    this.newRest = function(module, service, callback) {
      var allowed = [ 'service_name' ];
      xhr.create(agApiPath + '/module/' + module + '/rest', [ service ], allowed)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        switch (err.status) {
          case 500 :
            return callback(true, 'I cannot create the REST service, please check if already exists');
            break;
        }
        return callback(true, 'I cannot create the REST service, please enter a valid name (alpha characters)');
      });
    };

    this.updateGeneralRest = function(module, version, name, data, callback) {
      var allowed = [
        'collection_class',
        'collection_http_methods',
        'collection_name',
        'collection_query_whitelist',
        'entity_class',
        'entity_http_methods',
        'entity_identifier_name',
        'hydrator_name',
        'page_size',
        'page_size_param',
        'resource_class',
        'route_identifier_name',
        'route_match',
        'service_name'
      ];
      var keys = [];
      var args = [];
      allowed.forEach(function(key) {
        if (data.hasOwnProperty(key)) {
          keys.push(key);
          args.push(data[key]);
        }
      });
      xhr.update(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(name) + '-Controller', args, keys)
      .then(function(response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the update of the REST service');
      });
    }

    this.updateContentNegotiationRest = function(module, version, name, data, callback) {
      var allowed = [
        'service_name',
        'selector',
        'accept_whitelist',
        'content_type_whitelist'
      ];
      var keys = [];
      var args = [];
      allowed.forEach(function(key) {
        if (data.hasOwnProperty(key)) {
          keys.push(key);
          args.push(data[key]);
        }
      });
      xhr.update(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(name) + '-Controller', args, keys)
      .then(function(response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the update of the REST service');
      });
    }

    this.deleteRest = function(module, version, name, recursive, callback) {
      xhr.remove(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(name) + '-Controller?recursive=' + (recursive ? 1 : 0))
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true);
      });
    };

    this.getAuthorizationRest = function(module, version, name, callback) {
      xhr.get(agApiPath + '/module/' + module + '/authorization')
      .then(function (response) {
        var data = {};
        data.collection = [];
        data.entity = [];
        var collection = response[module + '\\V' + version + '\\Rest\\' + capitalizeFirstLetter(name) + '\\Controller::__collection__'];
        for (var method in collection) {
          if (collection[method]) {
            data.collection.push(method);
          }
        }
        var entity = response[module + '\\V' + version + '\\Rest\\' + capitalizeFirstLetter(name) + '\\Controller::__entity__'];
        for (var method in entity) {
          if (entity[method]) {
            data.entity.push(method);
          }
        }
        return callback(false, data);
      })
      .catch(function (err) {
        return callback(true, err.detail);
      });
    };

    this.saveAuthorizationRest = function(module, version, name, auth, callback) {
      var collection = {};
      var entity = {};
      httpMethods.forEach(function(method){
        collection[method] = (auth.collection.indexOf(method) > -1);
        entity[method] = (auth.entity.indexOf(method) > -1);
      });
      var data = {};
      data[module + '\\V' + version + '\\Rest\\' + capitalizeFirstLetter(name) + '\\Controller::__collection__'] = collection;
      data[module + '\\V' + version + '\\Rest\\' + capitalizeFirstLetter(name) + '\\Controller::__entity__'] = entity;
      xhr.save(agApiPath + '/module/' + module + '/authorization', data)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true);
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
      xhr.get(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(rest) + '-Controller' )
      .then(function (response) {
        // Create the fields property in the response
        var rest = angular.copy(response);
        rest.fields = [];
        var i = 0;
        if (response._embedded) {
          while (typeof response._embedded.input_filters[0][i] !== 'undefined') {
            rest.fields[i] = response._embedded.input_filters[0][i];
            i++;
          }
          if (response._embedded.documentation) {
            delete response._embedded.documentation._links;
            rest.documentation = response._embedded.documentation;
          }
        }
        // Remove hal json properties
        delete rest._links;
        delete rest._embedded;
        return callback(rest);
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
        response.selectors.forEach(function(entry){
          delete entry._links;
        });
        return callback(response.selectors);
      })
      .catch(function (err) {
        console.log('Failed to get the list of Content Negotiation', err);
        return false;
      });
    };

    this.newSelector = function(name, callback) {
      var allowed = [ 'content_name' ];
      xhr.create(agApiPath + '/content-negotiation', [ name ], allowed)
      .then(function (response) {
        delete response._links;
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'I cannot create the Selector, please enter a valid name (alpha characters)');
      });
    }

    this.deleteSelector = function(name, callback) {
      xhr.remove(agApiPath + '/content-negotiation/' + name)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true);
      });
    };

    this.saveSelector = function(selector, callback) {
      var allowed = [ 'selectors' ];
      var data = angular.copy(selector);
      delete data.content_name;
      xhr.update(agApiPath + '/content-negotiation/' + selector.content_name, [ data ], allowed )
      .then(function(response) {
        delete response._links;
        return callback(false, response);
      })
      .catch(function (err) {
        switch (err.status) {
          case 422 :
            if (err.data.hasOwnProperty('validation_messages') &&
                err.data.validation_messages.hasOwnProperty('selectors') &&
                err.data.validation_messages.selectors.hasOwnProperty('classNotFound')) {
              return callback(true, err.data.validation_messages.selectors.classNotFound);
            }
            break;
          }
        return callback(true, 'Error during the API communication');
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

    this.saveRestField = function(module, version, restname, fields, callback) {
      xhr.save(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(restname) + '-Controller/input-filter', fields)
      .then(function(response) {
        // Remove unused properties from the response
        delete response._links;
        delete response.input_filter_name;
        // Transform the key/values in array
        response = Object.keys(response).map(function(key) { return response[key] });
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the API communication');
      });
    };

    this.getAuthorizationRpc = function(module, version, name, callback) {
      xhr.get(agApiPath + '/module/' + module + '/authorization')
      .then(function (response) {
        var data = [];
        var controller = response[module + '\\V' + version + '\\Rpc\\' + capitalizeFirstLetter(name) + '\\Controller::' + name];
        for (var method in controller) {
          if (controller[method]) {
            data.push(method);
          }
        }
        return callback(false, data);
      })
      .catch(function (err) {
        return callback(true, err.detail);
      });
    };

    this.saveAuthorizationRpc = function(module, version, name, auth, callback) {
      var http = {};
      httpMethods.forEach(function(method){
        http[method] = (auth.indexOf(method) > -1);
      });
      var data = {};
      data[module + '\\V' + version + '\\Rpc\\' + capitalizeFirstLetter(name) + '\\Controller::' + name] = http;
      xhr.save(agApiPath + '/module/' + module + '/authorization', data)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true);
      });
    };

    this.saveRpcField = function(module, version, rpcname, fields, callback) {
      xhr.save(agApiPath + '/module/' + module + '/rpc/' + module + '-V' + version + '-Rpc-' + capitalizeFirstLetter(rpcname) + '-Controller/input-filter', fields)
      .then(function(response) {
        // Remove unused properties from the response
        delete response._links;
        delete response.input_filter_name;
        // Transform the key/values in array
        response = Object.keys(response).map(function(key) { return response[key] });
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the API communication');
      });
    };

    this.saveRestDoc = function(module, version, restname, doc, callback) {
      xhr.save(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(restname) + '-Controller/doc', doc)
      .then(function(response) {
        // Remove unused properties from the response
        delete response._links;
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the API communication');
      });
    }

    this.saveRpcDoc = function(module, version, rpcname, doc, callback) {
      xhr.save(agApiPath + '/module/' + module + '/rpc/' + module + '-V' + version + '-Rpc-' + capitalizeFirstLetter(rpcname) + '-Controller/doc', doc)
      .then(function(response) {
        // Remove unused properties from the response
        delete response._links;
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the API communication');
      });
    }

    this.newRpc = function(module, service, route, callback) {
      var allowed = [ 'service_name', 'route_match' ];
      xhr.create(agApiPath + '/module/' + module + '/rpc', [ service, route ], allowed)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        switch (err.status) {
          case 500 :
            return callback(true, 'I cannot create the RPC service, please check if already exists');
            break;
          }
        return callback(true, 'I cannot create the RPC service, please enter a valid name (alpha characters)');
      });
    };

    this.getRpc = function(module, version, rpc, callback) {
      xhr.get(agApiPath + '/module/' + module + '/rpc/' + module + '-V' + version + '-Rpc-' + capitalizeFirstLetter(rpc) + '-Controller' )
      .then(function (response) {
        // Create the fields property in the response
        var rpc = angular.copy(response);
        rpc.fields = [];
        var i = 0;
        if (response._embedded) {
          while (typeof response._embedded.input_filters[0][i] !== 'undefined') {
            rpc.fields[i] = response._embedded.input_filters[0][i];
            i++;
          }
          if (response._embedded.documentation) {
            delete response._embedded.documentation._links;
            rpc.documentation = response._embedded.documentation;
          }
        }
        // Remove hal json properties
        delete rpc._links;
        delete rpc._embedded;
        return callback(rpc);
      })
      .catch(function (err) {
        console.log('Failed to get the RPC service', err);
        return false;
      });
    };

    this.updateGeneralRpc = function(module, version, rpc, data, callback) {
      var allowed = [
        'accept_whitelist',
        'content_type_whitelist',
        'controller_class',
        'http_methods',
        'route_match',
        'selector',
        'service_name'
      ];
      var keys = [];
      var args = [];
      allowed.forEach(function(key) {
        if (data.hasOwnProperty(key)) {
          keys.push(key);
          args.push(data[key]);
        }
      });
      xhr.update(agApiPath + '/module/' + module + '/rpc/' + module + '-V' + version + '-Rpc-' + capitalizeFirstLetter(rpc) + '-Controller', args, keys)
      .then(function(response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the update of the RPC service');
      });
    }

    this.deleteRpc = function(module, version, name, recursive, callback) {
      xhr.remove(agApiPath + '/module/' + module + '/rpc/' + module + '-V' + version + '-Rpc-' + capitalizeFirstLetter(name) + '-Controller?recursive=' + (recursive ? 1 : 0))
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true);
      });
    };

    this.getAuthentication = function (callback) {
      xhr.get(agApiPath + '/authentication')
        .then(function (response) {
          if (response.hasOwnProperty('_links')) {
            delete response._links;
          }
          return callback(false, response);
        })
        .catch(function (err) {
          return callback(true, null);
        });
    };

    this.addBasicAuthentication = function (auth, callback) {
      var allowed = [
        'accept_schemes',
        'htpasswd',
        'realm'
      ];
      if (!auth.hasOwnProperty('accept_schemes')) {
        auth.accept_schemes = [];
      }
      auth.accept_schemes.push('basic');
      xhr.create(agApiPath + '/authentication/http-basic', [ auth.accept_schemes, auth.htpasswd, auth.realm ], allowed)
      .then(function (response) {
        if (response.hasOwnProperty('_links')) {
          delete response._links;
        }
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, null);
      });
    };

    this.saveBasicAuthentication = function (auth, callback) {
      var allowed = [
        'htpasswd',
        'realm'
      ];
      xhr.update(agApiPath + '/authentication/http-basic', [ auth.htpasswd, auth.realm ], allowed)
      .then(function (response) {
        if (response.hasOwnProperty('_links')) {
          delete response._links;
        }
        return callback(false, response);
      })
      .catch(function (err) {
        switch (err.status) {
          case 422 :
            return callback(true, err.validation_messages.htpasswd[0]);
            break;
          }
        return callback(true, 'Error saving the basic authentication');
      });
    };

    this.getApiDocumentList = function(callback) {
      xhr.get(agApiPath + '/../documentation')
        .then(function (response) {
          return callback(false, response);
        })
        .catch(function (err) {
          return callback(true, null);
        });
    };

    this.getApiDocument = function(apiName, version, callback) {
      xhr.get(agApiPath + '/../documentation/' + apiName + '-v' + version)
        .then(function (response) {
          return callback(false, response);
        })
        .catch(function (err) {
          return callback(true, null);
        });
    };

    function capitalizeFirstLetter(string)
    {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    this.mapTagInput = function(value) {
      return value.text;
    };
  }
})();
