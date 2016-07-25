'use strict';
/** 
  * controller for Wizard Form example
*/
app.controller('WizardCtrl', ['$scope', 'toaster', 'fileUpload', 'cfpLoadingBar',
function ($scope, toaster, fileUpload, cfpLoadingBar) {
    $scope.currentStep = 1;
    var incompleteError = 'please complete the form in this step before proceeding';

    // Initial Value
    $scope.form = {

        next: function (form) {

            $scope.toTheTop();

            if (form.$valid) {
            	form.$setPristine();
                nextStep();
            } else {
                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }

                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                errorMessage(incompleteError);
            }
        },
        prev: function (form) {
            $scope.toTheTop();
            prevStep();
        },
        goTo: function (form, i) {
            if (parseInt($scope.currentStep) > parseInt(i)) {
                $scope.toTheTop();
                goToStep(i);

            } else {
                if (form.$valid) {
                    $scope.toTheTop();
                    goToStep(i);

                } else
                    errorMessage(incompleteError);
            }
        },
        submit: function () {

        },
        reset: function () {

        }
    };


    var nextStep = function () {
        $scope.currentStep++;
    };
    var prevStep = function () {
        $scope.currentStep--;
    };
    var goToStep = function (i) {
        $scope.currentStep = i;
    };
    var errorMessage = function (error) {
        toaster.pop('error', 'Error', error);
    };

    $scope.uploadFile = function() {
        angular.element('#wizard-ok').hide();
        angular.element('#wizard-error').hide();
        cfpLoadingBar.start();
        $scope.loading = true;
        var file = $scope.myModel.certificate;
        var url = "http://10.40.8.203:4004/upload/pfx?token=test&password=" + $scope.myModel.password;
        fileUpload.up2Url(file, url, function(error) {
            cfpLoadingBar.complete();
            if (error) {
                angular.element('#wizard-error').show();
                errorMessage(JSON.stringify(error));
            } else {
                angular.element('#wizard-ok').show();
            }
            goToStep(3);
        });
    };


}]);
