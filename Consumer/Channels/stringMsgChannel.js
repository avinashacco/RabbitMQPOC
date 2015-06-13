#!/usr/bin/env node
var amqp = require('amqplib');

exports.registerChannel = function (url) {
  amqp.connect(url).then(function (conn) {
    process.once('SIGINT', function () { conn.close(); });
    return conn.createChannel().then(function (ch) {
      var helloChannel = ch.assertQueue('message', { durable: false });
      helloChannel = helloChannel.then(function (_qok) {
        return ch.consume('hello', function (msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
        }, { noAck: true });
      });
      return helloChannel.then(function (_consumeOk) {
        console.log(' Message CHANNEL STARTED!  Waiting for messages. To exit press CTRL+C');
      });
    });
  }).then(null, console.warn);
};