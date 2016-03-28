
"use strict";

Newave.controller('ManagePostCtrl', [
	'$scope',
	'$routeParams',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',

	function($scope, $routeParams, $http, $q, $location, authenticate, jobFactory) {
		
		$scope.jobs = [];


		$scope.companyName = "";

		$scope.search = () => {
			jobFactory.searchEmployerJobPostings()
			.then(
				jobData => {
					console.log("jobData", jobData);
					for (let key in jobData) {
						jobData[key].id = key;
						$scope.jobs.push(jobData[key]);
						console.log("jobData[key]", jobData[key]);
					}	
				},
				error => console.log("error")
			);
		}	
		$scope.search();

		$scope.deletePost = (postID) => $http
			.delete(`https://frontend-capstone.firebaseio.com/jobs/${postID}.json`)
			.then(function () {
				$scope.jobs = [];	
				$scope.search();	
			})

}])