(function () {
    'use strict';
    angular.module('BlankApp')
        .directive('fileUploadDirective', fn);
    fn.$inject = [];

    function link(scope, element, attributes) {
        element.on('change', function (event) {
            scope.$apply(function () {
                scope[attributes.fileUploadDirective] = event.target.files;
                //console.log(scope[attributes.fileUploadDirective],event.target.files)
            });
        })

    }

    function fn() {
        return {
            restrict: 'A',
            link
        }
    }
}());