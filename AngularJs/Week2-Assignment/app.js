(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListService', ShoppingListService);

ToBuyShoppingController.$inject = ['ShoppingListService'];
function ToBuyShoppingController(ShoppingListService) {
  var toBuyController = this;

  toBuyController.items = ShoppingListService.getToBuyItems();

  toBuyController.buyItem = function(itemIndex){
    ShoppingListService.buyItem(itemIndex);
  }

  toBuyController.isEmpty = function(){
    if(toBuyController.items.length > 0)
      return false;
    else
      return true;
  }
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListService'];
function AlreadyBoughtShoppingController(ShoppingListService) {
  var alreadyBoughtController = this;

  alreadyBoughtController.items = ShoppingListService.getAlreadyBoughtItems();

  alreadyBoughtController.isEmpty = function(){
    if(alreadyBoughtController.items.length > 0)
      return false;
    else
      return true;
  }
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{ name: "cookies", quantity: 10 },
                    { name: "Sugary Drinks", quantity: 2 },
                    { name: "Carrots", quantity: 4 },
                    { name: "Avacados", quantity: 2 },
                    { name: "Organic Milk", quantity: 2 },
                    { name: "Bread", quantity: 2 },
                    { name: "Eggs", quantity: 12 }];
  
  var alreadyBoughtItems = [];

  service.buyItem = function (index) {
    var boughtItem = toBuyItems.splice(index, 1)[0];
 
    alreadyBoughtItems.push(boughtItem);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };
}

})();
