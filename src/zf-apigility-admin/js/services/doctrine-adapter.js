(function(_) {
    'use strict';

    angular.module('ag-admin').factory(
        'DoctrineAdapterResource',
        function ($http, $q, apiBasePath, Hal) {
            var doctrineAdapterApiPath = apiBasePath + '/doctrine-adapter';
            var adapters;

            return {
                getList: function (force) {
                    if (!force &&
                        ((Array.isArray(adapters) && adapters.length > 0) ||
                          typeof(adapters) === 'object')) {
                        return $q.when(adapters);
                    }

                    var config = {
                        method: 'GET',
                        url: doctrineAdapterApiPath
                    };

                    return $http(config).then(
                        function success(response) {
                            adapters = Hal.pluckCollection('doctrine_adapter', response.data);
                            adapters = Hal.props(adapters);
                            return adapters;
                        }
                    );
                },

                createNewAdapter: function (options) {
                    return $http.post(doctrineAdapterApiPath, options)
                        .then(function (response) {
                            return Hal.props(response.data);
                        });
                },

                saveAdapter: function (name, data) {
                    return $http({method: 'patch', url: doctrineAdapterApiPath + '/' + encodeURIComponent(name), data: data})
                        .then(function (response) {
                            return Hal.props(response.data);
                        });
                },

                removeAdapter: function (name) {
                    return $http.delete(doctrineAdapterApiPath + '/' + encodeURIComponent(name))
                        .then(function (response) {
                            return true;
                        });
                }
            }
        });
})(_);