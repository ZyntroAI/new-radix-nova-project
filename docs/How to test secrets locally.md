/Show me how to test secrets locally

To test Supabase secrets locally, load a test-only environment file with **`--env-file`** and call a function that checks whether the variables exist. This does not upload anything to production.[1]

## 1. Create your local secrets file

From your project root, create `.env.local`:

```dotenv
PAYMENT_API_KEY=local-test-key
WEBHOOK_SECRET=local-test-webhook-secret
```

Add it to `.gitignore`:

```gitignore
.env.local
```

These dummy values test secret loading—not whether an external provider accepts the credentials.

## 2. Add a diagnostic function

If you have not created it yet:

```bash
supabase functions new check-secrets
```

Put this in `supabase/functions/check-secrets/index.ts`:

```typescript
Deno.serve(() => {
  const required = [
    "PAYMENT_API_KEY",
    "WEBHOOK_SECRET",
  ];

  const missing = required.filter(
    (name) => !Deno.env.get(name)?.trim(),
  );

  return Response.json(
    {
      ok: missing.length === 0,
      missing,
    },
    {
      status: missing.length === 0 ? 200 : 500,
    },
  );
});
```

This returns missing variable names, never their values.

## 3. Serve it locally

With Docker running, run these commands from your project root:

```bash
supabase start

supabase functions serve check-secrets \
  --env-file .env.local \
  --no-verify-jwt
```

`--env-file` populates the function environment. `--no-verify-jwt` disables JWT verification so this local diagnostic endpoint can be called without an authorization header; keep this bypass limited to local testing.[1]

## 4. Test success and failure

In another terminal:

```bash
curl -i \
  http://127.0.0.1:54321/functions/v1/check-secrets
```

With both variables set, the handler returns HTTP 200:

```json
{
  "ok": true,
  "missing": []
}
```

Now empty one value in `.env.local`:

```dotenv
PAYMENT_API_KEY=local-test-key
WEBHOOK_SECRET=
```

Stop the serving process with Ctrl+C and restart the same `functions serve` command. Calling the endpoint again should return HTTP 500:

```json
{
  "ok": false,
  "missing": ["WEBHOOK_SECRET"]
}
```

## If a variable is still missing

- Run the command from the directory containing `.env.local`, or provide its correct path.
- Match variable names exactly, including capitalization.
- Restart `functions serve` after changing the file.
- Use `functions serve --env-file` for local testing. `secrets set --env-file` updates a hosted project instead.[1]

Remove this diagnostic function before deployment unless you intentionally need it. Never return or log secret values.

การอ้างอิง:
[1] supabase.com › docs › referenceCLI Reference | Supabase Docs https://supabase.com/docs/reference/cli/supabase-secrets
[2] Transcription Telegram Bot | Supabase Docs https://supabase.com/docs/guides/functions/examples/elevenlabs-transcribe-speech
[3] Custom Auth Emails with React Email and Resend https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend
[4] Streaming Speech with ElevenLabs - Edge Functions https://supabase.com/docs/guides/functions/examples/elevenlabs-generate-speech-stream
