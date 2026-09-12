const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;

export async function verifyRecaptcha(token: string, expectedAction?: string) => {
  if (!SECRET_KEY) {
    console.warn('⚠️ RECAPTCHA_SECRET_KEY not set — skipping verification');
    return { success: true, score: 1.0, action: 'dev' };
  }

  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: SECRET_KEY,
      response: token,
    }),
  });

  const result = await res.json();

  return {
    success: result.success === true,
    score: result.score ?? 0, // 0.0 = bot, 1.0 = human
    action: result.action ?? null,
    challengeTimestamp: result.challenge_ts,
    hostname: result.hostname,
    // Minimum score threshold: 0.5
    passes: result.success === true && result.score >= 0.5 && (!expectedAction || result.action === expectedAction),
  };
}
