(function() {
    angular
        .module('BlankApp')
        .factory('userService',fn)
        .run(['userService',function (userService) {
            userService.whoisme();
        }]);
    fn.$inject = ['$http'];
    function fn($http) {
        let userService = {
            user:{},
            isload:false,
            whoisme(){
                const that = this;
                return $http.post('/user/whoisme')
                    .then(function (res) {
                        that.user = res.data;
                        that.isload = true;
                    })
            }
        };
        return userService;
    }
}());