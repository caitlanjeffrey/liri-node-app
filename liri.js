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
    let keys = require("./keys.js");


    // argument inputs examples: [2]'spotify-this-song' and [3]'song name' 
    var argvOne = process.argv[2]
    var argvTwo = process.argv.slice(3).join(" ")


// run concert function for switch/case
const concert = function() {

    // applying argvTwo to bands-in-town api call
    axios.get("https://rest.bandsintown.com/artists/" + argvTwo + "/events?" + keys.bandsInTown.key).then(function (response) {
        // handle success
        // console.log(response.data)
        console.log("Venue: " + response.venue.name)
        console.log(response.data.datetime)
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
}

// run songs function for switch/case
const songs = function() {

    // Spotify keys required
    const spotify = new Spotify(keys.spotify);

    // applying argvTwo to spotify api call
    spotify.search({ type: 'track', query: argvTwo }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // loop for initial object information
        for (let i = 0; i < data.tracks.items.length; i++) {
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

    // applying argvTwo to omdb api call
    axios.get("http://www.omdbapi.com/?t=" + argvTwo + "&" + keys.omdbURL.key).then(function (response) {
        // handle success
        console.log(response.data)
        console.log("Title: " + response.data.Title)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
        console.log("Year: " + response.data.Year)
        console.log("Country: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("IMDB Rating: " + response.data.Ratings[0].Value)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
}

// run doWhat function for switch/case
const doWhat = function() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            throw err;
        }
    
    //Parse the JSON string to an object
        
    
    //Create two new arrays to contain the cats and dogs objects
        songs(JSON.stringify(data))
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
        console.log("Idk what you want. Go away.")
}
