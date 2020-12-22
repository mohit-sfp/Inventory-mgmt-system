angular
  .module("helloWorldApp")
  .run(function ($pouchDB, $location) {
    $pouchDB.setDatabase("product");
  })
  .controller("createProductController", function (
    $scope,
    $location,
    $pouchDB
  ) {
    var product_detail = {
      name: "",
      cost: "",
      description: "",
    };
    $scope.imageSrc = "";
    $scope.$on("fileProgress", function (e, progress) {
      $scope.progress = progress.loaded / progress.total;
    });
    $scope.product_detail = product_detail;
    $scope.message = "product Page";
    $scope.saveProduct = function saveProduct() {
      var jsonDocument = {
        Name: product_detail.name,
        Cost: product_detail.cost,
        Description: product_detail.description,
      };
      $pouchDB.save(jsonDocument).then(
        function (response) {
          window.swal({
            title: "Saved",
            text: "Saved in database!",
            icon: "success",
            buttons: true,
          });
          $location.path("/");
        },
        function (error) {
          console.log("ERROR -&gt; " + error);
        }
      );
    };
  })
  .controller("viewDataController", function ($scope, $routeParams, $pouchDB) {
    $scope.message = `View Data Controller${$routeParams.id}`;
    $scope.product_detail = {
      Name: "",
      Cost: "",
      Description: "",
    };
    $pouchDB.get($routeParams.id).then(function (response) {
      $scope.product_detail.Name = response.Name;
      $scope.product_detail.Cost = response.Cost;
      $scope.product_detail.Description = response.Description;
      $scope.$evalAsync();
    });
  })
  .controller("productController", function ($scope, $location, $pouchDB, $q) {
    $scope.message = "product Page";
    $scope.createProduct = function () {
      $location.path("/createProduct");
    };
    $scope.product_detail = [];
    $pouchDB.getAllDocs().then(function (response) {
      console.log(response);
      for (var i = 0; i < response.rows.length; i++) {
        if (
          Object.keys(response.rows[i].doc) !== "uname" &&
          Object.keys(response.rows[i].doc) !== "pass"
        ) {
          $scope.product_detail.push({
            Id: response.rows[i].doc._id,
            rev: response.rows[i].doc._rev,
            Cost: response.rows[i].doc.Cost,
            Name: response.rows[i].doc.Name,
            Description: response.rows[i].doc.Description,
          });
        }
      }
      $scope.$evalAsync();
    });
    $scope.deleteProduct = function (id, rev) {
      window
        .swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then(() => {
          $pouchDB.delete(id, rev).then(function (res) {
            $pouchDB.getAllDocs().then(function (response) {
              $scope.product_detail = [];
              for (var i = 0; i < response.rows.length; i++) {
                $scope.product_detail.push({
                  Id: response.rows[i].doc._id,
                  rev: response.rows[i].doc._rev,
                  Cost: response.rows[i].doc.Cost,
                  Name: response.rows[i].doc.Name,
                  Description: response.rows[i].doc.Description,
                });
              }
              $scope.$evalAsync();
            });
            window.swal({
              type: "success",
              title: "Deleted!",
              icon: "success",
              text: "Successfully deleted",
              confirmButtonText: "OK",
            });
          });
        });
    };
    $scope.viewProduct = function (id) {
      $location.path(`/viewProduct/${id}`);
    };
  });
