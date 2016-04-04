"use strict";

Newave.controller('NewaveCtrl', [
	"$scope",	
	"jobFactory",
	"Upload",
	"glassdoor",

	function($scope, jobFactory, upload, glassdoor){
		$scope.allJobs = [];

	$scope.glassdoorButton = () => {
		console.log("click");
		glassdoor.info()
		.then(
			glassdoorData => {
				console.log("glassdoorData", glassdoorData);
			})
	}	

		jobFactory.searchAllJobPostings()
		.then(
			jobData => {
				console.log("jobData", jobData);
				for (let currentObj in jobData) {
					jobData[currentObj].currentObj = currentObj;
					$scope.allJobs.push(jobData[currentObj]);
				}	
			},
			error => console.log("error")
		);

		$scope.logoutUser = () => firebaseRef.unauth();
			console.log("user logged out");
  }
])