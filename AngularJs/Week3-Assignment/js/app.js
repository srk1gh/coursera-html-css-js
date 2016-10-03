(function () {
'use strict';

angular.module('NarrowItDownAppp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective(){
  var ddo = {
    //templateUrl: "foundItems.html",
    template: "<div class='container-fluid' ng-show='itemsCtrl.isEmpty();'><span>{{itemsCtrl.emptyMessage}}</span></div><div class='container-fluid' ng-hide='itemsCtrl.isEmpty();'><div class='row' style='border: 1px solid'>  <div class='col-xs-6 col-sm-3'>Name</div>  <div class='col-xs-6 col-sm-3'>Short Name</div>  <!-- Add the extra clearfix for only the required viewport -->  <div class='clearfix visible-xs-block'></div>  <div class='col-xs-6 col-sm-3'>Description</div>  <div class='col-xs-6 col-sm-3'>Remove </div></div><div class='row' ng-repeat='item in itemsCtrl.items' style='border: 1px solid'>  <div class='col-xs-6 col-sm-3'>{{ item.name }}</div>  <div class='col-xs-6 col-sm-3'>{{ item.short_name }}</div>    <!-- Add the extra clearfix for only the required viewport -->  <div class='clearfix visible-xs-block'></div>   <div class='col-xs-6 col-sm-3'>{{ item.description }}</div>  <div class='col-xs-6 col-sm-3'>  <button ng-click='itemsCtrl.onRemove({index: $index});'>Don't want this one!</button>  </div></div></div>",
    scope: {
      items: '<',
      onRemove: '&',
      emptyMessage: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'itemsCtrl',
    bindToController: true  
  };

  return ddo;
};

function FoundItemsDirectiveController(){
  var itemsCtrl = this;

  itemsCtrl.isEmpty = function() {
    if(itemsCtrl.items.length == 0) {
      return true;
    }
    else {
      return false;
    }
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItCtrl = this;

  narrowItCtrl.found = [];
  narrowItCtrl.searchTerm = "";
  narrowItCtrl.nilMessage = "";
 
  narrowItCtrl.findMenuItems = function() {

    if(!narrowItCtrl.searchTerm){
      narrowItCtrl.found = [];
      narrowItCtrl.nilMessage = 'Nothing Found.'
      return;
    }
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

      if(foundItems.length == 0){
        narrowItCtrl.nilMessage = 'Nothing Found.'
      }
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
