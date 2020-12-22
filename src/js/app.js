angular.module("helloWorldApp", ["ngRoute"]).config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/product.html",
      controller: "productController",
    })
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "loginController",
    })
    .when("/createProduct", {
      templateUrl: "views/createProduct.html",
      controller: "createProductController",
    })
    .when("/viewProduct/:id", {
      templateUrl: "views/viewData.html",
      controller: "viewDataController",
    })
    .otherwise({
      redirectTo: "/",
    });
});
