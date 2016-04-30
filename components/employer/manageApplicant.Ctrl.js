"use strict";

Newave.controller('ManageApplicantCtrl', [
	'$scope',
	'$routeParams',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',
	'$sce',
	'$route',
	'profileFactory',

	function($scope, $routeParams, $http, $q, $location, authenticate, jobFactory, $sce, $route, profileFactory) {

		let ref = new Firebase(`https://frontend-capstone.firebaseio.com/jobApplicants`)

		let applicantObj =  {
			applicantId: "",
			audio: ""
		}

		let userApplicantArray = [];
		let currentJobPost = [];	
		let applicantIdArray = [];

		$scope.showAll = true;

		$scope.jobApplicants = [];
		$scope.newApplicants = [];
		$scope.potentialArr = [];
		$scope.neutralArr = [];
		$scope.removedArr = [];

		// SWITCH VIEWS
		$scope.ViewAll = () => {
			$scope.showAll = true;
			$scope.showNew = false;
			$scope.showPotenital = false;
			$scope.showNeutral = false;
			$scope.showRemoved = false;
		}
		$scope.ViewNew = () => {
			$scope.showAll = false
			$scope.showNew = true;
			$scope.showPotenital = false;
			$scope.showNeutral = false;
			$scope.showRemoved = false;
		}

		$scope.ViewPotenital = () => {
			$scope.showAll = false
			$scope.showNew = false;
			$scope.showPotenital = true;
			$scope.showNeutral = false;
			$scope.showRemoved = false;
		}

		$scope.ViewNeutral = () => {
			$scope.showAll = false
			$scope.showNew = false;
			$scope.showPotenital = false;
			$scope.showNeutral = true;
			$scope.showRemoved = false;
		}

		$scope.ViewRemoved = () => {
			$scope.showAll = false
			$scope.showNew = false;
			$scope.showPotenital = false;
			$scope.showNeutral = false;
			$scope.showRemoved = true;
		}

		$scope.sort = () => {
			for (var j = 0; j < $scope.jobApplicants.length; j++) {
				for (let i = 0; i < currentJobPost.length; i++) {
					if (currentJobPost[i].potential === true && currentJobPost[i].applicantId === $scope.jobApplicants[j].uid) {
						$scope.potentialArr.push($scope.jobApplicants[j]);
					}
					else if (currentJobPost[i].neutral == true && currentJobPost[i].applicantId === $scope.jobApplicants[j].uid) {
						$scope.neutralArr.push($scope.jobApplicants[j])
					}
					else if (currentJobPost[i].removed == true && currentJobPost[i].applicantId === $scope.jobApplicants[j].uid) {
						$scope.removedArr.push($scope.jobApplicants[j])
					}
					else if (currentJobPost[i].potential == false && currentJobPost[i].neutral == false && currentJobPost[i].removed == false && currentJobPost[i].applicantId === $scope.jobApplicants[j].uid) {
						$scope.newApplicants.push($scope.jobApplicants[j])
					}
				}
			}
		}

		// ADDS/UPDATES STATUS OF APPLIANT TO NESTED FB OBJECT
		$scope.potential = (jobListingKey, applicantUid) => {
			let userRef = ref.child(jobListingKey)
			userRef.update({
				potential: true,
				neutral: false,
				removed: false
			})
			$scope.newApplicants = [];
			$scope.potentialArr = [];
			$scope.neutralArr = [];
			$scope.removedArr = [];
			for (var i = 0; i < currentJobPost.length; i++) {
				if (applicantUid === currentJobPost[i].applicantId) {
					currentJobPost[i].potential = true;
					currentJobPost[i].neutral = false;
					currentJobPost[i].removed = false;
				}
			}
			$scope.sort();
		}
		$scope.neutral = (jobListingKey, applicantUid) => {
			let userRef = ref.child(jobListingKey)
			userRef.update({
				potential: false,
				neutral: true,
				removed: false
			})
			$scope.newApplicants = [];
			$scope.potentialArr = [];
			$scope.neutralArr = [];
			$scope.removedArr = [];
			for (var i = 0; i < currentJobPost.length; i++) {
				if (applicantUid = currentJobPost[i].applicantId) {
					currentJobPost[i].potential = false;
					currentJobPost[i].neutral = true;
					currentJobPost[i].removed = false;
				}
			}
			$scope.sort();
		}
		$scope.remove = (jobListingKey, applicantUid) => {
			let userRef = ref.child(jobListingKey)
			userRef.update({
				potential: false,
				neutral: false,
				removed: true
			})
			$scope.newApplicants = [];
			$scope.potentialArr = [];
			$scope.neutralArr = [];
			$scope.removedArr = [];
			for (var i = 0; i < currentJobPost.length; i++) {
				if (applicantUid = currentJobPost[i].applicantId) {
					currentJobPost[i].potential = false;
					currentJobPost[i].neutral = false;
					currentJobPost[i].removed = true;
				}
			}
			$scope.sort();
		}

	// GETS ALL APPLICANTS
		$scope.getApplicant = () => {
			profileFactory.getAllApplicantProfile()
			.then(
				applicantData => {
					console.log("applicantData",applicantData);
					for (let key in applicantData) {
						applicantData[key].key = key;
						userApplicantArray.push(applicantData[key]);
		 			}
				}			
			).then(
				() => {
				 	// COMPARES APPLIED APPLICANTS ID TO USER PROFILE
					for (let i = 0; i < applicantIdArray.length; i++) {
						for (let j = 0; j < userApplicantArray.length; j++) {
							if (applicantIdArray[i].applicantId === userApplicantArray[j].uid) {
								userApplicantArray[j].audio = applicantIdArray[i].audio;
								userApplicantArray[j].jobListingKey = applicantIdArray[i].jobListingKey;
								userApplicantArray[j].dateApplied = applicantIdArray[i].dateApplied;
								$scope.jobApplicants.push(userApplicantArray[j]);
							}
						}
					}
				}
			)
			$scope.sort();
		}
				
		// GETS APPLICANT ID BASED ON CLICKED JOB
		$scope.viewJobApplicant = () => {
		 	jobFactory.searchAppliedJobs()
		 		.then(
		 			jobApplicantData => {
		 				// PUTS JOBLISTING OBJECTS INTO AN ARRAY
		 				for (let key in jobApplicantData) {
		 					jobApplicantData[key].jobListingKey = key
							currentJobPost.push(jobApplicantData[key]);
						}
					}	
				).then(
					() => {
					// SORTS THROUGH ARRAY TO GET APPLICANT ID ASSOCIATED WITH JOB POSTINGS
					for (let i = 0; i < currentJobPost.length; i++) {
						applicantObj = {};
						//decodes audio blob and allows it to be trusted
						let audio = window.atob(currentJobPost[i].audio);
						applicantObj.audio = $sce.trustAsResourceUrl(audio);

						applicantObj.dateApplied = currentJobPost[i].dateApplied;
						applicantObj.applicantId = currentJobPost[i].applicantId;
						applicantObj.jobListingKey = currentJobPost[i].jobListingKey;
						applicantIdArray.push(applicantObj);
					}
				})
			$scope.getApplicant();				
		}
		$scope.viewJobApplicant();	
	}
])