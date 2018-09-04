(function () {
    angular.module('BlankApp')
        .factory('FileLoaderService', fn);
    fn.$inject = ['$http'];

    function fn($http) {
        return {
            me: [],
            global: [],
            load(scope) {
                let that = this;
                $http.post(`/file/load/${scope}`)
                    .then(function (res) {
                        that[scope] = res.data;
                    });
            },
            reload(scope) {
                let that = this;
                //should be add query last file for server check
                $http.post(`/file/load/${scope}`)
                    .then(function (res) {
                        that[scope].clear();
                        res.data.forEach(that[scope].push);
                    });
            },
            get(scope) {
                return this[scope];
            }
        }
    }
}());