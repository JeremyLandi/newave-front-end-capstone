
"use strict";

Newave.controller('ManageApplicantCtrl', [
	'$scope',
	'$routeParams',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',

	function($scope, $routeParams, $http, $q, $location, authenticate, jobFactory) {
		$scope.jobApplicants = [];
		let userApplicantArray = [];
		let employerJobListing = [];	
		let applicantIdArray = [];

		// GETS ALL APPLICANTS
		$scope.getApplicant = () => {
			return $q((resolve, reject) =>
				$http.get(`https://frontend-capstone.firebaseio.com/applicantProfiles.json`)
					.success(
						userApplicantData => {
						console.log("userApplicantData",userApplicantData);
						for (let key in userApplicantData) {
							userApplicantData[key].key = key;
							userApplicantArray.push(userApplicantData[key]);
			 			}
			 			console.log("userApplicantArray", $scope.userApplicantArray);
						resolve(userApplicantData);

					 	// COMPARES APPLIED APPLICANTS ID TO USER PROFILE
							console.log("did this run");
							for (var i = 0; i < applicantIdArray.length; i++) {
								for (var j = 0; j < userApplicantArray.length; j++) {
									if (applicantIdArray[i] === userApplicantArray[j].uid) {
										$scope.jobApplicants.push(userApplicantArray[j]);
									}
								}
							}
							console.log("$scope.jobApplicants", $scope.jobApplicants);
							// console.log("userApplicantArray",userApplicantArray);
					},
					error => reject(error)	
				)
			)	
		}
				
		// GETS APPLICANT ID BASED ON CLICKED JOB
		$scope.viewJobApplicant = () => {
		 	return $q((resolve, reject) =>
		 		$http.get(`https://frontend-capstone.firebaseio.com/jobApplicants.json?orderBy="jobId"&equalTo="${$routeParams.postID}"`)
		 		.success(
		 			jobApplicantData => {
		 				// PUTS JOBLISTING OBJECTS INTO AN ARRAY
		 				for (let key in jobApplicantData) {
							employerJobListing.push(jobApplicantData[key]);
						}
						// SORTS THROUGH ARRAY TO GET APPLICANT ID 
						// ASSOCIATED WITH JOB POSTINGS
						for (var i = 0; i < employerJobListing.length; i++) {
							let currentEmployerJobListing = employerJobListing[i]
							applicantIdArray.push(currentEmployerJobListing.applicantId);
						}	
						$scope.getApplicant();	
						console.log("applicantIdArray", applicantIdArray);
						console.log("employerJobListing", employerJobListing);
		 				resolve(jobApplicantData);
		 			},
		 			error => reject(error)
		 		)
		 	)
		}
		$scope.viewJobApplicant();	
}])