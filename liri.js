// REQUIRED VARIABLES

    // for keys/id/secrets
    require("dotenv").config();

    // helpful color coding package...for visual people
    const colors = require("colors")

    // required npm packages to run liri-bot
    const fs = require("fs");
    const Spotify = require('node-spotify-api');
    const axios = require('axios')


// GET THE INPUT 
// ACTION / TOPIC   NODE LIRI.JS THIS-SONG AN STAR WAS BORN
var argvOne = process.argv[2]
var argvTwo = process.argv.slice(3).join(" ")
//LOOP OR USE SPLICE AND JOIN

const concert = function() {

}

const songs = function() {
    // Spotify
    var keys = require("./keys.js");
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: argvTwo }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    for (let i=0; i < data.tracks.items.length; i++) {
        console.log("Song: " + data.tracks.items[i].name);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("URL: " + data.tracks.items[i].preview_url);

    var artistNames = []
    for (let j=0; j< data.tracks.items[i].artists.length;j++){
        artistNames.push(data.tracks.items[i].artists[j].name)
    };
    console.log(artistNames.join(", "))

    console.log("***************************************".red)
    }
    })
}

const movies = function() {

}

const doWhat = function() {

}

fs.readFile("animals.json", "utf8", function(err, data) {
    if (err) {
        throw err;
    }

    // Parse the JSON string to an object
    const animalJSON = JSON.parse(data);

    // Create two new arrays to contain the cats and dogs objects
    const dogs = [];
    const cats = [];
});

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
        console.log("Idk what you want.")
}
