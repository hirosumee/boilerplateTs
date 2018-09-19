(function () {
    'use strict';
    angular.module('BlankApp')
        .factory('channelService', fn);
        // .run(['ChannelService',function (ChannelService) {
        //     ChannelService.load();
        // }]);
    fn.$inject = ['$http'];

    function fn($http) {
            return {
                channels:[],
                currentChannel:null,
                load(){
                    const that = this;
                    $http.get('/channel')
                        .then(function (resp) {
                            let channels_data = resp.data;
                            if(Array.isArray(channels_data)){
                                that.channels = channels_data;
                                that.currentChannel = that.channels[0];
                            }
                        })
                },
                get(){
                    return channels;
                },
                getByName(name) {
                    //
                    for (let channel of channels) {
                        if (channel.name === name) {
                            return channel;
                        }
                    }
                    return null;
                },
                getFirst(){
                    if(channels.length===0){
                        return null;
                    }
                    return channels[0];
                }
            }
    }
}());