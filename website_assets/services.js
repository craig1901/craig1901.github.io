angular.module('PhoneticTranscriber.services',[])
	.service('ApiService',['$http',function($http)
	{
		this.getPronunciation = function(word) {
			return $http.get('/word/'+ word + '/pronunciation');
		}

		this.getSound = function(word) {
			return $http.get('/word/' + word + '/sound');
		}

	}]);