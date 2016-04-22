angular
    .module(AppConfig.name)
    .directive('heatMap', [function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/HeatMap.html',
        scope: {
            model: '=ngModel'
        },
        link: function ($scope, element, attrs){
            $scope.axis = attrs.axis;
            $scope.sourseData = attrs.sourseData;
        },
        controller: function ($scope){
            var self = this,
                minValue,
                maxValue,
                scaleRange,
                heatMapData={},
                initialData,
                dayNames = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                hoursNames=[];
           
            $scope.$watch('model', function(value) {
                if($scope.xAxis){
                    self.handleModelChange(value);
                }else{
                    initialData = value;
                }
            });

            $scope.$watch('axis', function(value) {
                self.setAxises();
                if(initialData)
                self.handleModelChange(value);
            });

            this.createHourAxisNames = function () {
                for(var i=1; i<=24; i++) {
                    var hourName;
                    if(i<13){
                        hourName  =  i=== 12 ? i+'p' : i+'a';
                    }else {
                        hourName  = (i - 12) === 12 ? (i - 12) + 'a' : (i - 12)+'p';
                    }
                    hoursNames.push(hourName);
                }
            };

            this.setAxises = function () {
                if($scope.axis == 'byHours'){
                    $scope.xAxis = hoursNames;
                    $scope.yAxis = dayNames;
                } 
                if($scope.axis == 'byDays') {
                    $scope.xAxis = dayNames;
                    $scope.yAxis = hoursNames;
                }
            };

            this.createHourAxisNames();

            this.handleModelChange = function (collection) {
                if (!collection || collection.length === 0) return;
                for(var i=0; i<=6; i++) {
                    heatMapData[dayNames[i]] = [];
                }

                angular.forEach(collection, function (value, key) {
                    self.getMinMaxValues(value);
                    heatMapData[dayNames[collection[key].index.dowId - 1]].push(value);
                });

                this.convertRange();
                this.fillProcessedData(heatMapData);
            };

            this.getMinMaxValues = function (value){
                var currentValue = value.data[$scope.sourseData][0].value;

                if(!minValue) minValue = currentValue;
                if(!maxValue) maxValue = currentValue;

                if(minValue > currentValue )
                    minValue = currentValue;
                if(maxValue < currentValue)
                    maxValue = currentValue;
            };

            this.fillProcessedData = function (values) {
                var dataByWeek = []; 
                for(var i=0; i< 7; i++){
                    values[dayNames[i]].sort(this.sortByIncrement);
                    var arr = this.checkMissingHours(values[dayNames[i]]);
                    dataByWeek.push(arr);
                }
                if($scope.axis == 'byHours') {
                    $scope.byX = dataByWeek;
                }
                if($scope.axis == 'byDays') {
                    $scope.byX = this.transformByAxis(dataByWeek);
                }
            };
            
            this.sortByIncrement = function (a,b) {
                if (a.index.hourId < b.index.hourId ) {
                    return -1;
                }
                if (a.index.hourId > b.index.hourId) {
                    return 1;
                }
            };

            this.checkMissingHours = function (value) {
                for(var i=0; i < 24; i++){
                   if(!value[i] || value[i].index.hourId != i) {
                       value.splice(i, 0,{data:{'' :[{value:0}]}, index:{dowId: 0, hourId: i}});
                   }
                   this.setColor(value[i]);
                }
                return value;
            };

            this.convertRange = function () {
             scaleRange = (100) / (maxValue - minValue);
                console.log('scaleRange' + scaleRange);
            };

            this.transformByAxis = function (arr) {
                var convertedArray = [];
                for (var i=0; i< arr[0].length; i++) {
                    var periodArray = [];
                    for(var a=0; a < arr.length; a++){
                         periodArray.push(arr[a][i]);
                    }
                    convertedArray.push(periodArray);
                }
              return  convertedArray;
            };

            this.setColor = function(item) {
                var val= item.data[$scope.sourseData] ? item.data[$scope.sourseData][0].value : item.data[''][0].value,
                    r =  Math.floor((255 * val* scaleRange) / 100),
                    g = Math.floor((255 * (100 - val* scaleRange)) / 100),
                    b = 0;

                if(val > 0) {
                    item.color = {
                        backgroundColor: "rgb(" + r + "," + g + "," + b + ")"
                    }
                }
            } 
        }
    }
}]);