(function () {
   'use strict';
   angular.module('BlankApp')
       .controller('HomeController',fn);
   fn.$inject = ['$http'];
   function fn($http) {
       let vm = this;
       vm.text = 'ha';
       vm.fileObj = {
           files:[],
           load(){
                let that = this;
               $http.post('/file/load/global')
                   .then(function (res) {
                       that.files = res.data;
                   })
           }
       };
       vm.fileObj.load();
   }
}());