// REQUIRED VARIABLES

    // for keys/id/secrets
    require("dotenv").config();

    // helpful color coding package...for visual people
    const colors = require("colors")

    // required npm packages to run liri-bot
    const fs = require("fs");
    const Spotify = require('node-spotify-api');
    const axios = require('axios');
    const moment = require('moment');
    let keys = require("./key.js");


    // argument inputs examples: [2]'spotify-this-song' and [3]'song name' 
    var argvOne = process.argv[2].toLowerCase()
    var argvTwo = process.argv.slice(3).join(" ")

// run concert function for switch/case
const concert = function() {
    if(argvTwo) {
        bands(argvTwo)
    } else {
        bands("Taylor Swift")
    }
}

    function bands(concerts) {

        // applying argvTwo to bands-in-town api call
        axios.get("https://rest.bandsintown.com/artists/" + concerts + "/events?app_id=" + keys.bandsInTown.key).then(function (response) {
        
            // handle success
                console.log("Artist: " + concerts)
                for (i = 0; i < 3; i++) {
                    console.log("Venue: " + response.data[i].venue.name)
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country)
                    console.log("Concert Date: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'))
                    
                    console.log("***************************************".green)
                }
            }).catch(function (error) {
                // handle error
                console.log(error);
            })
    }


// run songs function for switch/case
const songs = function() {
    if(argvTwo) {
        spotify(argvTwo)
    } else {
        spotify("Barbie Tingz Nicki Minaj")
    }
}

    function spotify(artist) {
        // Spotify keys required
        const spotify = new Spotify(keys.spotify);

        // applying argvTwo to spotify api call
        spotify.search({ type: 'track', query: artist, limit: 3 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks)
            // loop for initial object information
            for (let i = 0; i < 5; i++) {
                console.log("Song: " + data.tracks.items[i].name);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("URL: " + data.tracks.items[i].preview_url);

                // empty array to push artist names 
                var artistNames = []

                // artists is an object within the items object, created for loop to grab artist name values 
                for (let j = 0; j < data.tracks.items[i].artists.length; j++){
                    artistNames.push(data.tracks.items[i].artists[j].name)
                };
            
                console.log("Artist(s): " + artistNames.join(", "))

                console.log("***************************************".blue)
            }
        })
    }

// run movies function for switch/case
const movies = function() {
    if(argvTwo) {
        movieSearch(argvTwo)
    } else {
        movieSearch("Monty Python and the Holy Grail")
    }
}

    function movieSearch(movie) {

        // applying argvTwo to omdb api call
        axios.get("http://www.omdbapi.com/?t=" + movie + "&" + keys.omdbURL.key).then(function (response) {
            
            // handle success
            console.log("Title: " + response.data.Title)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            console.log("Year: " + response.data.Year)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("IMDB Rating: " + response.data.Ratings[0].Value)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)

            console.log("***************************************".yellow)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

// run doWhat function for switch/case
const doWhat = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // split contents to build array
        var splitContents = data.split(",");

        var doWhatSongs = splitContents[1]
        var doWhatMovies = splitContents[3]
        var argvTwo = splitContents[5]

        spotify(doWhatSongs)
        movieSearch(doWhatMovies)
        concert(argvTwo)
    });
}

// SWITCH 
switch(argvOne) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        songs();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        doWhat()
        break;
    default:
        console.log("I'm trapped in a glass box of emotion.")
}
