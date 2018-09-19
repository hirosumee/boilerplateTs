(function () {
    'use strict';
    angular.module('BlankApp')
        .factory('messageService', fn);
    fn.$inject = ['$http','channelService'];

    function fn($http,channelService) {
        return {
            messages:[],
            load(channel){
                if(!channel){
                    channel = channelService.currentChannel.name;
                }
                const that = this;
                $http.get(`/channel/${channel}`)
                    .then(function (resp) {
                        let messages_data = resp.data;
                        if(Array.isArray(messages_data)){
                            that.messages = messages_data;
                        }
                    })
            },
            push(message){
                if(!message.content||message.channel!==channelService.currentChannel.name){
                    return ;
                }
                this.messages.push(message);
            }
        }
    }
}());