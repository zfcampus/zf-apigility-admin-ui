/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.service')
    .service('api', Api);

  Api.$inject = [ 'xhr', 'agApiPath', '$http', '$q' ];

  function Api(xhr, agApiPath, $http, $q) {

    this.http = $http;
    this.q    = $q;

    var httpMethods = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    this.getApiList = function(callback) {
      xhr.get(agApiPath + '/dashboard', '_embedded')
        .then(function (response) {
          response.module.forEach(function(api){
            api.selected_version = Math.max.apply(Math, api.versions);
            if (api.hasOwnProperty('_links')) {
              delete api._links;
            }
          });
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

    this.strategyExists = function (strategyName, callback) {
      xhr.get(agApiPath + '/strategy/' + strategyName)
        .then(function (response) {
          return callback(false, response.success);
        })
        .catch(function (err) {
          return callback(true, err);
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
        }
        return callback(true, 'I cannot create the REST service, please enter a valid name (alpha characters)');
      });
    };

    this.updateGeneralRest = function(module, version, name, data, isDoctrine, callback) {
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
        'service_name',
        'table_name',
        'adapter_name'
      ];
      if (isDoctrine) {
        allowed.push('strategies', 'by_value');
      }
      var result = filterData(data, allowed);
      var path = isDoctrine ? '/doctrine/' : '/rest/';
      xhr.update(agApiPath + '/module/' + module + path + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(name) + '-Controller', result.value, result.key)
      .then(function(response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the update of the REST service');
      });
    };

    this.updateContentNegotiationRest = function(module, version, name, data, callback) {
      var allowed = [
        'service_name',
        'selector',
        'accept_whitelist',
        'content_type_whitelist'
      ];
      var result = filterData(data, allowed);
      xhr.update(agApiPath + '/module/' + module + '/rest/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(name) + '-Controller', result.value, result.key)
      .then(function(response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the update of the REST service');
      });
    };

    this.deleteRest = function(module, version, name, isDoctrine, recursive, callback) {
      var path = isDoctrine ? 'doctrine' : 'rest';
      xhr.remove(agApiPath + '/module/' + module + '/' + path + '/' + module + '-V' + version + '-Rest-' + capitalizeFirstLetter(name) + '-Controller?recursive=' + (recursive ? 1 : 0))
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
        var method;
        var data = {};
        data.collection = [];
        data.entity = [];
        var collection = response[module + '\\V' + version + '\\Rest\\' + capitalizeFirstLetter(name) + '\\Controller::__collection__'];
        for (method in collection) {
          if (collection[method]) {
            data.collection.push(method);
          }
        }
        var entity = response[module + '\\V' + version + '\\Rest\\' + capitalizeFirstLetter(name) + '\\Controller::__entity__'];
        for (method in entity) {
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
          response.rest.forEach(function(entry){
            if (entry.hasOwnProperty('_links')) {
              delete entry._links;
            }
          });
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
        response.rpc.forEach(function(entry){
          if (entry.hasOwnProperty('_links')) {
            delete entry._links;
          }
        });
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
        if (response.hasOwnProperty('_embedded')) {
          if (response._embedded.hasOwnProperty('input_filters')) {
            while (!angular.isUndefined(response._embedded.input_filters[0][i])) {
              rest.fields[i] = response._embedded.input_filters[0][i];
              i++;
            }
          }
          if (response._embedded.hasOwnProperty('documentation')) {
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

    this.getRestDoctrineMetadata = function(entity_manager, entity, callback) {
      xhr.get(agApiPath + '/doctrine/' + entity_manager + '/metadata/' + encodeURIComponent(entity))
        .then(function(response) {
          return callback(false, response);
        })
        .catch(function(err) {
          return callback(true, 'I cannot retrieve entity metadata');
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
    };

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
        response = Object.keys(response).map(function(key) { return response[key]; });
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
        response = Object.keys(response).map(function(key) { return response[key]; });
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
    };

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
    };

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
          while (!angular.isUndefined(response._embedded.input_filters[0][i])) {
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
        return callback(false, rpc);
      })
      .catch(function (err) {
        return callback(true, 'Error getting the RPC service');
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
      var result = filterData(data, allowed);
      xhr.update(agApiPath + '/module/' + module + '/rpc/' + module + '-V' + version + '-Rpc-' + capitalizeFirstLetter(rpc) + '-Controller', result.value, result.key)
      .then(function(response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, 'Error during the update of the RPC service');
      });
    };

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

    this.getDatabase = function(callback) {
      xhr.get(agApiPath + '/db-adapter', '_embedded')
        .then(function (response) {
          response.db_adapter.forEach(function(entry){
            delete entry._links;
          });
          return callback(true, response);
        })
        .catch(function (err) {
          return callback(true, null);
        });
    };

    this.addDatabase = function(db, callback) {
      var allowed = [
        'adapter_name',
        'charset',
        'database',
        'driver',
        'hostname',
        'username',
        'password',
        'port',
        'dsn',
        'driver_options'
      ];
      var data = filterData(db, allowed);
      xhr.create(agApiPath + '/db-adapter', data.value, data.key)
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

    this.saveDatabase = function(db, callback) {
      var allowed = [
        'charset',
        'database',
        'driver',
        'hostname',
        'username',
        'password',
        'port',
        'dsn',
        'driver_options'
      ];
      var data = filterData(db, allowed);
      xhr.update(agApiPath + '/db-adapter/' + db.adapter_name, data.value, data.key)
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

    this.deleteDatabase = function(name, callback) {
      xhr.remove(agApiPath + '/db-adapter/' + name)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true);
      });
    };

    this.autodiscover = function(module, version, isDoctrine, name, callback) {
      var doctrine_route = isDoctrine ? 'doctrine/' : '';
      xhr.get(agApiPath + '/module/' + module + '/' + version + '/autodiscovery/' + doctrine_route + name)
        .then(function (response) {
          return callback(true, response);
        })
        .catch(function (err) {
          return callback(true, null);
        });
    };

    this.newDbConnected = function(module, adapter, table, callback) {
      var allowed = [ 'adapter_name', 'table_name' ];
      xhr.create(agApiPath + '/module/' + module + '/rest', [ adapter, table ], allowed)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        switch (err.status) {
          case 500 :
            return callback(true, 'I cannot create the DB-Connected service, please check if already exists');
        }
        return callback(true, 'I cannot create the DB-Connected service, please check your database server');
      });
    };

    this.getDoctrineAdapters = function (callback) {
      var httpOptions = {
        method  : 'GET',
        url     : agApiPath + '/doctrine-adapter',
        headers : { Accept: 'application/json' },
        cache   : false
      };
      var
        deferred = $q.defer(),
        promise  = $http(httpOptions),
        key = '_embedded',
        response;

      promise
        .then(function success (res) {
          if (res.status == 204) {
            return callback(true, res.status);
          }
          var data = res.data;
          deferred.resolve(data[key]);

          if (data.hasOwnProperty(key)) {
            response = data[key];
            response.doctrine_adapter.forEach(function(entry) {
              delete entry._links;
            });
            return callback(false, response);
          }
        })
        .catch(function error (err) {
          deferred.reject(err);
        });

    };

    this.newDoctrine = function(module, adapter, entity, callback) {
      var allowed = [ 'object_manager', 'entity_class', 'service_name' ];
      xhr.create(agApiPath + '/module/' + module + '/doctrine/' + entity.service_name, [ adapter, entity.entity_class, entity.service_name ], allowed)
        .then(function (response) {
          return callback(false, response);
        })
        .catch(function (err) {
          switch (err.status) {
            case 500 :
              return callback(true, 'I cannot create the Doctrine-Connected service, please check if already exists');
          }
          return callback(true, 'I cannot create the Doctrine-Connected service, please check your database server');
        });
    };

    this.newVersion = function(module, callback) {
      var allowed = [ 'module' ];
      xhr.update(agApiPath + '/versioning', [ module ], allowed)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, null);
      });
    };

    this.setDefaultVersion = function(module, version, callback) {
      var allowed = [ 'module', 'version' ];
      xhr.update(agApiPath + '/default-version', [ module, version ], allowed)
      .then(function (response) {
        return callback(false, response);
      })
      .catch(function (err) {
        return callback(true, null);
      });
    };

    this.getSourceCode = function(module, classname, callback) {
      xhr.get(agApiPath + '/source?module=' + module + '&class=' + classname)
        .then(function (response) {
          return callback(false, response);
        })
        .catch(function (err) {
          return callback(true, null);
        });
    };

    this.buildPackage = function(build, apis, callback) {
      var allowed = [ 'format', 'apis', 'composer', 'config', 'zpk_xml', 'zpk_assets', 'zpk_version' ];
      var selectApis = {};
      apis.forEach(function(entry){
        selectApis[entry.name] = build.modules.indexOf(entry.name) >= 0;
      });
      var data = [ build.format, selectApis, build.composer, build.config ];
      if (build.format === 'zpk') {
        data.push.apply(data, [ build.zpk.xml, build.zpk.assets, build.zpk.version ]);
      }
      xhr.create(agApiPath + '/package', data, allowed)
        .then(function (response) {
          if (!response) {
            return callback(true, 'Error occurred building the package');
          }
          return callback(false, response);
        })
        .catch(function (err) {
          return callback(true, 'Error occurred building the package');
        });
    };

    function filterData(data, allowed){
      var result = { key : [], value : [] };
      allowed.forEach(function(entry){
        if (data.hasOwnProperty(entry)) {
          result.key.push(entry);
          result.value.push(data[entry]);
        }
      });
      return result;
    }

    function capitalizeFirstLetter(string)
    {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    this.mapTagInput = function(value) {
      return value.text;
    };
  }
})();
