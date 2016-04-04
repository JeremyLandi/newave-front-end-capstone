"use strict";

Newave.factory("glassdoor", [
  "$q",
  "$http",
  "authenticate",
  "$routeParams",

  function ($q, $http, authenticate, $routeParams) {

    $http.defaults.useXDomain = true;

  let glassdoor = {};

  glassdoor.info = () => {
    return $q((resolve, reject) =>
      $http.get(`http://api.glassdoor.com/api/api.htm?t.p=59389&t.k=jNTg0WzEhJK&userip=127.0.0.1&useragent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36&format=json&v=1&action=jobs-stats&returnStates=true&admLevelRequested=1`)
        .success(
          glassdoorData => {
            resolve(glassdoorData);
            console.log("SUCCESS", glassdoorData);
          },
          error => reject(error)
        )
    )
  }


  return glassdoor;
}]);

