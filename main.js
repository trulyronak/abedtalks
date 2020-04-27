require("dotenv").config();

/// rewrite this to be actually webscraping and whatnot
function randomQuote() {
    const abed_array= [" How did we get the short straw?", "We can't both do the zinger."];  
    const chosen_quote = abed_array[Math.floor(Math.random()*abed_array.length)];
  
    return chosen_quote;
}

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

T.post('statuses/update', { status: process.env.MESSAGE }, function(err, data, response) {
if (err){
    console.log('Error!');
    console.log(err);
}
else{
    console.log("Great success!");
}
});
