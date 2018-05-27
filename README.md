# Trending Links on Twitter
Purpose: to find, track, and display popular links being tweeted.

## How it Works
* ### Back-End (Node.js, Express)
The program listens to the twitter's stream of incoming tweets and identifies those that include a URL. That URL is added to a list of URL objects, where the time elapsed since added to the index and frequency of tweets are continuously tracked. Every 15 minutes, the program iterates through all URL objects and uses (time elapsed / frequency) to determine popularity. Using an API, the tweets with popularity levels above a set threshold are returned via a GET request to the front-end.
* ### Front-End (HTML, CSS, JS, jQuery)
The client-side JS makes a GET request to the API, receiving URL objects in the JSON format. The JSON is parsed, sorted, and then translated into HTML elements appended to the webpage for user interaction. 

## Demo
<img src="./demo.png" style="width: 100vw">

## Additional Links
* Twitter Developers - https://developer.twitter.com
* Express - https://expressjs.com
