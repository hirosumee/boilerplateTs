(function() {
    'use strict';
    angular.module('BlankApp').controller('ChatController', fn);
    fn.$inject = ['$mdSidenav', 'socket'];
    function fn($mdSidenav, socket) {
        const vm = this;

        vm.toggle = function() {
            $mdSidenav('left').toggle();
        };
        vm.isOpen = function() {
            return $mdSidenav('left').isOpen();
        };
    }
})();
