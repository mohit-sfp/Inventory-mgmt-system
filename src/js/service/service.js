angular.module("helloWorldApp").service("$pouchDB", [
  "$rootScope",
  "$q",
  function ($rootScope, $q) {
    var database;
    var changeListener;

    this.setDatabase = function (databaseName) {
      database = new PouchDB(databaseName);
    };

    this.startListening = function () {
      changeListener = database
        .changes({
          live: true,
          include_docs: true,
        })
        .on("change", function (change) {
          if (!change.deleted) {
            $rootScope.$broadcast("$pouchDB:change", change);
          } else {
            $rootScope.$broadcast("$pouchDB:delete", change);
          }
        });
    };

    this.stopListening = function () {
      changeListener.cancel();
    };

    this.sync = function (remoteDatabase) {
      database.sync(remoteDatabase, {
        live: true,
        retry: true,
      });
    };

    this.destroy = function () {
      return database.destroy();
    };

    this.save = function (jsonDocument) {
      var deferred = $q.defer();
      if (!jsonDocument._id) {
        database
          .post(jsonDocument)
          .then(function (response) {
            deferred.resolve(response);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
      } else {
        database
          .put(jsonDocument)
          .then(function (response) {
            deferred.resolve(response);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
      }
      return deferred.promise;
    };
    this.info = function () {
      return database.info();
    };

    this.delete = function (documentId, documentRevision) {
      return database.remove(documentId, documentRevision);
    };

    this.get = function (documentId) {
      return database.get(documentId);
    };

    this.getAllDocs = function () {
      return database.allDocs({
        include_docs: true,
        attachments: true,
      });
    };

    this.destroy = function () {
      database.destroy();
    };
  },
]);
