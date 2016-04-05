
"use strict";

Newave.controller('EditPostCtrl', [
	'$scope',
	'$routeParams',
	'$location',
	'jobFactory',
	'PostJobFactory',
	'$route',
	'$templateCache',


	function($scope, $routeParams,$location, jobFactory, postJobFactory, $route, $templateCache) {
				
		$scope.jobs = [];

		$scope.editJobPosting = {
			companyName: "",
			jobTitle: "",
			location: "",
			description: "",
			questionOne: "",
			questionTwo: "",
			employerUid: "",		
			datePosted: "",
			updatedCompany: ""		
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
			$scope.editJobPosting.questionOne = $scope.jobs[0].questionOne
			$scope.editJobPosting.questionTwo = $scope.jobs[0].questionTwo
			$scope.editJobPosting.employerUid = $scope.jobs[0].employerUid
			$scope.editJobPosting.datePosted = $scope.jobs[0].datePosted
			$scope.editJobPosting.updatedCompany = jobFactory.logoApiConverter($scope.jobs[0].companyName)


			postJobFactory.updateJob($routeParams.postID, $scope.editJobPosting)
			$location.url('/managePost/:postID');
			$scope.reloadPage();
		}

		$scope.reloadPage = () => {
			$scope.jobs = [];
			jobFactory.searchJobPostingsForEmpPost($routeParams.postID)
		.then(
			jobData => {
				$scope.jobs.push(jobData)
				console.log("jobs", $scope.jobs);
				$route.reload();
			}
		)}
}])
			