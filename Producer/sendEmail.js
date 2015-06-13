#!/usr/bin/env node

var amqp = require('amqplib');
var when = require('when');

amqp.connect('amqp://localhost').then(function (conn) {
  return when(conn.createChannel().then(function (ch) {
    
    var q = 'email';
    
    var msg = {
      to: 'vundyala.avinash@gmail.com',
      from: 'vundyala.avinash@gmail.com',
      subject: 'Test email',
      body: 'Sample from email Service'
    };

    var ok = ch.assertQueue(q, { durable: false });

    return ok.then(function (_qok) {
      ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
      console.log(" [x] Sent '%s'", msg);
      return ch.close();
    });
  })).ensure(function () { conn.close(); });;
}).then(null, console.warn);