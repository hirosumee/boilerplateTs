(function () {
    'use strict';
    angular.module('BlankApp')
        .controller('HomeController', fn);
    fn.$inject = ['$stateParams', 'FileLoaderService'];

    function fn($stateParams,FileLoaderService) {
        let vm = this;
        vm.scope = $stateParams.scope;
        vm.fileObj = FileLoaderService;
        if (vm.fileObj.get(vm.scope).length === 0) {
            vm.fileObj.load(vm.scope);
        }
        else {
            vm.fileObj.reload(vm.scope);
        }
        //TODO: form register , file info , your profile
    }
}());