(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.foodItems = "";
  $scope.message = "";

  $scope.setMessage = function () {
    $scope.message = computeMessage($scope.foodItems);
  };

  function computeMessage(foodItems) {
    var trimmedFoodItems = foodItems.trim();
    if(trimmedFoodItems === null || trimmedFoodItems === ""){
      return "Please enter data first";
    }
    else {
        var arrayOfFoodItems = trimmedFoodItems.split(',');
        var numFoodItems = countNonEmptyStrings(arrayOfFoodItems);
        if(numFoodItems === 0){
          return "Please enter data first";
        }
        else if(numFoodItems <= 3){
          return "Enjoy!";
        }
        else {
          return "Too much!";
        }
    }
  }

  function countNonEmptyStrings(arrayOfStrings) {
    var count = 0;
    for(var i = 0 ; i < arrayOfStrings.length; i++){
      if(arrayOfStrings[i].trim() != "")
        count++;
    }
    return count;
  }
}
})();
