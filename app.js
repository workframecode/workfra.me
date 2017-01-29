var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request');

var config = require('./server/config.json');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
	res.sendFile('index.htm', {root: __dirname + '/public'});
});
app.post('/recaptcha', function(req, res) {
	request({
		url: 'https://www.google.com/recaptcha/api/siteverify',
		method: 'POST',
		form: {
			secret: config.recaptcha.secret,
			response: req.body.response,
			remoteip: req.headers['x-forwarded-for']
		}
	}, function(err, resp, body) {
		console.log('ERR', err)
		console.log('RESP', resp.statusCode)
		console.log('BODY', body)
	});
});

app.listen(8000);
