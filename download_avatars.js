var request = require('request');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {

    // JSON.parse to convert data into data object
    var data = JSON.parse(body);
    cb(err, data);

  });

}

// call getRepoContributors function
getRepoContributors("jquery", "jquery", function(err, result) {

  // loop through avatar_url values
  for (var i = 0; i < result.length; i++) {
    console.log("Result:", result[i].avatar_url);
  }

  // log error
  console.log("Errors:", err);

});