"use strict";

Newave.controller('NewaveCtrl', [
	"$scope",	
	"jobFactory",
	"Upload",

	function($scope, jobFactory, upload){
		$scope.allJobs = [];

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