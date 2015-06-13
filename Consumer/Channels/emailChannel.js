#!/usr/bin/env node

var amqp = require('amqplib');
var mailService = require('../email/emailHandler');

exports.registerChannel = function (url) {
	amqp.connect(url).then(function (conn) {
		process.once('SIGINT', function () { conn.close(); });
		return conn.createChannel().then(function (ch) {
			var emailChannel = ch.assertQueue('email', { durable: false });
			emailChannel = emailChannel.then(function (_qok) {
				return ch.consume('email', function (msg) {
					var emailRequest  =  JSON.parse(msg.content.toString());
					
					mailService.sendEmail(emailRequest);
					
					console.log(" Received '%s'", msg.content.toString());
					
				}, { noAck: true });
			});
			return emailChannel.then(function (_consumeOk) {
				console.log(' EMAIL CHANNEL STARTED! Waiting for messages. To exit press CTRL+C');
			});
		});
	}).then(null, console.warn);
};