var Spotify = require('node-spotify-api');
var omdb = require('omdb');

var  axios = require("axios");
    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    axios.get('OMDB Web and KEY' + omdbKey)
        .then(function (response) {

        // handle success
        console.log(response);
    }).catch(function (error) {

        // handle error
        console.log(error)
    }).finally(function () {

        // always executed
    });

// Spotify
search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

    var spotify = new Spotify({
    id: <your spotify client id>,
    secret: <your spotify client secret>
    });
    
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log(data); 
    });