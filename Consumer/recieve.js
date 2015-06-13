#!/usr/bin/env node

var emailChannel = require('./Channels/emailChannel');
var stringMsgChannel = require('./Channels/stringMsgChannel');

var url = 'amqp://localhost';

emailChannel.registerChannel(url);
stringMsgChannel.registerChannel(url);
