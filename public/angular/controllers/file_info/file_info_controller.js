(function () {
    angular.module('BlankApp')
        .controller('FileInfoController',fn);
    fn.$inject = ['$stateParams','$http'];
    function fn($stateParams,$http) {
        const vm = this;
        vm.loadFileInfo = function () {
            if(!$stateParams.id) return;
            $http.post(`/file/info/${$stateParams.id}`)
                .then(function (res) {
                    
                })
        }
    }
}());