import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/services/auth-service';
import { verifyRecaptcha } from '@/lib/services/recaptcha-service';

export async function POST(request: Request) {
  try {
    const { name, email, password, recaptchaToken } = await request.json();

    // ─── reCAPTCHA Verification ───
    if (!recaptchaToken) {
      return NextResponse.json({ error: 'reCAPTCHA required' }, { status: 400 });
    }

    const captcha = await verifyRecaptcha(recaptchaToken, 'register');
    if (!captcha.passes) {
      return NextResponse.json(
        { error: 'Security check failed — please try again', score: captcha.score },
        { status: 403 }
      );
    }

    // ─── Existing validation & registration ───
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const user = await registerUser({ name, email, password });
    return NextResponse.json({ success: true, user, score: captcha.score }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
