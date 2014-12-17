/* jshint latedef: false */
(function () {
  'use strict';

  angular
    .module('apigility.api')
    .service('xhr', xhr);

  xhr.$inject = ['$http', '$q'];

  function xhr ($http, $q) {
    /* jshint validthis: true */
    this.http = $http;
    this.q    = $q;

    this.get    = get;
    this.create = create;
    this.update = update;
    this.remove = remove;
  }

  function get(path, key) {
    /* jshint validthis: true */
    var promise = send(this.http, this.q, 'GET', path, { key: key });
    return promise;
  }

  function create(path, args, allowed, key) {
    /* jshint validthis: true */
    return send(this.http, this.q, 'POST', path, {
      data: marshalData(allowed, args),
      key: key
    });
  }

  function update(path, args, allowed, key) {
    /* jshint validthis: true */
    return send(this.http, this.q, 'PATCH', path, {
      data: marshalData(allowed, args),
      key: key
    });
  }

  function remove(path) {
    /* jshint validthis: true */
    return send(this.http, this.q, 'DELETE', path);
  }

  function send($http, $q, method, path, options) {
    var headers = { Accept: 'application/json' };
    if (method === 'POST' || method === 'PATCH') {
      headers['Content-Type'] = 'application/json';
    }

    var httpOptions = {
      method  : method,
      url     : path,
      headers : headers
    };

    if (method === 'POST' || method === 'PATCH') {
      if (! options || ! options.data) {
        throw new Error('Missing data for ' + method + ' operation');
      }
      httpOptions.data = options.data;
    }

    var
      deferred = $q.defer(),
      promise  = $http(httpOptions),
      key;

    if (options && options.hasOwnProperty('key') && options.key) {
      key = options.key;
    }

    promise.then(function success (res) {
      var data = res.data;

      if (key && data.hasOwnProperty(key)) {
        deferred.resolve(data[key]);
        return;
      }

      if (key &&
        data.hasOwnProperty('_embedded') &&
        data._embedded.hasOwnProperty(key)) {
        deferred.resolve(data._embedded[key]);
        return;
      }

      deferred.resolve(data);
    });

    promise.catch(function error (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function marshalData(allowed, args) {
    if (args.length === 1 &&
        typeof args[0] === 'object') {
       return args[0];
    }

    var data = {};
    for (var i = 0; i < allowed.length; i += 1) {
      if (typeof args[i] === 'undefined') {
        break;
      }
      data[allowed[i]] = args[i];
    }
    return data;
  }
})();
