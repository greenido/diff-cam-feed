/**
 * @Author: Ido
 * @Date: Sep 2018
 * @see https://core.telegram.org/bots/api/#message
 * 		https://github.com/yagop/node-telegram-bot-api/
 * 
 */
const TelegramBot = require('node-telegram-bot-api');
let express = require('express');
let fs = require('fs');


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
	polling: true
});
//bot.sendMessage(process.env.CHAT_ID, 'Up and running 🏄🏼‍♂️');

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Starting the monitoring");
	fs.writeFileSync("status.txt", "Go");
});

bot.onText(/\/stop/, (msg) => {
	bot.sendMessage(msg.chat.id, "Stoping the monitoring");
	fs.writeFileSync("status.txt", "Stop");
});

//
//
bot.on('message', (msg) => {
	var helpMsg = "help";
	if (msg.text.toString().toLowerCase().indexOf(helpMsg) === 0) {
		bot.sendMessage(msg.chat.id, "Hey - Here are the options", {
			"reply_markup": {
				"keyboard": [
					["/start", "/stop"],
					["status"],
					["help"]
				]
			}
		});
	}

	if (msg.text.toString().toLowerCase().includes("status")) {
		bot.sendMessage(msg.chat.id, 'Up and running 🏄🏼‍♂️');
	}
	var bye = "bye";
	if (msg.text.toString().toLowerCase().includes(bye)) {
		bot.sendMessage(msg.chat.id, "Bye bye");
	}
});

let router = express.Router();

//
// Util function to create file from base64 encoded string
//
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
	if (req.body.isTestMode === 'true') {
		console.log('Success (test mode)');
		res.status(200).send();
	} else {
		console.log("** Got a new dataURI: " + req.body.dataURL.substring(0, 50));
		bot.sendMessage(process.env.CHAT_ID, 'Got some movment 💡');
		let base64Image = req.body.dataURL;
		base64_decode(base64Image, 'temp-image.png');
		bot.sendPhoto(process.env.CHAT_ID, 'temp-image.png');
	}
});

module.exports = router;