"use strict";

Newave.factory("jobFactory", [
  "$q",
  "$http",
  "authenticate",

  function ($q, $http, authenticate) {

  let getJobs = {};

  getJobs.searchJobPostings = () => {
    let currentUser = authenticate.getCurrentUser();
    return $q((resolve, reject) =>
      $http.get(`https://frontend-capstone.firebaseio.com/jobs.json?orderBy="employerUid"&equalTo="${currentUser.uid}"`)
        .success(
          jobData => {
            resolve(jobData);
            console.log("SUCCESS", jobData);
          },
          error => reject(error)
        )
    )
  }
  return getJobs;
}]);

