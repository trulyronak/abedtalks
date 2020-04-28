require("dotenv").config();

/// Runs Python Webscraping Code
async function randomQuote() {
    let getquote = new Promise((success, nosuccess) => {

        const { spawn } = require('child_process');
        const pyprog = spawn('python', ['./webscrape.py']);

        pyprog.stdout.on('data', function(data) {
            success(data);
        });
    
        pyprog.stderr.on('data', (data) => {
            nosuccess(data);
        });
    });
    
    try {
        let quote = await getquote;
        return quote.toString();
    } catch (err) {
        console.log(err.toString())
        return "Error getting quote"
    }
} 

const Twit = require('twit'),
    config = {
        twitter: {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        }
    },
    T = new Twit(config.twitter);

/// main function that puts everything together
async function main() {
    const quote = await randomQuote();
    console.log(`Attempting to Tweet ${quote}`)

    T.post('statuses/update', { status: quote }, function(err, data, response) {
        if (err){
            console.log('Error!');
            console.log(err);
        }
        else{
            console.log("Great success!");
            console.log(response.url)
        }
    });        
}

main();