
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

		let jobPostings = {
			companyName: "",
			jobTitle: "",
			location: "",
			description: "",
			datePosted: ""
		}

	$scope.search = () => {
		jobFactory.searchJobPostings()
		.then(
			jobData => {
				console.log("jobData", jobData);
				for (let currentObj in jobData) {
					jobData[currentObj].currentObj = currentObj;
					$scope.jobs.push(jobData[currentObj]);
					console.log("jobData[currentObj]", jobData[currentObj]);
				}	
			},
			error => console.log("error")
		);
	}	
	$scope.search();


	$scope.deletePost = (postID) => $http
		.delete(`https://frontend-capstone.firebaseio.com/jobs/${postID}.json`)
		.then( function () {
		$scope.jobs = [];	
		$scope.search();	
		})

		console.log("delete");

}])


