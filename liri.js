require("dotenv").config();
var keys = require('./keys')
var Request = require('request')
var Twitter = require('twitter')
var Spotify = require('node-spotify-api')
var client = new Twitter(keys.twitter)
var spotify = new Spotify(keys.spotify);
var fs = require('fs')



if (process.argv[2] === 'my-tweets') {
    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=dr_strongwater&count=20', function(error, response) {
        if(error) throw error;
        // console.log(tweets);  // The favorites. 
        response.forEach(tweet => {
            console.log(tweet.created_at);
            console.log(tweet.text);
            console.log('_____________');
            
        });;  // Raw response object. 
    });
}


if (process.argv[2] === 'spotify-this-song') {

    var query = process.argv[3]
    if(query){
        spotify.search({ type:'track', query: query, limit: 10 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items.forEach(item => {
                item.artists.forEach(artist => {
                    console.log(artist.name);
                })
                console.log(item.name);
                console.log(item.preview_url);
                console.log(item.album.name); 
                console.log('________________');
                
                
            }));
        });
    }
    else {
        spotify.search({ type:'track', query: 'The Sign', limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items.forEach(item => {
                item.artists.forEach(artist => {
                    console.log(artist.name);
                })
                console.log(item.name);
                console.log(item.preview_url);
                console.log(item.album.name); 
                
            }));
        });

    }
 
}
if (process.argv[2] === 'movie-this') {
    var query = process.argv[3]
    if(query){
        Request('http://www.omdbapi.com/?apikey=trilogy&t='+query, (err, res, body) => {
            if(err)console.log(err)
            let movie = JSON.parse(body)
            
            console.log(movie.Title)
            console.log(movie.Year)
            movie.Ratings.forEach(rating => {
                if (rating.Source === 'Internet Movie Database') {
                    console.log(rating.Source, rating.Value);
                }
                if (rating.Source === 'Rotten Tomatoes') {
                    console.log(rating.Source, rating.Value);
                }
            })
            console.log(movie.Country)
            console.log(movie.Language)
            console.log(movie.Plot)
            console.log(movie.Actors)
        })
    }
    else
        Request('http://www.omdbapi.com/?apikey=trilogy&t=Mr. Nobody', (err, res, body) => {
            if(err)console.log(err)
            let movie = JSON.parse(body)
            
            console.log(movie.Title)
            console.log(movie.Year)
            movie.Ratings.forEach(rating => {
                if (rating.Source === 'Internet Movie Database') {
                    console.log(rating.Source, rating.Value);
                }
                if (rating.Source === 'Rotten Tomatoes') {
                    console.log(rating.Source, rating.Value);
                }
            })
            console.log(movie.Country)
            console.log(movie.Language)
            console.log(movie.Plot)
            console.log(movie.Actors)
        })
 
}
if (process.argv[2] === 'do-what-it-says') {

    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        var command = data
        var commandsArr ;
        for (i = 0; i < command.length; i++) {
            commandsArr = command.split(',')
        }
        console.log(commandsArr);
        console.log(commandsArr[0]);
        console.log(commandsArr[1]);
      
        if (commandsArr[0] === 'spotify-this-song') {

            var query = commandsArr[1]
            if(query){
                spotify.search({ type:'track', query: query, limit: 10 }, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                    console.log(data.tracks.items.forEach(item => {
                        item.artists.forEach(artist => {
                            console.log(artist.name);
                        })
                        console.log(item.name);
                        console.log(item.preview_url);
                        console.log(item.album.name); 
                        console.log('________________');
                        
                        
                    }));
                });
            }
        }  
    });
}

