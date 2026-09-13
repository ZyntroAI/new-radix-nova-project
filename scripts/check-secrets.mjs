#!/usr/bin/env node
// check-secrets.mjs — ตรวจสถานะ GitHub Secret Scanning ของ repo
//
// ใช้:  GITHUB_TOKEN=xxx node scripts/check-secrets.mjs [owner/repo]
// ต้องมี token scopes: repo, security_events (อ่าน security_and_analysis ต้องเป็นแอดมิน)
// exit code: 0 = ผ่าน, 1 = ยังไม่ผ่าน, 2 = ตั้งค่าไม่ครบ
//
// หมายเหตุการแก้จากเวอร์ชันเดิม:
//   ของเดิมเรียก GraphQL ฟิลด์ secretScanningEnabled / pushProtectionEnabled /
//   secretAlerts ซึ่งไม่มีอยู่ใน GitHub GraphQL schema (จะได้ error "Field doesn't exist")
//   เวอร์ชันนี้ใช้ REST API ซึ่งมีฟิลด์จริงและตรวจสอบได้

const REPO = process.argv[2] || process.env.REPO || 'ZyntroAI/new-radix-nova-project';
const TOKEN = process.env.GITHUB_TOKEN;
const API = 'https://api.github.com';

if (!TOKEN) {
  console.error('❌ ต้องตั้งค่า GITHUB_TOKEN (scopes: repo, security_events)');
  process.exit(2);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function get(path) {
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${path} → HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

const [repo, alerts] = await Promise.all([
  get(`/repos/${REPO}`),
  get(`/repos/${REPO}/secret-scanning/alerts?state=open&per_page=100`).catch(() => null),
]);

const sa = repo.security_and_analysis || {};
const scanningStatus = sa.secret_scanning?.status ?? 'unknown';
const pushStatus = sa.secret_scanning_push_protection?.status ?? 'unknown';

const out = [
  `# Secret Scanning — ${REPO}`,
  `visibility:      ${repo.visibility}`,
  `secret_scanning: ${scanningStatus}`,
  `push_protection: ${pushStatus}`,
];
if (alerts === null) {
  out.push('open_alerts:     อ่านไม่ได้ (ต้องมีสิทธิ์ security_events)');
} else {
  out.push(`open_alerts:     ${alerts.length}`);
}
console.log(out.join('\n'));

const scanningOn = scanningStatus === 'enabled';
const pushOn = pushStatus === 'enabled';
const clean = (alerts?.length ?? 0) === 0;

if (!scanningOn || !pushOn || !clean) {
  console.error('\n❌ ยังไม่ผ่าน: ต้องเปิด secret scanning + push protection และไม่มี alert ค้าง');
  process.exit(1);
}
console.log('\n✅ ผ่าน — เปิดสแกนครบถ้วนและไม่มี alert ค้าง');
