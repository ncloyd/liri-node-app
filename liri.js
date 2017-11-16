// ------------------------------------- Node --------------------------------------------------//
var tkeys = require("./keys.js");
var twitter = require('twitter');
var request = require('request');
var spotify = require('spotify');
var liriArgument = process.argv[2];

switch (liriArgument) {
    case "movie-this":
        movieThis();
        break;
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
};


// ------------------------------------- Twitter --------------------------------------------------//

function myTweets() {

    var client = new twitter(tkeys);

    //parameters for twitter function.
    var params = {
        screen_name: 'nickclo3',
        count: 20
    };

    //call the get method on our client variable twitter instance
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                //                 //     "@" + tweets[i].user.screen_name + ": " +
                var returnedData = ('\n' + "@" + tweets[i].user.screen_name + ": " + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log(returnedData);
                console.log("-------------------------");
            }
        };
    });
};

// --------------------------------------- OMDB ---------------------------------------------------//

function movieThis() {
    // grab user input, store as a variable
    var movieName = process.argv[3];
    if (!movieName) {
        movieName = "mr nobody";
    };

    // run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            // Then log the Release Year for the movie
            console.log("\nMovie Title: " + JSON.parse(body).Title + "\nThe movie's release year is: " +
                JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomato Rating: " +
                JSON.parse(body).tomatoUserRating + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " +
                JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
        }
    });
};
// ------------------------------------- Spotify --------------------------------------------------//
function spotifyThis(songName) {
    console.log("Is this shit working?");

    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign";
    };

    spotify.search({ type: "track", query: songName }, function(err, data) {
       
        if (err) {
            console.log("There was an error:" + err);
            return;
        } else {
            console.log(
                // "Artist: " + data.tracks.items[0].artists[0].name + "\n" +
                "Song: " + data.tracks.items[0].name + "\n" +
                "Album: " + data.tracks.items[0].album.name + "\n" +
                "Preview Url: " + data.tracks.items[0].preview_url + "\n");
        }
    });
};


//------------------------------------ Backstreets Back  ------------------------------------------//
// Core node package for reading and writing files
// var fs = require("fs");


// fs.readFile("random.txt", "utf8", function(err) {

//   // If the code experiences any errors it will log the error to the console.
//   if (err) {
//     return console.log(err);
//   }

//   // Otherwise, it will print: "movies.txt was updated!"
//   console.log("movies.txt was updated!");

// });