
"use strict";

Newave.controller('EditPostCtrl', [
	'$scope',
	'$routeParams',
	'$location',
	'jobFactory',
	'PostJobFactory',
	'$route',


	function($scope, $routeParams,$location, jobFactory, postJobFactory, $route) {
				
		$scope.jobs = [];

		$scope.editJobPosting = {
			companyName: "",
			jobTitle: "",
			location: "",
			description: "",
			employerUid: "",		
			datePosted: ""		
		};

		jobFactory.searchJobPostingsForEmpPost($routeParams.postID)
		.then(
			jobData => {
				$scope.jobs.push(jobData)
				console.log("jobs", $scope.jobs);
			}
		)

		$scope.editPost = () => {
			$scope.editJobPosting.companyName = $scope.jobs[0].companyName,
			$scope.editJobPosting.jobTitle = $scope.jobs[0].jobTitle,
			$scope.editJobPosting.location = $scope.jobs[0].location,
			$scope.editJobPosting.description = $scope.jobs[0].description
			$scope.editJobPosting.employerUid = $scope.jobs[0].employerUid
			$scope.editJobPosting.datePosted = $scope.jobs[0].datePosted

			postJobFactory.updateJob($routeParams.postID, $scope.editJobPosting)
			$location.url('/managePost/:postID');
		}

}])
			