var request = require('request');
var token = require('./secrets');
var fs = require('fs');

// introduction
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

  // loop through avatar_url values to fill pictures in avatars folder
  for (var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, "./avatars/" + result[i].login + ".jpg");
  }

  // log error
  console.log("Errors:", err);

});


// download avatar image function
function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}

// call downloadImageByURL function manually
function downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
