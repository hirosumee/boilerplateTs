(function () {
    'use strict';
    angular.module('BlankApp')
        .controller('UploadController', fn);
    fn.$inject = ['$http', '$scope'];

    function fn($http, $scope) {
        const vm = this;
        vm.isSubmitForm = false;
        vm.submit = function (isSetPassword,password) {
            if(vm.isSubmitForm) return;
            vm.isSubmitForm = true;
            let s = new FormData();
            s.append('fileupload',$scope.file[0]);
            if(isSetPassword){
                s.append('password',password);
            }
            $http.post('/file/upload', s, {
                headers: {
                    'Content-Type': undefined
                },
                uploadEventHandlers:{
                    progress(e){
                        console.log(e)
                    }
                }
            })
                .then(function (res) {
                    console.log(res);
                    vm.isSubmitForm = false;
                })
        }
    }
}());