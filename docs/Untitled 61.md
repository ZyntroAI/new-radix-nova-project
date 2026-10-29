How do I read secrets inside an Edge Function

Read a secret inside a Supabase Edge Function with **`Deno.env.get()`**. It returns the secret’s value as a string, or `undefined` if the variable is missing. Supabase makes configured secrets available through the function’s environment.[1][2]

## Basic example

```typescript
const apiKey = Deno.env.get("PAYMENT_API_KEY");
```

Use the exact name you set in the Dashboard or with `supabase secrets set`.

## Complete Edge Function

This example checks that both required secrets exist without exposing their values:

```typescript
// supabase/functions/create-order/index.ts

Deno.serve(async (req: Request) => {
  const paymentApiKey = Deno.env.get("PAYMENT_API_KEY");
  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");

  if (!paymentApiKey || !webhookSecret) {
    console.error("Missing required server configuration", {
      paymentApiKeyConfigured: Boolean(paymentApiKey),
      webhookSecretConfigured: Boolean(webhookSecret),
    });

    return Response.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  // Use paymentApiKey in a server-side API request.
  // Use webhookSecret when verifying webhook signatures.
  // Never log or return either value.

  return Response.json({ message: "Required configuration is available" });
});
```

Checking for missing values before using them follows Supabase’s documented environment-variable pattern. This example demonstrates secret access only; add your endpoint’s authentication, validation, and business logic separately.[1]

## Reading a JSON secret

If a secret contains JSON, read the string and parse it:

```typescript
// Secret value:
// {"apiKey":"your-key","accountId":"your-account"}

const raw = Deno.env.get("PAYMENT_CONFIG");

if (!raw) {
  throw new Error("Missing PAYMENT_CONFIG secret");
}

const config = JSON.parse(raw);

if (
  typeof config.apiKey !== "string" ||
  typeof config.accountId !== "string"
) {
  throw new Error("Invalid PAYMENT_CONFIG structure");
}
```

`Deno.env.get()` does not automatically parse JSON. Supabase documents using `JSON.parse()` for grouped credentials; handle malformed JSON as a server-configuration error rather than returning its contents to the caller.[1]

## A useful TypeScript caution

Avoid relying only on the non-null assertion:

```typescript
const apiKey = Deno.env.get("PAYMENT_API_KEY")!;
```

The `!` tells TypeScript to assume the value exists; it does not validate the value at runtime. An explicit missing-value check, as shown above, makes configuration failures easier to diagnose.

การอ้างอิง:
[1] Working around the Edge Function secrets limit https://supabase.com/docs/guides/troubleshooting/working-around-the-edge-function-secrets-limit
[2] Automatic embeddings | Supabase Docs https://supabase.com/docs/guides/ai/automatic-embeddings
[3] Migrating to publishable and secret API keys | Supabase Docs https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys
[4] supabase.com › docs › guidesAPI keys - Supabase Docs https://supabase.com/docs/guides/getting-started/api-keys
