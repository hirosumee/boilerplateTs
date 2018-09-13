(function() {
    'use strict';
    angular.module('BlankApp').controller('HomeController', fn);
    fn.$inject = ['$stateParams', 'FileLoaderService', '$location'];

    function fn($stateParams, FileLoaderService, $location) {
        let vm = this;
        vm.scope = $stateParams.scope || 'global';
        vm.fileObj = FileLoaderService;
        vm.fileInfoView = function(id) {
            $location.path(`/info/${id}`);
        };
        if (vm.fileObj.get(vm.scope).length === 0) {
            vm.fileObj.load(vm.scope);
        } else {
            vm.fileObj.reload(vm.scope);
        }
        //TODO: form register , file info , your profile
    }
})();
