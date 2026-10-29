How do I set secrets in production

Set production Supabase Edge Function secrets through the **Dashboard** or the Supabase CLI—not through your local `config.toml`. Hosted functions receive them as environment variables, and changing secret values does not require redeploying the functions.[1]

## Option 1: Use the Dashboard

1. Open your production Supabase project.
2. Navigate to Edge Functions → Secrets.
3. Add each secret’s name and value, for example:
   - `PAYMENT_API_KEY`
   - `WEBHOOK_SECRET`
4. Save your changes.

Confirm you selected the production project before saving. Supabase supports adding multiple secrets on the secrets-management page.[1]

## Option 2: Use the CLI

### 1. Authenticate and identify the production project

```bash
supabase login
```

Find the production project reference ID in Settings → General. Use `--project-ref` explicitly in the following commands to avoid accidentally updating a development project.[2][3]

### 2. Create a local secrets file

Create `.env.production.local`:

```dotenv
PAYMENT_API_KEY=replace-with-your-production-api-key
WEBHOOK_SECRET=replace-with-your-production-webhook-secret
```

Add it to `.gitignore` before adding real values:

```gitignore
.env.production.local
```

Do not commit this file. Supabase recommends keeping secret environment files out of Git.[1]

### 3. Upload the secrets

From the directory containing the file, run:

```bash
supabase secrets set \
  --env-file .env.production.local \
  --project-ref YOUR_PRODUCTION_PROJECT_REF
```

This stores the secrets in the remote project; it does not upload your `.env` file as part of the function source. The CLI supports both `--env-file` and `--project-ref`.[1][3]

### 4. Confirm the configured secrets

```bash
supabase secrets list \
  --project-ref YOUR_PRODUCTION_PROJECT_REF
```

Use this to confirm that the expected secret names exist. Do not print secret values from your function to verify them.[1]

## Read secrets in your function

Your production code uses the same access pattern as local development:

```typescript
Deno.serve(async () => {
  const apiKey = Deno.env.get("PAYMENT_API_KEY");

  if (!apiKey) {
    console.error("Missing required configuration: PAYMENT_API_KEY");

    return Response.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  // Pass apiKey to the external service here.
  // Never include it in logs or HTTP responses.

  return Response.json({ configured: true });
});
```

Supabase exposes function secrets through `Deno.env.get()`. Keep credentials server-side; the example returns only a configuration-presence check.[1]

## Rotate or remove a secret

To rotate a secret, replace its value in the Dashboard or rerun `secrets set` with the same name and the new value. No function redeployment is necessary. Update Supabase before revoking the old credential where your external provider supports overlapping keys.[1]

To remove a secret:

```bash
supabase secrets unset PAYMENT_API_KEY \
  --project-ref YOUR_PRODUCTION_PROJECT_REF
```

The CLI provides `set`, `list`, and `unset` commands for managing remote function secrets.[3]

Keep development and production credentials separate, and avoid passing literal production values directly in shell commands when an ignored environment file will suffice.

การอ้างอิง:
[1] supabase/apps/docs/content/guides/functions/secrets.mdx at master · supabase/supabase https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/secrets.mdx
[2] The Vibe Coder's Guide to Supabase Environments https://supabase.com/blog/the-vibe-coders-guide-to-supabase-environments
[3] CLI Reference | Supabase Docs https://supabase.com/docs/reference/cli/supabase-db-push
[4] Supabase for Platforms https://supabase.com/docs/guides/integrations/supabase-for-platforms
[5] Backup and Restore using the CLI | Supabase Docs https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore
[6] Working with branches | Supabase Docs https://supabase.com/docs/guides/deployment/branching/working-with-branches
