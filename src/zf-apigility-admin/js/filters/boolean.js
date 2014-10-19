(function() {'use strict';
    angular.module('ag-admin').filter('boolean', function() {
        return function (input) {
            if (typeof(input) == 'boolean') {
                return input ? 'Yes' : 'No';
            }
        };
    });

})();
