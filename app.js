var express = require('express'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport'),
	request = require('request');

var config = require('../configurations/workfra.me.config.json');

var mailer = nodemailer.createTransport(smtpTransport({
	host: config.mailer.host,
	port: config.mailer.port,
	secure: true,
	auth: {
		user: config.mailer.username,
		pass: config.mailer.password
	}
}));
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function (req, res) {
	res.sendFile('index.htm', { root: __dirname + '/public' });
});

app.get('/imagebg', function (req, res) {
	fs.readdir('public/assets/images/posters/', function(err, files) {
		if (err) {
			return res.status(400).send({error: true, msg: "Error while getting posters for background image"});
		}
		res.sendFile(files[Math.floor(Math.random() * files.length)], { root: __dirname + '/public/assets/images/posters' });
	});
});

app.post('/slackinviterecaptcha', function(req, res) {
	if (req.body.response) {
		request({
			url: 'https://www.google.com/recaptcha/api/siteverify',
			method: 'POST',
			form: {
				secret: config.recaptcha.secret,
				response: req.body.response,
				remoteip: req.headers['x-forwarded-for']
			}
		}, function (err, resp, body) {
			if (err) {
				res.status(200).send({
					success: false,
					errormsg: "Could not connect to recaptcha API",
					nofix: true
				});
			} else if (resp.statusCode != 200) {
				res.status(200).send({
					success: false,
					errormsg: "Recaptcha API returned status " + resp.statusCode,
					nofix: true
				});
			} else if (!body) {
				res.status(200).send({
					success: false,
					errormsg: "Recaptcha API gave an empty response",
					nofix: true
				});
			// Got a valid response, fork validation one level deeper now
			} else {
				body = JSON.parse(body);
				if (!body.success) {
					res.status(200).send({
						success: false,
						errormsg: "You did not pass the captcha challenge. Try again",
						nofix: false
					});
				} else if (!req.body.email) {
					res.status(200).send({
						success: false,
						errormsg: "Email is a required field",
						nofix: false
					});
				} else if (req.body.email.length < 2 || req.body.email.length > 64 || (!(/\S+@\S+\.\S+/).test(req.body.email))) {
					res.status(200).send({
						success: false,
						errormsg: "Email field does not meet validation criteria. Please use the website to send this request",
						nofix: true
					});
				// Yes, I know this is bad practice and no, I don't care.
				} else if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(req.body.email)) {
					res.status(200).send({
						success: false,
						errormsg: "You have a really weird email. Please try again with something that looks more like it's from this planet",
						nofix: false
					});
				} else if (config.junkMailProviders.indexOf(req.body.email.split('@').slice(1).join('@')) != -1) {
					res.status(200).send({
						success: false,
						errormsg: "That mail provider is a known public mailbox service. Please use your actual email. We promise not to spam you or do anything else malicious with it. Pinky swear.",
						nofix: false
					});
				} else {
					request({
						url: 'https://slack.com/api/users.admin.invite',
						method: 'GET',
						qs: {
							token: config.slackAPI.token,
							email: req.body.email,
							channels: config.slackAPI.channels
						}
					}, function (err, resp, body) {
						if (err) {
							res.status(200).send({
								success: false,
								errormsg: "Could not connect to slack API",
								nofix: true
							});
						} else if (resp.statusCode != 200) {
							res.status(200).send({
								success: false,
								errormsg: "Slack API returned status " + resp.statusCode,
								nofix: true
							});
						} else if (!body) {
							res.status(200).send({
								success: false,
								errormsg: "Slack API gave an empty response",
								nofix: true
							});
						// Got a valid response, fork validation one level deeper now
						} else {
							body = JSON.parse(body);
							if (!body.ok) {
								res.status(200).send({
									success: false,
									errormsg: "We could not send you an invite. The email you've entered may have been blacklisted or already invited previously.",
									nofix: false
								});
							} else {
								res.status(200).send({
									success: true
								});
							}
						}
					});
				}
			}
		});
	} else {
		res.status(200).send({
			success: false,
			errormsg: "No recaptcha response received. You cannot view this directly with a browser or similar client",
			nofix: true
		});
	}
});

