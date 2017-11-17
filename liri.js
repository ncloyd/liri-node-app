// ------------------------------------- Node --------------------------------------------------//
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var liriArgument = process.argv[2];
var songName = process.argv[3];
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
    case "do-what-it-says":
        backStreet();
};


// ------------------------------------- Twitter --------------------------------------------------//

function myTweets() {
    var client = new Twitter(keys.twitterKeys);

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
    // console.log(queryUrl);

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
// var spotify = new Spotify(keys.spotifyKeys);
// var getArtistNames = function(artist) {
//     return artist.name;
// };

// function spotifyThis() {

//     var spotify = new Spotify(keys.spotifyKeys);

//     var getArtistNames = function(artist) {
//     return artist.name;
// };

//     if (!songName) {
//         songName = "The Sign";
//     }
//     spotify.search({ type: 'track', query: songName }, function(err, data) {
//         if (err) {
//             console.log('Error occurred: ' + err);
//             return;
//         }

//         var songs = data.tracks.items;
//         var data = []; //empty array to hold data

//         for (var i = 0; i < songs.length; i++) {
//             data.push({
//                 'artist(s)': songs[0].artists.map(getArtistNames),
//                 'song name: ': songs[0].name,
//                 'preview song: ': songs[0].preview_url,
//                 'album: ': songs[0].album.name,
//             });
//         }
//         console.log(data);
//     });
// };


function spotifyThis() {
    var spotify = new Spotify(keys.spotifyKeys);
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign";
    }

    spotify.search({ type: "track", query: songName }, function(err, data) {

        if (err) {
            console.log("There was an error:" + err);
            return;
        }
        console.log(
            "=========================================================" + "\n" +
            "Artist: " + data.tracks.items[0].artists[0].name + "\n" +
            "Song: " + data.tracks.items[0].name + "\n" +
            "Album: " + data.tracks.items[0].album.name + "\n" +
            "Preview Url: " + data.tracks.items[0].preview_url + "\n" +
            "=========================================================");

    });
};


//------------------------------------ Backstreets Back  ------------------------------------------//

function backStreet() {
    fs.readFile("random.txt", "utf8", function(err, data) {

            if (err) {
                return console.log(err);
            }

            var things = data.split(',');
            //pass this information into the spotify function and run the userSelection through to get the results.  this will automatically console.log the info and then append the info into the txt file
            if (things[0] === songName) {
                songName = things[1];
                mySpotify(songName);
            }
    });
};