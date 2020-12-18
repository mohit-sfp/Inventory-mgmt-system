var app = angular
  .module("myApp", [])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "templates/home.html",
        controller: "homeController",
      })
      .when("/login", {
        templateUrl: "templates/login.html",
        controller: "loginController",
      });
  })
  .controller("homeController", function ($scope) {
    $scope.message = "Home Page";
  })
  .controller("loginController", function ($scope) {
    var login_details = {
      uname: "mohit",
      pass: "",
    };
    $scope.login_details = login_details;
  });
