require("dotenv").config()
/* Setting things up. */
var path = require('path'),
    express = require('express'),
    app = express();

app.use(express.static('public'));

// Tweets hour every hour
let twit = require('./tweet_every_hour')
twit.init();

twit.tweet("I am abed")

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
});