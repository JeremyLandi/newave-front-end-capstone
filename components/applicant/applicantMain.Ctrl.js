
"use strict";

Newave.controller('ApplicantMainCtrl', [
	'$scope',
	'$http',
	'$q',
	'$location',
	'authenticate',
	'jobFactory',
	'Upload',

	function($scope, $http, $q, $location, authenticate, jobFactory, upload) {
		
		$scope.allJobs = [];
		let newAudio = "";
		let myDate = new Date();

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

		// ALERT SECTION 
		$scope.alert = false;
		$scope.showAlert = () => {
			$scope.alert = true;
		}
		$scope.closeAlert = function(index) {
		    $scope.alert = false;
		};

	let applicants = {
		jobId: "",
		applicantId: "",
		potential: "",
		neutral: "",
		removed:"",
		dateApplied: myDate.toLocaleString()
	};


	// APPLY FOR JOB
	$scope.applicantApply = (postId) => {
		// gets/sets user ID
		let currentApplicant = authenticate.getCurrentUser();
		applicants.applicantId = currentApplicant.uid;

		console.log("postID", postId);
		applicants.jobId = postId;
		applicants.audio = newAudio;
		applicants.potential = false;
		applicants.neutral = false;
		applicants.removed = false;

		$scope.showAlert();
		$http.post(`https://frontend-capstone.firebaseio.com/jobApplicants/.json`, JSON.stringify(applicants))
	}

	// AUDIO SECTION	
	$scope.createAudioSection = () => {
		newAudio = "";
		// MediaDevices.getUserMedia
		navigator.getUserMedia  = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

		if (navigator.getUserMedia) {
		  console.log('getUserMedia supported.');

		  var constraints = { audio: true };
		  var chunks = [];

		  var onSuccess = function(stream) {
		    var mediaRecorder = new MediaRecorder(stream);

		    $scope.startRecord = () => {
		      mediaRecorder.start();
		      console.log(mediaRecorder.state);
		      console.log("recorder started");
		    }

		     $scope.stopRecord = () => {
		      mediaRecorder.stop();
		      console.log(mediaRecorder.state);
		      console.log("recorder stopped");
		      // mediaRecorder.requestData();
		    }

		    mediaRecorder.onstop = function(e) {
		      console.log("data available after MediaRecorder.stop() called.");

		      var clipContainer = document.createElement('article');
		      var audio = document.createElement('audio');
		     
		      clipContainer.classList.add('clip');
		      audio.setAttribute('controls', '');
		     
		      clipContainer.appendChild(audio);

		      audio.controls = true;
		      var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
		      chunks = [];
		      var audioURL = window.URL.createObjectURL(blob);
		      audio.src = audioURL;
		      console.log("recorder stopped");
		      console.log("newAudio", newAudio);
		      
		      //converts blob audio into btoa format
		      upload.base64DataUrl(blob)
		      .then(
		      	(resp) => {
				      newAudio =  window.btoa(resp);
		      	}
		      );
		    }
		    mediaRecorder.ondataavailable = function(e) {
		      chunks.push(e.data);
		    }
		  }

		  var onError = function(err) {
		    console.log('The following error occured: ' + err);
		  }

		  navigator.getUserMedia(constraints, onSuccess, onError);
		} else {
		   console.log('getUserMedia not supported on your browser!');
		}
	}
}])