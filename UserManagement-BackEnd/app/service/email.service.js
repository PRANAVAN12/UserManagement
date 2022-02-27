const nodemailer = require('nodemailer');
const siteSettingService = require('./setting/siteSetting');

module.exports.senResetPasswordLink = async (email, resetLink, res) => {
    try {
        const emailSettings = await siteSettingService.handle();
        if (emailSettings && emailSettings.default_email && emailSettings.default_password) {
            let transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailSettings.default_email,
                    pass: emailSettings.default_password // naturally, replace both with your real credentials or an application-specific password
                }
            });
            console.log('SMTP Configured');
            // set message
            const message = {
                // sender info
                from: emailSettings.default_email,
                // Comma separated list of recipients
                to: email,
                // Subject of the message
                subject: 'Reset password link',
                // plaintext body
                text: 'Hello to myself!',
                // HTML body
                html: '<p><b>Hi</b> This is he test mail notification <a href="' + resetLink + '">click to reset password</a> </p>',
            };
            // send email
            // send email
            const response = await transport.sendMail(message);
            if (response.accepted) {
                return Promise.resolve(true)
            } else {
                return Promise.resolve(false)
            }
        } else {
            return Promise.resolve(false)
        }
    } catch (error) {
        return Promise.resolve(false)
    }
}


module.exports.notifyNewUserWithTemporaryPassword = async (user, tempPassword, res) => {
    try {
        const emailSettings = await siteSettingService.handle();
        let url = `${emailSettings.url}/login`
        if (emailSettings && emailSettings.default_email && emailSettings.default_password) {
            let transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: emailSettings.default_email,
                    pass: emailSettings.default_password // naturally, replace both with your real credentials or an application-specific password
                }
            });
            console.log('SMTP Configured', tempPassword);
            // set message
            const message = {
                // sender info
                from: emailSettings.default_email,
                // Comma separated list of recipients
                to: user.email,
                // Subject of the message
                subject: 'New User Notification',
                // plaintext body
                text: 'Hi ' + user.first_name + ' ' + user.last_name,
                // HTML body
                html: '<div><div><p><b>Hi </b><div> Welcome to POS <a href="'+ url +'">click here to go to the POS</a> </p></div></div><div>Username - ' + user.username + '</div><div>Password - ' + tempPassword + '</div></div>',
            };
            // send email
            const response = await transport.sendMail(message);
            if (response.accepted) {
                return Promise.resolve(true)
            } else {
                return Promise.resolve(false)
            }
        } else {
            return Promise.resolve(false)
        }
    } catch (error) {
        return Promise.resolve(false)
    }
}
