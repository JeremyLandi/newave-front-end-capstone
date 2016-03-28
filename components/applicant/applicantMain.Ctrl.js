
"use strict";

Newave.controller('ApplicantMainCtrl', [
	'$scope',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',

	function($scope, $http, $q, $location, authenticate, jobFactory) {
		
		$scope.allJobs = [];

		// GETS ALL JOBS
		jobFactory.searchAllJobPostings()
		.then(
			jobData => {
				console.log("jobData", jobData);
				for (let key in jobData) {
					jobData[key].id = key;
					$scope.allJobs.push(jobData[key]);
					console.log("jobData[key]", jobData[key]);
				}	
			},
			error => console.log("error")
		);

	let applicants = {
		jobId: "",
		applicantId: ""
	};

	// APPLY FOR JOB
	$scope.applicantApply = (postId) => {
		// gets/sets user ID
		let currentApplicant = authenticate.getCurrentUser();
		console.log("currentApplicant.uid", currentApplicant.uid);
			applicants.applicantId = currentApplicant.uid;

		console.log("postID", postId);
		applicants.jobId = postId;

		$http.post(`https://frontend-capstone.firebaseio.com/jobApplicants/.json`, JSON.stringify(applicants))
	}		
}])


