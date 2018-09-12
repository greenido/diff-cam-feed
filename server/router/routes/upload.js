const TelegramBot = require('node-telegram-bot-api');
let express = require('express');
let fs = require('fs');

// replace the value below with the Telegram token you receive from @BotFather


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
	polling: true
});

bot.sendMessage(process.env.CHAT_ID, 'Up and running 🏄🏼‍♂️');

// TODO: choose one or more
//let GPhotos = require('upload-gphotos');
//let twitter = require('twitter');

let router = express.Router();

//
// function to create file from base64 encoded string
function base64_decode(base64str, file) {
	// create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
	var bitmap = new Buffer(base64str, 'base64');
	// write buffer to file
	fs.writeFileSync(file, bitmap);
	console.log('******** File created from base64 encoded string ********');
}

//
//
//
router.post('/', function (req, res) {

	console.log("TODO: Got req:" + req);

	if (req.body.isTestMode === 'true') {
		console.log('Success (test mode)');
		res.status(200).send();
	} else {
		console.log("** dataURI: " + req.body.dataURL.substring(0, 200));
		bot.sendMessage(process.env.CHAT_ID, 'Got some movment 💡');
		let base64Image = req.body.dataURL;
		base64_decode(base64Image, 'temp-image.png');
		bot.sendPhoto(process.env.CHAT_ID, 'temp-image.png');
	}
});

module.exports = router;