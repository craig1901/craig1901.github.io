/*
Angular front end app :
    Description : fetches dictionary pronunciation and sound data from backend, gets phonetics and sends to DOM.
    Title : Phonetic Transcriber
    Authors : Craig Nolan
    Version : 1.0.0
*/
(function () {
    "use strict";
    angular.module('PhoneticTranscriber', ['PhoneticTranscriber.filters','PhoneticTranscriber.services'])

        .controller('PhoneticTranscriberController', ['$scope', 'ApiService', 'phoneticFilter', function($scope, ApiService, phoneticFilter) {

            $scope.word = "";
            $scope.pronunciation = "";
            $scope.inDictionary = true;
            $scope.soundAvailable = true;
            $scope.insert = false;

            Office.initialize = function (reason) {
            };


            $scope.getPhonetics = function() {
                $scope.inDictionary = true;
                $scope.soundAvailable = true;
                $scope.pronunciation = "";
                $scope.audio = null;
                $scope.insert = false;
                getPronunciation();
                getSound();
            }

            $scope.getPhoneticsFromDoc = function () {
                Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, { valueFormat: "unformatted", filterType: "all" }, function (asyncResult) {
                    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                        console.log("nothing selected");
                    }
                    else {
                        $scope.word = asyncResult.value;
                        $scope.inDictionary = true;
                        $scope.insert = true;
                        $scope.pronunciation = "";
                        $scope.audio = null;
                        getPronunciation();
                        getSound();
                    }
                });
            }

            $scope.playSound = function(){
                $scope.audio.play();
            }

            var getSound = function() {
                ApiService.getSound($scope.word).success(function(response) {
                    var temp = response;
                    if(temp[0]) {
                        $scope.audio = new Audio(temp[0].fileUrl);
                        $scope.soundAvailable = true;
                    }
                    else {
                        $scope.soundAvailable = false;
                    }
                });
            }

            var getPronunciation = function() {

                ApiService.getPronunciation($scope.word).success(function(response) {
                    var temp = response;
                    if(temp[0]) {
                        $scope.pronunciation = temp[0].raw;
                        var phonetic = phoneticFilter($scope.pronunciation);
                        if($scope.insert) {
                            Office.context.document.setSelectedDataAsync($scope.word + ' ['  + phonetic + '] ', function (asyncResult) {
                                if(asyncResult == 'failed') {
                                    console.log("failed");
                                }
                                else {
                                    console.log("inserted");
                                }
                            });
                        }
                        $scope.inDictionary = true;
                    }
                    else {
                        $scope.inDictionary = false;
                    }
                })
            };

        }]);
})();
