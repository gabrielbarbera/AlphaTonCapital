import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === 'production') {
  console.error('RESEND_API_KEY is required for production');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (email.length > 255) {
      return NextResponse.json(
        { error: 'Email length exceeds maximum allowed' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'AlphaTON Capital <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to AlphaTON Capital Newsletter',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You've successfully subscribed to the AlphaTON Capital newsletter.</p>
        <p>We'll keep you updated with the latest news and updates about our company.</p>
      `,
      text: `
        Thank you for subscribing!
        
        You've successfully subscribed to the AlphaTON Capital newsletter.
        We'll keep you updated with the latest news and updates about our company.
      `,
    });

    const { data: adminData, error: adminError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'AlphaTON Capital <onboarding@resend.dev>',
      to: process.env.RESEND_TO_EMAIL || 'info@alphatoncapital.com',
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
      text: `
        New Newsletter Subscription
        
        Email: ${email}
      `,
    });

    if (confirmationError || adminError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend error:', confirmationError || adminError);
      }
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: confirmationData?.id },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

