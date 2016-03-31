
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
		applicants.audio = newAudio;

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

		      // stop.disabled = false;
		      // record.disabled = true;
		    }

		     $scope.stopRecord = () => {
		      mediaRecorder.stop();
		      console.log(mediaRecorder.state);
		      console.log("recorder stopped");
		      // mediaRecorder.requestData();

		      // stop.disabled = true;
		      // record.disabled = false;
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
		      
		      upload.base64DataUrl(blob)
		      .then(
		      	(resp) => {
				      newAudio =  window.btoa(resp);
		      		// console.log(newAudio);
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


