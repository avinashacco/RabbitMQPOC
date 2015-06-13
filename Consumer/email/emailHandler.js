var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
    sendEmail: function (info) {
        var emailConfig = {
          user: "ezhire.info@accolite.com",
          clientId: "145148843209-nsegq60u23dsqiquh8kjtd2c5secc73n.apps.googleusercontent.com",
          clientSecret: "lV5_mni9R80yV8WJ_BziqjAY",
          refreshToken: "1/r9vftK7C6D8ceQhbpu0QXBPF4mpTELxOOs1XQwhNGdwMEudVrK5jSpoR30zcRFq6",
        };
        if (!info) { return; }
        info.html = info.body;
        var generator = require('xoauth2').createXOAuth2Generator(emailConfig);
        var transport = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                xoauth2: generator
            }
        }))
        transport.sendMail(info, function (error, response) {
            if (error) {
                console.log(error);
            } else {
        console.log(response);
            }
            transport.close();
        });
    }
}