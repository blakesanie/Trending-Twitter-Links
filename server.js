var Twit = require('twit');
var config = require('./config'); //contains API keys, not shown with source code
var client = new Twit(config);
var express = require('express');
var app = express();



var stream = client.stream('statuses/filter', { track: 'http', lang: 'en'});

var links = [];
var trendingLinks = [];

stream.on('tweet', function (tweet) {
    var urls = tweet.entities.urls[0];
    if (urls) {
        var full = urls.expanded_url;
        if (full.charAt(full.length - 1) === '/') {
            full = full.substring(0, full.length - 1);
        }
        addToDB(full);
    }
});



setInterval(function(){
    removeWeakLinks();
    time = 0;
}, 900000);
var time = 0;
setInterval(function(){
    console.log(time, links.length);
    time += 1;
}, 1000)



function addToDB(input) {
    var exists = false;
    var index;
    for (var i = 0; i < links.length; i++) {
        if (links[i].url === input) {
            exists = true;
            index = i;
            break;
        }
    }
    if (exists) {
        links[index].freq++;
    } else {
        var obj = {
            url: input,
            date: Date.now(),
            freq: 1,
            ratio: null,
            title: "no title"
        }
        links.push(obj);
    }
}



function removeWeakLinks() {
    for (var i = 0; i < links.length; i++) {
        var elapsed = Date.now() - links[i].date;
        //console.log(elapsed, links[i].freq);
        if (elapsed / links[i].freq > 6000) {
            links.splice(i,1);
            i--;
        } else {
            links[i].ratio = elapsed / links[i].freq;
            if (elapsed > 6000000) {
                links[i].date = Date.now();
                links[i].freq = 2;
            }
        }
    }
    var newTrending = [];
    var title;
    for (var i = 0; i < links.length; i++) {
        if (links[i].freq > 1) {
            newTrending.push(links[i]);
        }
    }
    trendingLinks = newTrending;
    console.log(trendingLinks);
}



app.use(express.static('website'));

app.get('/api/', function (req, res) {
    res.send(JSON.stringify(trendingLinks));
});

app.listen(8080);