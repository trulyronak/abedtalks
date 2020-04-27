var Twit = require('twit'),
    config = {
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

//
// Private Functions
//
function calculateTimer() {
  var time = new Date();
  var minutes_left = 60 - time.getMinutes();
  var seconds_left = 60 - time.getSeconds();
  var miliseconds_left = (minutes_left*60 + seconds_left)*1000;

  return miliseconds_left;
}

function startTimer(countdown, callback) {
  setTimeout(callback, countdown);
}

function getRandomEmoji() {
  const abed_array= [" How did we get the short straw?", "We can't both do the zinger."];  
  const chosen_quote = emojis_array[Math.floor(Math.random()*abed_array.length)];

  return chosen_quote;
}

function getActualTime() {
  var date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
  var date = new Date(date_string);
  var hour = date.getHours();
  var minutes = ":00";
  var result = hour + minutes;

  return result;
}

function composeMessage() { 
  var time = getActualTime();
  var emoji = getRandomEmoji();
  var message = "Son las " + time + " " + emoji;
  
  return message;
}

const tweetMessage = (message) => {
  T.post('statuses/update', { status: message }, function(err, data, response) {
    if (err){
      console.log('Error!');
      console.log(err);
    }
    else{
      console.log("Great success!");
    }
  });
}

function initialize() {
  var miliseconds_left = calculateTimer();
  var timer = startTimer(miliseconds_left, function() {
    var message = composeMessage();
    tweetMessage(message);
    initialize();
  });
}

//
// Public Functions
//
module.exports = {
    init: initialize,
    tweet: tweetMessage
}