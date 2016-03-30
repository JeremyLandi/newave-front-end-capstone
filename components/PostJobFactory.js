"use strict";

Newave.factory("PostJobFactory", [
  "$q",
  "$http",
  "authenticate",
  "$routeParams",

  function ($q, $http, authenticate, $routeParams) {

  let getJobPosts = {};

  getJobPosts.updateJob = ($routeParams, editJobPosting) => {
    return $q((resolve, reject) =>
      $http.put(`https://frontend-capstone.firebaseio.com/jobs/${$routeParams}.json`, 
       JSON.stringify(editJobPosting))
        .success(
          jobPostData => {
            resolve(jobPostData);
            console.log("SUCCESS", jobPostData);
          },
          error => reject(error)
        )
    )
  }

  return getJobPosts;
}]);

