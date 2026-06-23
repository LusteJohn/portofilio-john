import nodemailer from 'nodemailer'

export const config = {
  api: {
    bodyParser: true
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
    })

    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email send failed:', error)
    res.status(500).json({ error: error.message || 'Failed to send email' })
  }
}