(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/template/home.template.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/template/MenuApp.Categories.template.html',
        controller: function (categories) {
          this.categories = categories;
        },
        controllerAs: 'ctrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/template/MenuApp.Items.template.html',
        controller: function (menu_items, categoryName) {
          this.menu_items = menu_items;
          this.categoryName = categoryName;
       },
        controllerAs: 'ctrl',
        resolve: {
          menu_items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }],
          categoryName: ['$stateParams', function ($stateParams) {
            return $stateParams.categoryShortName;
          }]
        }
      });
     }
})();