// Why so much validation? Because I know some smartasses won't mind wasting time breaking into this.
app.post('/contactformrecaptcha', function (req, res) {
	if (req.body.response) {
		request({
			url: 'https://www.google.com/recaptcha/api/siteverify',
			method: 'POST',
			form: {
				secret: config.recaptcha.secret,
				response: req.body.response,
				remoteip: req.headers['x-forwarded-for']
			}
		}, function (err, resp, body) {
			if (err) {
				res.status(200).send({
					success: false,
					errormsg: "Could not connect to recaptcha API",
					nofix: true
				});
			} else if (resp.statusCode != 200) {
				res.status(200).send({
					success: false,
					errormsg: "Recaptcha API returned status " + resp.statusCode,
					nofix: true
				});
			} else if (!body) {
				res.status(200).send({
					success: false,
					errormsg: "Recaptcha API gave an empty response",
					nofix: true
				});
			// Got a valid response, fork validation one level deeper now
			} else {
				body = JSON.parse(body);
				if (!body.success) {
					res.status(200).send({
						success: false,
						errormsg: "You did not pass the captcha challenge. Try again",
						nofix: false
					});
				} else if (!req.body.name) {
					res.status(200).send({
						success: false,
						errormsg: "Name is a required field",
						nofix: false
					});
				} else if (req.body.name.length < 5 || req.body.name.length > 64 || (!(/^[a-zA-Z ]+$/).test(req.body.name))) {
					res.status(200).send({
						success: false,
						errormsg: "Name field does not meet validation criteria. Please use the website to send this request",
						nofix: true
					});
				} else if (!req.body.email) {
					res.status(200).send({
						success: false,
						errormsg: "Email is a required field",
						nofix: false
					});
				} else if (req.body.email.length < 2 || req.body.email.length > 64 || (!(/\S+@\S+\.\S+/).test(req.body.email))) {
					res.status(200).send({
						success: false,
						errormsg: "Email field does not meet validation criteria. Please use the website to send this request",
						nofix: true
					});
				// Yes, I know this is bad practice and no, I don't care.
				} else if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(req.body.email)) {
					res.status(200).send({
						success: false,
						errormsg: "You have a really weird email. Please try again with something that looks more like it's from this planet",
						nofix: false
					});
				} else if (config.junkMailProviders.indexOf(req.body.email.split('@').slice(1).join('@')) != -1) {
					res.status(200).send({
						success: false,
						errormsg: "That mail provider is a known public mailbox service. Please use your actual email. We promise not to spam you or do anything else malicious with it. Pinky swear.",
						nofix: false
					});
				} else if (!req.body.college) {
					res.status(200).send({
						success: false,
						errormsg: "College is a required field",
						nofix: false
					});
				} else if (req.body.college.length < 1 || req.body.college.length > 128) {
					res.status(200).send({
						success: false,
						errormsg: "College field does not meet validation criteria. Please use the website to send this request",
						nofix: true
					});
				} else if (!req.body.message) {
					res.status(200).send({
						success: false,
						errormsg: "Message is a required field",
						nofix: false
					});
				} else if (req.body.message.length < 1 || req.body.message.length > 512) {
					res.status(200).send({
						success: false,
						errormsg: "Message field does not meet validation criteria. Please use the website to send this request",
						nofix: true
					});
				} else {
					mailer.sendMail({
						from: '"Mailer Daemon" <mailer@workfra.me>',
						to: 'hello@workfra.me',
						replyTo: 'hello@workfra.me, ' + req.body.email,
						subject: 'Contact Form Submission',
						html: 'Name: ' + req.body.name + '<br />College: ' + req.body.college + '<br />Email: ' + req.body.email + '<br /><br />' + req.body.message.replace(/\n/g, "<br />")
					}, function(err) {
						if (err) {
							res.status(200).send({
								success: false,
								errormsg: "Could not send an email to the guys at WorkFrame. Error: " + err.message,
								nofix: true
							});
						} else {
							res.status(200).send({
								success: true
							});
						}
					})
				}
			}
		});
	} else {
		res.status(200).send({
			success: false,
			errormsg: "No recaptcha response received. You cannot view this directly with a browser or similar client",
			nofix: true
		});
	}
});

app.listen(8000);
