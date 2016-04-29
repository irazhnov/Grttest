angular
    .module(AppConfig.name)
    .service('heatMapService', ['$http',  function ($http){
        return {
            getHeatData : function (callback) {
            $http.get('mock/heat.json').success(function(data){
                    if(data) {
                        console.log('Data comes');
                        callback(data.result);
                    }else {
                        console.log('Data error');
                    }
                })
                .error(function () {
                    console.log('Data error');
                });
            },
            getHeatMapData : function (callback) {
                $http.get('mock/heatNew.json').success(function(data){
                        if(data) {
                            console.log('NEW Data comes');
                            callback(data.result);
                        }else {
                            console.log('Data error');
                        }
                    })
                    .error(function () {
                        console.log('Data error');
                    });
            }
        };
    }]);