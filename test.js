'use strict';

const Twii = require('.');

const {
	TWITTER_CONSUMER_KEY: consumerKey,
	TWITTER_CONSUMER_SECRET: consumerSecret,
	TWITTER_ACCESS_TOKEN: accessToken,
	TWITTER_ACCESS_TOKEN_SECRET: accessTokenSecret
} = process.env;

const t = new Twii({
	consumerKey,
	consumerSecret,
	accessToken,
	accessTokenSecret
});

(async () => {
	try {
		console.log(await t.get('statuses/home_timeline'));
	} catch (error) {
		console.log(error);
	}
})();
