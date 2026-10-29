Guide me

Your screenshot shows a page titled “Supabase – Edge Functions Architecture,” with no visible body content yet. Here’s a practical way to build it into a useful **architecture** note—starting with the request flow, then the project structure and security decisions.[1]

## 1. Add a short overview

Paste this beneath the title:

> Supabase Edge Functions are server-side TypeScript functions running on a Deno-based runtime. They handle HTTP endpoints, webhooks, and integrations with databases and external services. Requests pass through a gateway before executing in the Edge Runtime.[2][3]

## 2. Map the request flow

Use this as the first architecture diagram:

```text
Web / mobile application
          │
          ▼
Supabase API gateway
          │
          ▼
Edge Function
  ├── Authenticate caller
  ├── Validate input
  ├── Apply business rules
  └── Handle errors
          │
          ├── Supabase database / Storage
          └── External APIs
          │
          ▼
JSON response
```

The gateway routes requests and participates in authentication checks. Your function still needs application-specific authorization and input validation; routing a request successfully does not establish that the caller may perform every operation.[2][4]

## 3. Document the folder structure

Since you were exploring folder structures, add this section next:

```text
my-app/
├── src/                         # Frontend application
├── supabase/
│   ├── config.toml              # Local and per-function configuration
│   ├── migrations/              # Database schema changes
│   └── functions/
│       ├── _shared/
│       │   ├── cors.ts          # Shared CORS headers/helpers
│       │   ├── validation.ts    # Shared validation helpers
│       │   └── errors.ts        # Shared error responses
│       ├── get-orders/
│       │   └── index.ts         # Function entry point
│       ├── create-order/
│       │   └── index.ts
│       └── tests/
│           ├── get-orders-test.ts
│           └── create-order-test.ts
└── README.md
```

Supabase recommends underscore-prefixed folders such as `_shared` for shared code, hyphenated function names, and a separate tests folder. Per-function settings belong in `supabase/config.toml`.[5]

Keep each function focused on one operation; extract helpers when multiple functions actually need them rather than building a large shared framework immediately.

## 4. Write down the security model

Add a small decision table:

| Endpoint | Authentication decision | Authorization decision |
|---|---|---|
| `get-orders` | Require a signed-in user | Return only orders the caller may read |
| `create-order` | Require a signed-in user | Validate ownership and allowed actions |
| Payment webhook | Verify the payment provider’s signature | Process only verified events |
| Administrative action | Require trusted credentials | Restrict elevated operations explicitly |

For user-facing database operations, use a Supabase client scoped to the caller so Row Level Security policies apply. Supabase’s authentication documentation describes passing the user’s authorization context to the client.[4][6]

A webhook may need platform JWT verification disabled because its sender uses a provider-specific signature instead. Disabling JWT checks does not authenticate the webhook: implement signature verification before processing its payload.[7]

## 5. Record secrets and configuration

Add this checklist:

```markdown
## Configuration and secrets

- [ ] Store production credentials in Supabase project secrets.
- [ ] Read credentials through environment variables.
- [ ] Keep real secrets out of Git and architecture notes.
- [ ] Keep privileged database access separate from user-scoped access.
- [ ] Document required variable names, not their values.
```

Supabase supports project secrets exposed to functions as environment variables. Store the names and purposes in your note, not actual credentials.[2][8]

## 6. Finish with implementation and testing tasks

```markdown
## Implementation checklist

- [ ] Define request and response shapes.
- [ ] Create the function entry point.
- [ ] Validate required fields and data types.
- [ ] Authenticate the caller.
- [ ] Enforce authorization and database policies.
- [ ] Return consistent JSON errors.
- [ ] Add CORS handling for browser calls.
- [ ] Test success, invalid input, and unauthorized requests.
- [ ] Test database and external-service failures.
- [ ] Deploy and verify with a non-production dataset.

## Open decisions

- Which operations need an Edge Function?
- Which operations can use the Supabase client directly?
- Which functions require elevated privileges?
- What should happen on duplicate webhook delivery?
- Where should failed operations be logged?
```

Supabase provides dedicated guidance for function creation, local development, and automated testing; keep your note linked to those implementation areas as the project grows.[3][5][9]

Start with one endpoint—`get-orders`—and document its complete request-to-response path before adding more functions. That will make the page an actionable design rather than just a list of technologies.

การอ้างอิง:
[1] 13509.jpg https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/images/1064638370/ef0ea517-9a2e-4bea-a35f-4182507158fd/13509.jpg
[2] Edge Functions | Supabase Docs https://supabase.com/docs/guides/functions
[3] Getting Started with Edge Functions | Supabase Docs https://supabase.com/docs/guides/functions/quickstart
[4] Securing Edge Functions - Supabase Docs https://supabase.com/docs/guides/functions/auth
[5] Development tips https://supabase.com/docs/guides/functions/development-tips
[6] Integrating With Supabase Auth https://supabase.com/docs/guides/functions/auth-legacy-jwt
[7] Function Configuration | Supabase Docs https://supabase.com/docs/guides/functions/function-configuration
[8] Managing environment variables https://supabase.com/docs/guides/functions/secrets
[9] Testing your Edge Functions | Supabase Docs https://supabase.com/docs/guides/functions/unit-test
[10] AI Prompt: Writing Supabase Edge Functions https://supabase.com/docs/guides/ai-tools/ai-prompts/edge-functions
[11] Edge Functions Architecture | Supabase Docs https://supabase.com/docs/guides/functions/architecture
[12] Edge Functions https://supabase.com/edge-functions
[13] Configuration | Supabase Docs https://supabase.com/docs/guides/deployment/branching/configuration
[14] Deploy to Production | Supabase Docs https://supabase.com/docs/guides/functions/deploy
[15] Self-Hosted Functions | Supabase Docs https://supabase.com/docs/guides/self-hosting/self-hosted-functions
[16] Self-Hosting Functions https://supabase.com/docs/reference/self-hosting-functions/introduction
