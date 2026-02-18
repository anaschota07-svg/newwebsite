# Contact Form Setup Guide

The contact form is now fully functional with backend API support and email integration.

## Features

- ✅ Form validation (client-side and server-side)
- ✅ Axios-based API calls with error handling
- ✅ Support for external backend API or Next.js API route
- ✅ Email sending via Resend, SendGrid, or SMTP
- ✅ Better error messages and user feedback
- ✅ Spam protection

## Configuration

### Option 1: Use Next.js API Route (Default)

The form will use `/api/contact` by default. No additional configuration needed for basic functionality.

### Option 2: Use External Backend API

Set the `NEXT_PUBLIC_API_BASE_URL` environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.zap2link.com
```

The form will automatically use `${API_BASE_URL}/api/contact` instead of the Next.js route.

## Email Setup

To enable email sending, choose ONE of the following options:

### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Install the package:
   ```bash
   npm install resend
   ```
4. Add to `.env`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   CONTACT_EMAIL=contact@simplewebtoolsbox.com
   ```

### Option 2: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Install the package:
   ```bash
   npm install @sendgrid/mail
   ```
4. Add to `.env`:
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   CONTACT_EMAIL=contact@simplewebtoolsbox.com
   ```

### Option 3: SMTP (Nodemailer)

1. Install the package:
   ```bash
   npm install nodemailer
   ```
2. Add to `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=contact@simplewebtoolsbox.com
   ```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration (optional)
NEXT_PUBLIC_API_BASE_URL=https://api.zap2link.com

# Contact Email (required if using email)
CONTACT_EMAIL=contact@simplewebtoolsbox.com

# Choose ONE email service:
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# OR SendGrid
# SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# OR SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

## How It Works

1. **Form Submission**: User fills out the contact form
2. **Validation**: Client-side and server-side validation
3. **API Call**: Form data is sent to either:
   - External API: `${NEXT_PUBLIC_API_BASE_URL}/api/contact`
   - Next.js API: `/api/contact`
4. **Email Sending**: If configured, an email is sent to `CONTACT_EMAIL`
5. **Response**: User receives success/error feedback

## Testing

1. **Without Email Service**: Form will still work and log submissions to console
2. **With Email Service**: Form will send emails when submissions are received
3. **Error Handling**: Network errors, validation errors, and email errors are all handled gracefully

## Troubleshooting

### "Backend API is not configured"
- In production, set `NEXT_PUBLIC_API_BASE_URL` or the form will use Next.js API route
- In development, this warning is ignored

### "Email service not configured"
- Install the email package you want to use
- Add the corresponding API key/credentials to `.env.local`
- Restart the development server

### Emails not sending
- Check that the API key/credentials are correct
- Verify the email service account is active
- Check server logs for error messages
- Ensure `CONTACT_EMAIL` is set correctly

## Notes

- The form works even without email configuration (submissions are logged)
- Email packages are dynamically imported (only loaded if configured)
- All submissions are logged to the console for debugging
- The form includes spam protection (minimum message length)
