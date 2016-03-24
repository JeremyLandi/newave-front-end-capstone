"use strict";

Newave.controller('EmployerPostCtrl', [
	'$scope',
	'$http',
	'$q',
	'$location',
	'authenticate',

	function($scope, $http, $q, $location, authenticate) {
		
		let firebaseRef = new Firebase('https://frontend-capstone.firebaseio.com/');

		$scope.newJobPosting = {
			companyName: "",
			jobTitle: "",
			location: "",
			description: "",
			employerUid: "",		
			applicantUid: "",
			datePosted: ""			
		};

		$scope.postJob = () => {
	    let myDate = new Date();
			let newJob = {
				companyName: $scope.newJobPosting.companyName,
				jobTitle: $scope.newJobPosting.jobTitle,
				location: $scope.newJobPosting.location,
				description: $scope.newJobPosting.description,
				employerUid: firebaseRef.getAuth().uid,
				datePosted: myDate.toLocaleString()
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


