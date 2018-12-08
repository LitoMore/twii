# Twii

[![](https://badges.greenkeeper.io/LitoMore/twii.svg)](https://greenkeeper.io/)
[![](https://img.shields.io/travis/LitoMore/twii/master.svg)](https://travis-ci.org/LitoMore/twii)
[![](https://img.shields.io/npm/v/twii.svg)](https://www.npmjs.com/package/twii)
[![](https://img.shields.io/npm/l/twii.svg)](https://github.com/LitoMore/twii/blob/master/LICENSE)
[![](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Twitter SDK for Node.js

## Install

```bash
$ npm install twii
```

## Usage

```javascript
const T = require('Twii');

const t = new T({
	consumerKey: '',
	consumerSecret: '',
	accessToken: '',
	accessTokenSecret: ''
});
```

## API

```javascript
t.get(uri, params);
t.post(uri, params);
```

**Example**

```javascript
(async () => {
	// GET
	const getResponse = await t.get('statuses/home_timeine', {count: 5});
	console.log(getResponse.body);

	// POST
	const postResponse = await t.post('statuses/update', {status: 'Hi LitoMore'});
	console.log(postReponse.body);
})();
```

## Related

- [got](https://github.com/sindresorhus/got) - Simplified HTTP requests

## License

MIT © [LitoMore](https://github.com/LitoMore)
