const nodemailer = require('nodemailer')

class EmailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})
	}

	async sendActivationEmail(emailTo, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: emailTo,
			subject: `Account activation on ${process.env.API_URL}`,
			text: '',
			html: `
                <div>
                    <h1>For activation follow the <a href="${link}">link</a></h1>
                </div>
            `
		})
	}
}

module.exports = new EmailService()
