
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

		var ref = new Firebase("https://frontend-capstone.firebaseio.com/applicantProfiles");

		let userApplicantArray = [];
		let employerJobListing = [];	
		let applicantIdArray = [];

		$scope.showNew = true;
		// $scope.showPotenital = false;
		// $scope.showNeutral = false;
		// $scope.showRemoved = false;

		$scope.jobApplicants = [];

		$scope.newApplicants = [];
		$scope.potentialArr = [];
		$scope.neutralArr = [];
		$scope.removedArr = [];

		// SWITCH VIEWS
		$scope.New = () => {
			$scope.showNew = true;
			$scope.showPotenital = false;
			$scope.showNeutral = false;
			$scope.showRemoved = false;
		}

		$scope.Potenital = () => {
			$scope.showNew = false;
			$scope.showPotenital = true;
			$scope.showNeutral = false;
			$scope.showRemoved = false;
		}

		$scope.Neutral = () => {
			$scope.showNew = false;
			$scope.showPotenital = false;
			$scope.showNeutral = true;
			$scope.showRemoved = false;
		}

		$scope.Removed = () => {
			$scope.showNew = false;
			$scope.showPotenital = false;
			$scope.showNeutral = false;
			$scope.showRemoved = true;
		}

		$scope.sort = () => {
			for (let i = 0; i < $scope.jobApplicants.length; i++) {
				if ($scope.jobApplicants[i].potential === true) {
					$scope.potentialArr.push($scope.jobApplicants[i]);
					console.log("potential", $scope.potentialArr);
				}
				else if ($scope.jobApplicants[i].neutral == true) {
					console.log("neutral");
					$scope.neutralArr.push($scope.jobApplicants[i])
				}
				else if ($scope.jobApplicants[i].removed == true) {
					console.log("removed");
					$scope.removedArr.push($scope.jobApplicants[i])
				}
				else {
					$scope.newApplicants.push($scope.jobApplicants[i])
					console.log("newApplicants");
				}
			}
		}

		// ADDS/UPDATES STATUS OF APPLIANT TO FB OBJECT
		$scope.potential = (id) => {
			var userRef = ref.child(id)
			userRef.update({
				potential: true,
				neutral: false,
				removed: false
			})
		}
		$scope.neutral = (id) => {
			var userRef = ref.child(id)
			userRef.update({
				potential: false,
				neutral: true,
				removed: false
			})
		}
		$scope.remove = (id) => {
			var userRef = ref.child(id)
			userRef.update({
				potential: false,
				neutral: false,
				removed: true
			})
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
							userApplicantArray.push(userApplicantData[key]);
			 			}
			 			console.log("userApplicantArray", userApplicantArray);
						resolve(userApplicantData);

					 	// COMPARES APPLIED APPLICANTS ID TO USER PROFILE
						for (var i = 0; i < applicantIdArray.length; i++) {
							for (var j = 0; j < userApplicantArray.length; j++) {
								if (applicantIdArray[i] === userApplicantArray[j].uid) {
									$scope.jobApplicants.push(userApplicantArray[j]);
								}
							}
						}
						// console.log("$scope.jobApplicants", $scope.jobApplicants);
						$scope.sort();
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
						// console.log("applicantIdArray", applicantIdArray);
						// console.log("employerJobListing", employerJobListing);
		 				resolve(jobApplicantData);
		 			},
		 			error => reject(error)
		 		)
		 	)
		}
		$scope.viewJobApplicant();	
}])