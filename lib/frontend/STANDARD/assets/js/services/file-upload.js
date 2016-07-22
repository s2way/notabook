'use strict';

app.service('fileUpload', ['$http', function($http) {
    this.up2Url = function(file, url, callback) {
        var fd = new FormData();
        fd.append('data', file);
        $http.put(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function(ok) {
            callback();
        }).error(function(error) {
            callback(error);
        })
    }
}]);