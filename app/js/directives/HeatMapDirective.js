angular
  .module(AppConfig.name)
  .directive('heatMap', [function(){
      return {
          restrict: 'E',
          replace: true,
          templateUrl: 'partials/HeatMap.html',
          scope: {
              model: '=modelMap'
          },
          link: function (scope, element, attrs) {
              scope.sourseDataProvider = attrs.sourseDataProvider;
              scope.axisXName = attrs.axisXName;
              scope.axisYName = attrs.axisYName;
              scope.axisXSourse = attrs.axisXSourse;
              scope.axisYSourse = attrs.axisYSourse;

              var minValue,
                maxValue,
                scaleRange,
                heatMapData={},
                dayNames = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                hoursNames=[],
                DAYS_QUANTITY = 7,
                HOURS_QUANTITY = 24;

              scope.$watch('model', function(value) {
                      handleModelChange(value);
              });

              var createHourAxisNames = function () {
                  for(var i=1; i<= HOURS_QUANTITY; i++) {
                      var hourName;
                      if(i<13){
                          hourName  =  i=== 12 ? i+'p' : i+'a';
                      }else {
                          hourName  = (i - 12) === 12 ? (i - 12) + 'a' : (i - 12)+'p';
                      }
                      hoursNames.push(hourName);
                  }
              };

              var setAxises = function () {
                  scope.xAxis = scope.axisXName === 'day' ? dayNames:  hoursNames;
                  scope.yAxis = scope.axisYName === 'day' ? dayNames : hoursNames;
              };

              setAxises();
              createHourAxisNames();

              var handleModelChange = function (collection) {
                  if (!collection || collection.length === 0) return;

                  angular.forEach(collection, function (value, key) {

                      getMinMaxValues(value);

                      if(heatMapData[collection[key].index[scope.axisYSourse]] === undefined)
                          heatMapData[collection[key].index[scope.axisYSourse]] = {};
                      heatMapData[collection[key].index[scope.axisYSourse]][collection[key].index[scope.axisXSourse]] = value;
                  });

                  convertRange();
                  fillProcessedData(heatMapData);
              };

              var getMinMaxValues = function (value){
                  var currentValue = value.data[scope.sourseDataProvider][0].value;

                  if(!minValue) minValue = currentValue;
                  if(!maxValue) maxValue = currentValue;

                  if(minValue > currentValue )
                      minValue = currentValue;
                  if(maxValue < currentValue)
                      maxValue = currentValue;
              };

              var fillProcessedData = function (values) {
                  var dataProcessed = [];
                  checkMissingHours(dataProcessed, values);
                  scope.byX = dataProcessed;
              };

              var checkMissingHours = function (result, value) {
                for (var key in value) {
                    var list = value[key],
                      listItems = [],
                      offset = scope.axisYName === 'day' ? 0: 1;

                   for (var i = offset; i < getLengthBy(scope.axisXName) + offset; i++) {
                    if (!list[i]) {
                      listItems.push({data: {}, index: {}});
                    }else {
                      var item = list[i];
                      setColor(item);
                      listItems.push(item);
                    }
                  }
                  result.push(listItems);
                }
              };

              var convertRange = function () {
                  scaleRange = 100 / (maxValue - minValue);
              };

              var getLengthBy = function (value) {
                  if(value === 'day') {
                      return DAYS_QUANTITY;
                  }else {
                     return HOURS_QUANTITY;
                  }
              };

              var setColor = function(item) {
                  var val= item.data ? item.data[scope.sourseDataProvider][0].value : 0,
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