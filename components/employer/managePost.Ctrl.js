
"use strict";

Newave.controller('ManagePostCtrl', [
	'$scope',
	'$routeParams',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',
	'$route',

	function($scope, $routeParams, $http, $q, $location, authenticate, jobFactory, $route) {
		
		$scope.jobs = [];
		$scope.companyName = "";

		$scope.$on("$stateChangeSuccess", function(event, toState) {
			console.log(event);
			console.log(toState);
			// $route.reload();
		})

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