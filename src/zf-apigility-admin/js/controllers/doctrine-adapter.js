(function(_) {
    'use strict';

    angular.module('ag-admin').controller(
        'DoctrineAdapterController',
        function ($scope, $state, $stateParams, flash, DoctrineAdapterResource, doctrineAdapters, agFormHandler) {
            $scope.doctrineAdapters = doctrineAdapters;
            $scope.showNewDoctrineAdapterForm = false;
            $scope.activeAdapter = $stateParams.adapter ? $stateParams.adapter : '';
            $scope.inEdit = !!$stateParams.edit;

            $scope.ui = {
                ormAdapters: {
                    'Doctrine\\DBAL\\Driver\\DrizzlePDOMySql\\Driver': 'DrizzlePDOMySql',
                    'Doctrine\\DBAL\\Driver\\IbmDb2\\DB2Driver': 'IbmDb2',
                    'Doctrine\\DBAL\\Driver\\Mysqli\\Driver': 'Mysqli',
                    'Doctrine\\DBAL\\Driver\\OCI8\\Driver': 'Oci8',
                    'Doctrine\\DBAL\\Driver\\PDOIbm\\Driver': 'Pdo_IBM',
                    'Doctrine\\DBAL\\Driver\\PDOMySql\\Driver': 'Pdo_Mysql',
                    'Doctrine\\DBAL\\Driver\\PDOOracle\\Driver': 'Pdo_Oracle',
                    'Doctrine\\DBAL\\Driver\\PDOPgSql\\Driver': 'Pdo_Pgsql',
                    'Doctrine\\DBAL\\Driver\\PDOSqlite\\Driver': 'Pdo_Sqlite',
                    'Doctrine\\DBAL\\Driver\\PDOSqlsrv\\Driver': 'Pdo_Sqlsrv',
                    'Doctrine\\DBAL\\Driver\\Sqlsrv\\Driver': 'Sqlsrv'
                }
            };

            $scope.resetForm = function() {
                $scope.showNewDoctrineAdapterForm = false;
                $scope.adapterName = '';
                $scope.driverClass = '';
                $scope.database = '';
                $scope.username = '';
                $scope.password = '';
                $scope.hostname = 'localhost';
                $scope.port = '';
            }

            function updateDoctrineAdapters(force, message) {
                DoctrineAdapterResource.getList(force)
                    .then(function (updatedAdapters) {
                        if (message) {
                            flash.success = message;
                        }

                        $state.go($state.current, { edit: '' }, { reload: true, inherit: true, notify: true });
                    });
            }

            $scope.saveDoctrineAdapter = function (index) {
                var doctrineAdapter = $scope.doctrineAdapters[index];

                var options;

                if (doctrineAdapter.adapter_name != 'odm_default') {
                    options = {
                        driverClass: doctrineAdapter.driverClass,
                        params: {
                            path: doctrineAdapter.params.path,
                            dbname: doctrineAdapter.params.dbname,
                            user: doctrineAdapter.params.user,
                            password: doctrineAdapter.params.password,
                            host: doctrineAdapter.params.host,
                            port: doctrineAdapter.params.port
                        }
                    };
                    if (doctrineAdapter.driverClass != 'Doctrine\\DBAL\\Driver\\PDOSqlite\\Driver') {
                        delete options.params.path;
                    }
                } else {
                    options = {
                        dbname: doctrineAdapter.dbname,
                        connectionString: doctrineAdapter.connectionString,
                        user: doctrineAdapter.user,
                        password: doctrineAdapter.password,
                        port: doctrineAdapter.port,
                        server: doctrineAdapter.server
                    };
                }

                DoctrineAdapterResource.saveAdapter(doctrineAdapter.adapter_name, options)
                    .then(function (doctrineAdapter) {
                        agFormHandler.resetForm($scope);
                        updateDoctrineAdapters(true, 'Doctrine adapter ' + doctrineAdapter.adapter_name + ' updated');
                    }, function (error) {
                        agFormHandler.reportError(error, $scope);
                    });
            }

            $scope.removeDoctrineAdapter = function (adapter_name) {
                DoctrineAdapterResource.removeAdapter(adapter_name)
                    .then(function () {
                        updateDoctrineAdapters(true, 'Doctrine adapter ' + adapter_name + ' deleted');
                        $scope.deleteDoctrineAdapter = false;
                    });
            }
        }
    );
})(_);
