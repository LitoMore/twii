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

	getAuthorization(url, method, data) {
		const o = oauth({
			consumer: {key: this.consumerKey, secret: this.consumerSecret},
			signature_method: 'HMAC-SHA1',
			hash_function: (baseString, key) => {
				return crypto.createHmac('sha1', key).update(baseString).digest('base64');
			}
		});
		const token = {key: this.accessToken, secret: this.accessTokenSecret};
		const opt = {url, method};
		if (data) {
			opt.data = data;
		}
		const {Authorization} = o.toHeader(o.authorize(opt, token));
		return Authorization;
	}

	get(uri, params) {
		const query = queryString.stringify(params);
		const url = `${this.baseUrl}${uri}.json${query ? `?${query}` : ''}`;
		const Authorization = this.getAuthorization(url, 'GET');
		return got.get(url, {
			headers: {
				Authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			json: true
		});
	}

	post(uri, params) {
		const url = `${this.baseUrl}${uri}.json`;
		const Authorization = this.getAuthorization(url, 'POST', params);
		return got.post(url, {
			headers: {
				Authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: queryString.stringify(params)
		});
	}
}

module.exports = Twii;
