(function () {
    'use strict';
    angular.module('BlankApp').controller('ChatController', fn);
    fn.$inject = ['$scope','$location', '$mdSidenav', 'socket', 'userService','channelService','messageService'];

    function fn($scope,$location, $mdSidenav, socket, userService,channelService,messageService) {

        if (!userService.user.username && userService.isload) {
            $location.path('/login');
            return;
        }
        const vm = this;
        vm.channelService = channelService;
        vm.channelService.load();
        vm.messageService = messageService;
        $scope.$watch('vm.channelService.currentChannel',(n,o)=>{
            if(n!== null){
                vm.messageService.load();
            }
        });
        vm.userService = userService;
        vm.toggle = function () {
            $mdSidenav('left').toggle();
        };
        vm.isOpen = function () {
            return $mdSidenav('left').isOpen();
        };
        vm.enter = function (event) {
            if (event.keyCode === 13) {
                vm.sendMessage();
                vm.message = "";
                event.preventDefault();
            }
        };
        const message_form = {
            content:undefined,
            type:undefined,
            channel: undefined
        };
        vm.sendMessage = function () {
            if (vm.message.trim() == ""||!vm.channelService.currentChannel) {
                return;
            }
            let messageWillSend = {};
            angular.copy(message_form, messageWillSend);
            messageWillSend.content = vm.message;
            messageWillSend.type = 'text';
            messageWillSend.channel = vm.channelService.currentChannel.name;
            socket.emit('message', messageWillSend);
            vm.message = "";
        };
        socket.on('listen_message', function (data) {
            vm.messageService.push(data);
        })
    }
})();