
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
		
		$scope.userApplicantArray = [];
		let employerJobListing = [];	
		let applicantIdArray = [];

		// COMPARES APPLIED APPLICANTS ID TO USER PROFILE
		$scope.getSpecficApplicant = () => {
			console.log("did this run");
			for (var i = 0; i < applicantIdArray.length; i++) {
				for (var j = 0; j < $scope.userApplicantArray.length; j++) {
					if ($scope.userApplicantArray[j].uid === applicantIdArray[j]) {
						$scope.userApplicantArray.splice(j, 1);
					}
					
				}
			}
			console.log("$scope.userApplicantArray",$scope.userApplicantArray);
		}

		// GETS ALL APPLICANTS
		$scope.getApplicant = () => {
			return $q((resolve, reject) =>
				$http.get(`https://frontend-capstone.firebaseio.com/applicantProfiles.json`)
					.success(
						userApplicantData => {
						console.log("userApplicantData",userApplicantData);
						for (let key in userApplicantData) {
							userApplicantData[key].key = key;
							$scope.userApplicantArray.push(userApplicantData[key]);
			 			}
			 			console.log("userApplicantArray", $scope.userApplicantArray);
						resolve(userApplicantData);
					 	$scope.getSpecficApplicant();

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
		 				for (let key in jobApplicantData) {
							employerJobListing.push(jobApplicantData[key]);
							console.log("jobApplicantData[currentEmployerObj]", jobApplicantData[key]);
						}
						for (var i = 0; i < employerJobListing.length; i++) {
							let currentEmployerJobListing = employerJobListing[i]
							applicantIdArray.push(currentEmployerJobListing.applicantId);
							console.log("currentEmployerJobListing", currentEmployerJobListing.applicantId);
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


