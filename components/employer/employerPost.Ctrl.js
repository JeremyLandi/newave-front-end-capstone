"use strict";

Newave.controller('EmployerPostCtrl', [
	'$scope',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',

	function($scope, $http, $q, $location, authenticate,jobFactory) {
		
		let firebaseRef = new Firebase('https://frontend-capstone.firebaseio.com/');

		$scope.newJobPosting = {
			companyName: "",
			jobTitle: "",
			location: "",
			description: "",
			questionOne: "",
			questionTwo: "",
			employerUid: "",		
			applicantUid: "",
			datePosted: "",
			updatedCompany: ""
		};


		$scope.postJob = () => {
			let currentUpdatedCompany = jobFactory.logoApiConverter($scope.newJobPosting.companyName) 
	    let myDate = new Date();
			let newJob = {
				companyName: $scope.newJobPosting.companyName,
				jobTitle: $scope.newJobPosting.jobTitle,
				location: $scope.newJobPosting.location,
				questionOne: $scope.newJobPosting.questionOne,
				questionTwo: $scope.newJobPosting.questionTwo,
				description: $scope.newJobPosting.description,
				employerUid: firebaseRef.getAuth().uid,
				datePosted: myDate.toLocaleString(),
				updatedCompany: currentUpdatedCompany
			};

			$http.post(`https://frontend-capstone.firebaseio.com/jobs/.json`, 
				JSON.stringify(newJob))
			.success(
        job => {
        	console.log("SUCCESS", job);
        	$location.url('/employer')
        },
        error => {console.log("error");}
			)
		}		
}])


