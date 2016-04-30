"use strict";

Newave.factory("jobFactory", [
  "$q",
  "$http",
  "authenticate",
  "$routeParams",

  function ($q, $http, authenticate, $routeParams) {

  let getJobs = {};

  getJobs.logoApiConverter = (company) => {
    let convertedCompany = company.toLowerCase().replace(/ /g,'');
    return convertedCompany;
  }

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

  //returns specific jobs
  getJobs.searchAppliedJobs = () => {
    return $q((resolve, reject) =>
      $http.get(`https://frontend-capstone.firebaseio.com/jobApplicants.json?orderBy="jobId"&equalTo="${$routeParams.postID}"`)
        .success(
          jobAppliedData => {
            resolve(jobAppliedData);
            console.log("SUCCESS", jobAppliedData);
          },
          error => reject(error)
        )
    )
  }

  //returns all jobs
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

  getJobs.searchJobPostingsForEmpPost = (postID) => {
    return $q((resolve, reject) =>
      $http.get(`https://frontend-capstone.firebaseio.com/jobs/${postID}.json`)
        .success(
          jobData => {
            resolve(jobData);
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

