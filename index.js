'use strict';

const crypto = require('crypto');
const got = require('got');
const oauth = require('oauth-1.0a');
const queryString = require('query-string');

class Twii {
	constructor(opt) {
		const {
			consumerKey,
			consumerSecret,
			accessToken,
			accessTokenSecret,
			baseUrl = 'https://api.twitter.com/1.1/'
		} = opt;

		this.consumerKey = consumerKey;
		this.consumerSecret = consumerSecret;
		this.accessToken = accessToken;
		this.accessTokenSecret = accessTokenSecret;
		this.baseUrl = baseUrl;
	}

	getOAuthHeader(url, method, data) {
		const o = oauth({
			consumer: {key: this.consumerKey, secret: this.consumerSecret},
			signature_method: 'HMAC_SHA1',
			hash_function: (baseString, key) => {
				console.log(baseString);
				return crypto.createHmac('sha1', key).update(baseString).digest('base64');
			}
		});
		const token = {key: this.accessToken, secret: this.accessTokenSecret};
		const opt = {url, method};
		if (data) {
			opt.data = data;
		}
		console.log(o.toHeader(o.authorize(opt, token)));
		return o.toHeader(o.authorize(opt, token));
	}

	get(uri, params) {
		console.log(this);
		const query = queryString.stringify(params);
		const url = `${this.baseUrl}${uri}.json${query ? `?${query}` : ''}`;
		console.log(url);
		return got.get(url, {headers: this.getOAuthHeader(url, 'GET'), json: true});
	}
}

module.exports = Twii;
