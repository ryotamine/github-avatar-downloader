var request = require('request');
var token = require('./secrets');
var fs = require('fs');

// get repo owner and name from user
var args = process.argv;
var owner = args[2];
var name = args[3];

// introduction
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  // check for repo owner and name input from user
  if (!repoOwner || !repoName) {
    console.log("Please add both repo owner and name.");
    return null;
  }

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
getRepoContributors(owner, name, function(err, result) {

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
// function downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");