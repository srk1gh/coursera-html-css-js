(function () {
'use strict';

angular.module('NarrowItDownAppp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective(){
  var ddo = {
    templateUrl: "foundItems.html",
    scope: {
      items: '<',
      onRemove: '&'
    }  };

  return ddo;
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItCtrl = this;

  narrowItCtrl.searchTerm = "";
 
  narrowItCtrl.findMenuItems = function() {
    var promise = MenuSearchService.getMatchedMenuItems();
   
    promise.then(function(result) {
      var allMenuItems = result.data.menu_items;

      //Process the result and only keep items that match
      var foundItems = [];

      for(var index = 0; index < allMenuItems.length; index++) {
        var menuItem = allMenuItems[index];
        if(menuItem.description.toLowerCase().indexOf(narrowItCtrl.searchTerm.toLowerCase()) !== -1){
          foundItems.push(menuItem);
        }
      }

      //return processed items
      narrowItCtrl.found = foundItems
    })
  };

  narrowItCtrl.removeItem = function(index) {
    narrowItCtrl.found.splice(index, 1)
  };
};


MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath'];
function MenuSearchService($q, $http, ApiBasePath) {
  var service = this;

   service.getMatchedMenuItems = function () {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
  };
 };

})();
