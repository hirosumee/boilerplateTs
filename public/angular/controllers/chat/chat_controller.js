(function() {
    'use strict';
    angular.module('BlankApp').controller('ChatController', fn);
    fn.$inject = ['$location','$timeout','$mdSidenav', 'socket','userService'];
    function fn($location,$timeout,$mdSidenav, socket,userService) {
        
        $timeout(()=>{
            if(!userService.user.username){
                $location.path('/login');
                return;
            }
        },3000);
        const vm = this;
        vm.userService = userService;
        vm.toggle = function() {
            $mdSidenav('left').toggle();
        };
        vm.isOpen = function() {
            return $mdSidenav('left').isOpen();
        };
        vm.enter = function(event){
            if(event.keyCode === 13){
                vm.sendMessage();
                vm.message = "";
                event.preventDefault();
            }
        }
        const message_form ={
            message:{
                text:""
            },
            time:undefined,
            channel:undefined
        };
        vm.messages = [];
        vm.sendMessage = function () {
            if(vm.message.trim() == ""){
                return ;
            }
            let messageWillSend = {};
            angular.copy(message_form,messageWillSend);
            messageWillSend.time = new Date();
            messageWillSend.message.text = vm.message;
            socket.emit('message',messageWillSend);
        };
        socket.on('listen_message',function (data) {
          vm.messages.push(data)
        })
    }
})();
