import { NextRequest, NextResponse } from 'next/server'

// Email service configuration
// You can use Resend, SendGrid, Nodemailer, or any other email service
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@simplewebtoolsbox.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

// Send email using Resend (recommended)
async function sendEmailWithResend(name: string, email: string, subject: string, message: string) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(RESEND_API_KEY)

  const emailSubject = subject === 'other' 
    ? `Contact Form: ${subject}` 
    : `Contact Form: ${subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, ' ')}`

  const result = await resend.emails.send({
    from: `SimpleWebToolsBox <noreply@simplewebtoolsbox.com>`,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: emailSubject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong style="color: #334155;">Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #334155;">Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #334155;">Subject:</strong> ${subject}</p>
        </div>
        <div style="background: #ffffff; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #334155;">Message:</strong></p>
          <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
          This email was sent from the contact form on SimpleWebToolsBox.com
        </p>
      </div>
    `,
  })

    return result
  } catch (error: any) {
    if (error.message?.includes('Cannot find module')) {
      throw new Error('Resend package not installed. Run: npm install resend')
    }
    throw error
  }
}

// Send email using SendGrid
async function sendEmailWithSendGrid(name: string, email: string, subject: string, message: string) {
  if (!SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not configured')
  }

  try {
    const sgMail = await import('@sendgrid/mail')
    sgMail.default.setApiKey(SENDGRID_API_KEY)

  const msg = {
    to: CONTACT_EMAIL,
    from: 'noreply@simplewebtoolsbox.com',
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  }

    await sgMail.default.send(msg)
  } catch (error: any) {
    if (error.message?.includes('Cannot find module')) {
      throw new Error('SendGrid package not installed. Run: npm install @sendgrid/mail')
    }
    throw error
  }
}

// Send email using Nodemailer (SMTP)
async function sendEmailWithSMTP(name: string, email: string, subject: string, message: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is incomplete')
  }

  try {
    const nodemailer = await import('nodemailer')
  
  const transporter = nodemailer.default.createTransport({
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"SimpleWebToolsBox" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    })
  } catch (error: any) {
    if (error.message?.includes('Cannot find module')) {
      throw new Error('Nodemailer package not installed. Run: npm install nodemailer')
    }
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Basic spam protection - check message length
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message is too short' },
        { status: 400 }
      )
    }

    // Rate limiting - simple check (in production, use Redis or similar)
    // This is a basic implementation - consider using a proper rate limiting library

    // Try to send email using configured service
    let emailSent = false
    let emailError = null

    try {
      if (RESEND_API_KEY) {
        await sendEmailWithResend(name, email, subject, message)
        emailSent = true
      } else if (SENDGRID_API_KEY) {
        await sendEmailWithSendGrid(name, email, subject, message)
        emailSent = true
      } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        await sendEmailWithSMTP(name, email, subject, message)
        emailSent = true
      }
    } catch (error: any) {
      console.error('Email sending error:', error)
      emailError = error.message
      // Continue to log the submission even if email fails
    }

    // Log submission (always log, even if email fails)
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
      emailSent,
      emailError,
    })

    // If email was sent successfully, return success
    if (emailSent) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for your message! We will get back to you within 24-48 hours.' 
        },
        { status: 200 }
      )
    }

    // If no email service is configured, still return success but log warning
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ No email service configured. Submission logged but no email sent.')
    }

    // In development or if email fails, still return success (form works, email is optional)
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    )
  }
}
