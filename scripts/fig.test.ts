import assert from 'node:assert/strict';
import { sanitizeInput, validateConfig, isValidLength, generateId, MAX_INPUT_LENGTH } from '../lib/security';
import { fetchFIGStream } from '../lib/api/fig';
import type { FIGConfig } from '../types/fig';

let passed = 0;
function ok(name: string, fn: () => void | Promise<void>) {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      passed += 1;
      console.log(`  ok  - ${name}`);
    })
    .catch((e) => {
      console.error(`FAIL  - ${name}\n        ${(e as Error).message}`);
      process.exitCode = 1;
    });
}

async function main() {
  console.log('security.sanitizeInput');
  await ok('ลบ <script>', () => {
    assert.equal(sanitizeInput('<script>alert(1)</script>hi'), 'hi');
  });
  await ok('escape & < > " \'', () => {
    assert.equal(sanitizeInput('a<b>&"\''), 'a&lt;b&gt;&amp;&quot;&#39;');
  });
  await ok('trim()', () => assert.equal(sanitizeInput('  hello  '), 'hello'));
  await ok('จำกัดความยาว', () => {
    assert.equal(sanitizeInput('x'.repeat(MAX_INPUT_LENGTH + 500)).length, MAX_INPUT_LENGTH);
  });
  await ok('input ที่ไม่ใช่ string -> ""', () => {
    // @ts-expect-error ตรวจ runtime guard
    assert.equal(sanitizeInput(undefined), '');
  });

  console.log('security.validateConfig');
  await ok('คอนฟิกถูกต้อง', () => {
    assert.equal(validateConfig({ apiKey: 'k'.repeat(16), baseURL: 'https://api.example.com/v1' }), true);
  });
  await ok('apiKey สั้นเกิน', () => {
    assert.equal(validateConfig({ apiKey: 'short', baseURL: 'https://api.example.com' }), false);
  });
  await ok('baseURL ปลอม', () => {
    assert.equal(validateConfig({ apiKey: 'k'.repeat(16), baseURL: 'not-a-url' }), false);
  });
  await ok('baseURL "https://" ลอย ๆ', () => {
    assert.equal(validateConfig({ apiKey: 'k'.repeat(16), baseURL: 'https://' }), false);
  });
  await ok('ไม่มีค่า', () => assert.equal(validateConfig({}), false));

  console.log('security.isValidLength / generateId');
  await ok('ว่าง -> false', () => assert.equal(isValidLength('   '), false));
  await ok('id ไม่ซ้ำ', () => assert.notEqual(generateId(), generateId()));

  console.log('api.fetchFIGStream');
  const config: FIGConfig = {
    apiKey: 'k'.repeat(16),
    baseURL: 'https://api.example.com/v1',
    projectId: 'proj-1',
    mode: 'interactive',
  };

  await ok('ประกอบสตรีม delta และจบด้วย done', async () => {
    const sse =
      'data: {"choices":[{"delta":{"content":"สวัสดี"}}]}\n\n' +
      'data: {"choices":[{"delta":{"content":" โลก"}}]}\n\n' +
      'data: [DONE]\n\n';
    globalThis.fetch = (async () =>
      new Response(sse, { status: 200, headers: { 'Content-Type': 'text/event-stream' } })) as typeof fetch;

    let text = '';
    let done = false;
    for await (const chunk of fetchFIGStream(config, 'hi')) {
      text += chunk.content;
      if (chunk.done) done = true;
    }
    assert.equal(text, 'สวัสดี โลก');
    assert.equal(done, true);
  });

  await ok('ส่ง Authorization header และ body ถูกต้อง', async () => {
    let seen: RequestInit | undefined;
    globalThis.fetch = (async (_url: string, init: RequestInit) => {
      seen = init;
      return new Response('data: [DONE]\n\n', { status: 200 });
    }) as unknown as typeof fetch;

    for await (const _ of fetchFIGStream(config, 'hello')) void _;

    const headers = seen!.headers as Record<string, string>;
    assert.equal(headers.Authorization, `Bearer ${config.apiKey}`);
    const body = JSON.parse(seen!.body as string);
    assert.equal(body.project_id, 'proj-1');
    assert.equal(body.messages[0].content, 'hello');
    assert.equal(body.stream, true);
  });

  await ok('HTTP error -> error พร้อมรหัส', async () => {
    globalThis.fetch = (async () => new Response('bad gateway', { status: 502 })) as typeof fetch;
    await assert.rejects(
      async () => {
        for await (const _ of fetchFIGStream(config, 'x')) void _;
      },
      /FIG API error 502/,
    );
  });

  await ok('abort -> AbortError', async () => {
    const controller = new AbortController();
    globalThis.fetch = (async () => {
      controller.abort();
      throw Object.assign(new Error('aborted'), { name: 'AbortError' });
    }) as typeof fetch;
    await assert.rejects(
      async () => {
        for await (const _ of fetchFIGStream(config, 'x', controller.signal)) void _;
      },
      (e: Error) => e.name === 'AbortError',
    );
  });

  console.log(`\n${passed} tests passed`);
}

main();
