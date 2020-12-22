angular.module("helloWorldApp", ["ngRoute"]).config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      resolve: {
        check: function ($location, $rootScope) {
          if (!$rootScope.loggedIn) {
            $location.path("/login");
          }
        },
      },
      templateUrl: "views/product.html",
      controller: "productController",
    })
    .when("/login", {
      resolve: {
        check: function ($location, $rootScope) {
          if ($rootScope.loggedIn) {
            $location.path("/");
          }
        },
      },
      templateUrl: "views/login.html",
      controller: "loginController",
    })
    .when("/createProduct", {
      resolve: {
        check: function ($location, $rootScope) {
          if (!$rootScope.loggedIn) {
            $location.path("/login");
          }
        },
      },
      templateUrl: "views/createProduct.html",
      controller: "createProductController",
    })
    .when("/viewProduct/:id", {
      resolve: {
        check: function ($location, $rootScope) {
          if (!$rootScope.loggedIn) {
            $location.path("/login");
          }
        },
      },
      templateUrl: "views/viewData.html",
      controller: "viewDataController",
    })
    .otherwise({
      redirectTo: "/",
    });
});
