// "use strict";

// Newave.factory("jobPostingFactory", function ($q, $http) {

//   let getJobPosting = {};

//   getJobPosting.searchJobs = () => {
//     return $q((resolve, reject) =>
//       $http.get(`https://frontend-capstone.firebaseio.com/posting/.json`)
//         .success(
//           jobData => {
//             resolve(jobData);
//             console.log("SUCCESS", jobData);
//           },
//           error => reject(error)
//         )
//     )
//   }
//   return getJobPosting;
// });

// 'use strict';

// Newave.factory("postJob", function ($http, $q) {
//   let postJob = (job) => {
//     job.user = "-KCwF1J8j17zjGJxCGq_";
//     console.log(job);
//     return $q((resolve, reject) => {
//       $http.post(`https://dreamteam-music-hist.firebaseio.com/posting/.json`, {job})
//       .success(
//             job => {
//               resolve(job);
//               console.log("SUCCESS", job);
//             },
//             error => reject(error)
//         )
//       });
//     }
//   return postJob;
// });

