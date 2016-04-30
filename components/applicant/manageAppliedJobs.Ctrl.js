"use strict";

Newave.controller('ManageAppliedJobsCtrl', [
	'$scope',
	'$routeParams',
	'$route',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',

	function($scope, $routeParams, $route, $http, $q, $location, authenticate, jobFactory) {
		
		let currentUser = null;
		let jobApplicantArr = [];
		let jobDataArr = [];
		let toBeDeleted = "";
		let jobKeys = [];
		$scope.jobs = [];

		$scope.search = () => {
			jobFactory.searchAllAppliedJobs()
			.then(
				jobAppliedData => {
					currentUser = authenticate.getCurrentUser();

					// CREATES ARRAY OF JOB OBJECTS
					for (let key in jobAppliedData) {
						jobAppliedData[key].id = key;
						jobApplicantArr.push(jobAppliedData[key]);
					}		

					// MAKES NEW ARRAY OF JOBID IF APPLICANT ID MATCHES THE USER LOGGED IN
					angular.forEach(jobApplicantArr, function(value, key) {
					  if (value.applicantId === currentUser.uid) {
					  	jobKeys.push(value.jobId)
						}
					})
					$scope.getResults();
				},
				error => console.log("error")
			);
		}	
		$scope.search();

	 	$scope.getResults = () => {
			jobFactory.searchAllJobPostings()
			.then(
				jobData => {
					for (let key in jobData) {
						jobData[key].id = key;
						jobDataArr.push(jobData[key])
					}
					for (var i = 0; i < jobKeys.length; i++) {
						for (var j = 0; j < jobDataArr.length; j++) {
							if (jobKeys[i] === jobDataArr[j].id) {
								$scope.jobs.push(jobDataArr[j]);
							}
						}	
					}
				});
		}

		$scope.removeApplication = (jobID) => {
			angular.forEach(jobApplicantArr, function(value, key) {
				if (jobID === value.jobId && currentUser.uid === value.applicantId) {
					toBeDeleted = value.id;
				}
			})
			$scope.remove(toBeDeleted);		
		}

		$scope.remove = (toBeDeleted) => $http
			.delete(`https://frontend-capstone.firebaseio.com/jobApplicants/${toBeDeleted}.json`)
			.then(function () {
				$route.reload();
			})
}])