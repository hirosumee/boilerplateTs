(function() {
    angular
        .module('BlankApp')
        .factory('socket', fn)
        .run([
            'socket',
            function(socket) {
                console.log('init socket.io');
            }
        ]);
    fn.$inject = ['$rootScope'];

    function fn($rootScope) {
        const socket = io();
        return {
            on(eventName, callback) {
                socket.on(eventName, function() {
                    const args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    const args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            }
        };
    }
})();
