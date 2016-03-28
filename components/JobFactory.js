"use strict";

Newave.factory("jobFactory", [
  "$q",
  "$http",
  "authenticate",

  function ($q, $http, authenticate) {

  let getJobs = {};

  getJobs.searchEmployerJobPostings = () => {
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

   getJobs.searchAllAppliedJobs = () => {
    return $q((resolve, reject) =>
      $http.get(`https://frontend-capstone.firebaseio.com/jobApplicants.json`)
        .success(
          jobAppliedData => {
            resolve(jobAppliedData);
            console.log("SUCCESS", jobAppliedData);
          },
          error => reject(error)
        )
    )
  }

  getJobs.searchAllJobPostings = () => {
    return $q((resolve, reject) =>
      $http.get(`https://frontend-capstone.firebaseio.com/jobs.json`)
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

