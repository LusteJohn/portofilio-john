import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
    })

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})