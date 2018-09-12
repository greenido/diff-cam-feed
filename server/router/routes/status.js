/**
 * @Author: Ido
 * @Date: Sep 2018
 * @see https://core.telegram.org/bots/api/#message
 * 		https://github.com/yagop/node-telegram-bot-api/
 * 
 */
let express = require('express');
let fs = require('fs');
let router = express.Router();

//
//
//
router.get('/', function (req, res) {
	console.log("status req");
	fs.readFile('status.txt', 'utf8', function (err, data) {
		if (err) {
			console.log("Issue reading the status file: status.txt Err: " + JSON.stringify(err));
		}
		console.log("The current status: " + data);
		res.send(data);
	});
});

module.exports = router;