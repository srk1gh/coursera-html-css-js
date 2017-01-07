(function () {
"use strict";

angular.module('public')
.component('userMenuItem', {
  templateUrl: 'src/public/myInfo/user-menu-item.html',
  bindings: {
    menuItem: '<'
  },
  controller: UserMenuItemController
});


UserMenuItemController.$inject = ['ApiPath'];
function UserMenuItemController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
}

})();
