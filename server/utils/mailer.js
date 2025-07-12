const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'pmsss1728@gmail.com',
		pass: 'plesguwkzzfsgfde',
	},
});

async function sendApprovalEmail(email, name, password) {
	const mailOptions = {
		from: `"Tasya Admin" <${process.env.MAIL_USER}>`, // Sender address
		to: email, // Recipient address
		subject: 'Service Provider Approved - Login Credentials',
		html: `
      <p>Dear <strong>${name}</strong>,</p>
      <p>Congratulations! Your account has been approved as a Service Provider.</p>
      <p>You can now log in using the credentials below:</p>
      <ul>
        <li><strong>Username:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>It is recommended to change your password after first login.</p>
      <br>
      <p>Regards,<br>Tasya Admin Team</p>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error('Failed to send approval email:', error);
	}
}

async function sendRejectionEmail(email, name, reason) {
	const mailOptions = {
		from: `"Tasya Admin" <${process.env.MAIL_USER}>`,
		to: email,
		subject: 'Service Provider Application Rejected',
		html: `
      <p>Dear <strong>${name}</strong>,</p>
      <p>We regret to inform you that your application as a Service Provider has been rejected.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>You may contact our support team for more information or to re-apply.</p>
      <br>
      <p>Regards,<br>Tasya Admin Team</p>
    `,
	};

	await transporter.sendMail(mailOptions);
}

module.exports = {
	sendApprovalEmail,
	sendRejectionEmail,
};
