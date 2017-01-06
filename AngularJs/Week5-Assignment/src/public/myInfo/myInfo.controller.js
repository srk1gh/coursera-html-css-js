(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userPreferences'];
function MyInfoController(userPreferences) {
  var $ctrl = this;

  $ctrl.userPreferences = userPreferences;
  $ctrl.userLoggedIn = (userPreferences !== undefined);
}

})();