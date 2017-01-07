describe('The menu service - test if the favorite item exists in the menu or doesn\'t exist', function() {
  'use strict';

  var $httpBackend;
  var menuService;
  var ApiPath;

  // Sample data to mock http requests
  var validMenuItems = [
      { "id":1069,
        "short_name":"L1",
        "name":"Orange Chicken",
        "description":"chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
        "price_small":null,
        "price_large":9.75,
        "small_portion_name":null,
        "large_portion_name":null
      },
      { "id":903,
        "short_name":"B16",
        "name":"Cold Sesame Noodle",
        "description":"Peanut butter sauce and sesame seeds on lo mein noodles ",
        "price_small":null,
        "price_large":6.95,
        "small_portion_name":null,
        "large_portion_name":null
      }
    ];

  var invalidItemError = {"status":"500","error":"Internal Server Error"};

  /**
   * Gets called before each unit test it()
   */
  beforeEach(function() {
    // Load module
    module('common');

    // Load $httpBackend, MenuService and ApiPath
    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      menuService = $injector.get('MenuService');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should retrieve L1.json when L1 menu item requested.', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/L1.json').respond(validMenuItems[0]);
    menuService.getMenuItem('L1').then(function(item) {
      expect(item.data).toEqual(validMenuItems[0]);
    });
    $httpBackend.flush();
  });

  it('should return error when G1 menu item requested.', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/G1.json').respond(500, invalidItemError);
    menuService.getMenuItem('G1').catch(function(error) {
      expect(error.status).toEqual(500);
    });
    $httpBackend.flush();
  });

});
