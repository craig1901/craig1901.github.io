angular.module('PhoneticTranscriber.filters', ['PhoneticTranscriber.constants'])
    .filter('phonetic',['lookupObj', function(lookupObj) {
        return function(input) {
            var lookUp = lookupObj.table;
            var lookUpKeys = Object.keys(lookUp);
            var count = input.length;
            for(var i=0; i < lookUpKeys.length && count != 0; i++){
                var key = lookUpKeys[i];
                if(input.indexOf(key) != -1)
                {
                    input = input.replace(key, lookUp[key]);
                    count -= key.length;
                }
            }
            return input;
        }
    }]);