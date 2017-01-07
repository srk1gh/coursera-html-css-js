(function () {
"use strict";

angular.module('public')
.component('myInfo', {
  bindings: {
    info: '<'
  },
  templateUrl: 'src/public/myInfo/userInfo.html' 
});

})();
