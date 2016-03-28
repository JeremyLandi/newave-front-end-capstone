"use strict";

Newave.controller('ManageAppliedJobsCtrl', [
	'$scope',
	'$routeParams',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',

	function($scope, $routeParams, $http, $q, $location, authenticate, jobFactory) {
		
		let currentUser = null;
		
		let jobApplicantArr = [];
		let jobDataArr = [];

		let jobKeys = [];
		$scope.jobs = [];

		$scope.search = () => {
			jobFactory.searchAllAppliedJobs()
			.then(
				jobAppliedData => {
					currentUser = authenticate.getCurrentUser();

					// CREATES ARRAY OF JOB OBJECTS
					for (let key in jobAppliedData) {
						// jobAppliedData[key].id = key;
						jobApplicantArr.push(jobAppliedData[key]);
					}		

					// MAKES NEW ARRAY OF JOBID IF APPLICANT ID MATCHES THE USER LOGGED IN
					angular.forEach(jobApplicantArr, function(value, key) {
					  if (value.applicantId === currentUser.uid) {
					  	jobKeys.push(value.jobId)
						}
					})
					
					$scope.getResults();
					// console.log("jobKeys",jobKeys);
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
				// console.log("jobDataArr", jobDataArr);
				// console.log("jobKeys", jobKeys);

				// angular.forEach(jobDataArr, function(value) {
				for (var i = 0; i < jobKeys.length; i++) {
					for (var j = 0; j < jobDataArr.length; j++) {
						if (jobKeys[i] === jobDataArr[j].id) {
							$scope.jobs.push(jobDataArr[j]);
						}
					}	
				}
				console.log("$scope.jobs", $scope.jobs);
			});
	}

		// $scope.removeApplication = (postID) => $http
		// 	.delete(`https://frontend-capstone.firebaseio.com/jobs/${postID}.json`)
		// 	.then(function () {
		// 		$scope.jobs = [];	
		// 		$scope.search();	
		// 	})

}])