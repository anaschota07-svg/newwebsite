import { NextRequest, NextResponse } from 'next/server'

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

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message is too short (minimum 10 characters)' },
        { status: 400 }
      )
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your full name' },
        { status: 400 }
      )
    }

    // Log the submission (visible in Vercel function logs)
    console.log('📧 Contact form submission received:', {
      name: name.trim(),
      email: email.trim(),
      subject,
      messagePreview: message.substring(0, 100),
      timestamp: new Date().toISOString(),
    })

    // Return success — to enable email delivery, add RESEND_API_KEY to your
    // Vercel environment variables and install the resend package: npm install resend
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you within 24-48 hours.",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    )
  }
}
