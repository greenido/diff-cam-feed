var express = require('express');
var twitter = require('twitter');

var router = express.Router();

router.post('/', function(req, res) {
	var client = new twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: req.user.tokenKey,
		access_token_secret: req.user.tokenSecret
	});

	var mediaUpload = {
		media_data: req.body.dataURL
	};
	client.post('media/upload', mediaUpload, function(error, media, response) {
		if (error) {
			console.log('Error uploading media:', error);
		} else {
			var statusUpdate = {
				status: 'Score: ' + req.body.score,
				media_ids: media.media_id_string
			};
			client.post('statuses/update', statusUpdate, function(error, tweet, response) {
				if (error) {
					console.log('Error updating status:', error);
					res.status(500).send({ error: error });
				} else {
					console.log('Status update successful');
					res.status(200).send();
				}
			});
		}
	});
});

module.exports = router;
