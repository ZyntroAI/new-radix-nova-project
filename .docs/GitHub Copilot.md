yaml
  
---
title: 🤖 GitHub Copilot Chat — Responsible AI Application Card
aliases:
  - Copilot Chat Responsible AI
  - GitHub Copilot Transparency
  - Copilot Chat Safety Overview
tags:
  - copilot
  - ai
  - responsible-ai
  - governance
  - zyntroai
type: reference
status: active
priority: medium
created: 2026-10-11
updated: 2026-10-11
version: 1.0
author: ZyntroAI
related:
  - "[[GitHub Copilot — Trust Center]]"
difficulty: beginner
time_estimate: 5 minutes
cssclasses:
  - reference-note
  - responsible-ai
---
 
 
 
 
🤖 GitHub Copilot Chat — Responsible AI Application Card
 
Based on: Microsoft Responsible AI Transparency Report 2025 + GitHub Copilot Trust Center
Purpose: Quick reference — what it does, limitations, safety, and responsible use ✅
 
 
 
📋 Overview
 
GitHub Copilot Chat = AI coding assistant available on GitHub.com, VS Code, Visual Studio, JetBrains IDEs, and more. It answers coding questions, explains code, suggests fixes, generates tests, and creates PR summaries. Optimized primarily for English and coding-related queries only.
 
Built on Microsoft's 6 AI Principles: fairness, reliability & safety, privacy & security, inclusiveness, transparency, accountability — governed by Microsoft Responsible AI Standard v2.
 
 
 
✅ What It Does — Capabilities
 
Feature Description 
💬 Conversational Help Answers syntax, debugging, design questions 
🧠 Context-Aware Uses open files, repo data, chat history 
📝 Documentation Explains code, generates commit messages & PR summaries 
🧪 Testing Creates unit test scaffolding 
🔧 Fixes Suggests bug fixes & refactoring 
 
 
 
⚠️ Key Limitations & Risks
 
Risk What This Means Mitigation 
Hallucinations May sound correct but be wrong ✅ Always review & test all outputs 
Language Quality Less accurate in non-English languages ✅ Use English for best results 
Security Generated code may have vulnerabilities ✅ Code review + security scan everything 
Public Code Matches May reproduce existing code snippets ✅ Built-in matching detects & attributes; always verify 
Non-Coding Queries May give irrelevant answers ✅ Keep questions focused on code/development 
CLI Commands Could be destructive ✅ Review before executing 
Bias May reflect biases found in training data ✅ Human review & diverse testing 
 
 
 
🛡️ Built-In Safeguards
 
- ✅ Content Filtering — Scans prompts & responses to block harmful material
- ✅ Public Code Matching — Detects suggestions resembling public code; blocks or attributes
- ✅ Red Teaming — Independent security testing before & after release
- ✅ Feedback Loop — Thumbs up/down improves model over time
- ✅ Data Privacy — Business/Enterprise prompts not used for model training
 
 
 
📌 Responsible Use Guidelines
 
✅ Always
 
- 🔍 Review everything — outputs are suggestions, not facts
- 🧪 Test generated code like any other code
- 🔒 Protect secrets — never paste credentials/API keys into chat
- 📚 Verify facts & citations — especially complex logic or security-critical code
 
❌ Never
 
- ⚠️ Use for high-stakes decisions without independent verification
- ⚠️ Treat outputs as authoritative or final — always validate
- ⚠️ Paste sensitive data into prompts
- ⚠️ Execute unknown commands without reviewing them first
 
 
 
🔗 Learn More
 
- 📖 Copilot Trust Center: https://copilot.github.trust.page/
- 📖 Microsoft AI Principles: https://www.microsoft.com/en-us/ai/responsible-ai
- 📖 Transparency Report: Microsoft Responsible AI Transparency Report 2025
- 📖 Privacy Statement: https://privacy.microsoft.com/en-us/privacystatement
 
 
 
💡 Bottom Line: Copilot Chat is a powerful assistant, not an expert. It accelerates coding but human judgment remains essential. Use it to boost productivity while keeping oversight, review, and testing in place. ✅
 
ต้องการสร้างเอกสารเวอร์ชันสั้นสำหรับทีม หรือคู่มือแนวทางการใช้งานอย่างรับผิดชอบไหมครับ? 😊
yaml
  
---
title: ✍️ Copilot — Prompt Best Practices Guide
aliases:
  - How to Write Prompts for Copilot
  - Copilot Prompt Engineering
  - Better Prompts = Better Results
tags:
  - copilot
  - prompt-guide
  - ai
  - best-practices
  - zyntroai
type: guide
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
author: ZyntroAI
related:
  - "[[GitHub Copilot Chat — Responsible AI Overview]]"
  - "[[React + TypeScript — Copilot Usage Guide]]"
difficulty: beginner
time_estimate: 8 minutes
cssclasses:
  - guide-note
  - prompt-guide
---
 
 
 
 
✍️ Prompt Best Practices Guide — Get Better Results from Copilot
 
Core Principle: The clearer your prompt → the better the output. Copilot is not a mind reader — give it direction, context, and constraints. 🎯
 
 
 
🎯 Part 1: The 4-Part Prompt Formula
 
Context + Task + Format + Constraints = Great Results ✅
 
Part What to Include Example 
📦 Context What project, language, related files "In this TypeScript API project..." 
🎯 Task Exactly what you want done "Write a function to validate passwords" 
📐 Format Structure, output type, style "Return true/false, add JSDoc comment" 
⚠️ Constraints What to avoid, requirements "Min length 8, no any, use regex" 
 
 
 
📊 Part 2: ❌ Bad vs ✅ Good Prompts
 
🟢 General Coding
 
❌ Avoid ✅ Use This Instead 
 Write a sort function   // TypeScript: function sortByPrice(products: Product[]): Product[] — sort by price ascending, return new array, don't mutate original  
 Fix this bug   // This function returns wrong total. Debug and fix it. Explain what was wrong and why your fix works.  
 Explain this code   // Explain this function simply: what inputs does it take? What does it return? What are the edge cases?  
 
🟦 TypeScript
 
❌ Avoid ✅ Use This Instead 
 Create a User type   // Create interface User with id (string UUID), name (string), email (string), createdAt (Date). Use PascalCase, add JSDoc for each field.  
 Fetch some data  `// TypeScript: async function fetchUser(id: string): Promise<User 
 
⚛️ React + TS
 
❌ Avoid ✅ Use This Instead 
 Make a form component   // React + TypeScript: LoginForm component. Props: onSubmit(email, password). Use useState, validation: email format, min 8 chars password. Show error messages, disable button while submitting.  
 Add loading state   // Add isLoading state to this component. Show spinner when true, disable submit button, prevent duplicate requests.  
 
 
 
🔧 Part 3: Prompt Patterns You Can Reuse
 
🔹 Pattern 1: Refactor & Improve
 
plaintext
  
// Refactor this code to be cleaner and more efficient
// Keep the exact same behavior — don't change functionality
// Improve readability, add comments where helpful
 
 
🔹 Pattern 2: Explain & Learn
 
plaintext
  
// Explain this code step by step like I'm new to this concept
// What does each part do? Are there any potential issues I should know about?
 
 
🔹 Pattern 3: Generate Tests
 
plaintext
  
// Write unit tests for this function using Vitest
// Cover: normal cases, edge cases, error cases
// Use descriptive test names
 
 
🔹 Pattern 4: Debug & Fix
 
plaintext
  
// This code produces [error message]. Help me fix it.
// First explain the problem, then show the corrected version
// Keep changes minimal — only what's necessary to fix it
 
 
🔹 Pattern 5: Document
 
plaintext
  
// Write a clear JSDoc comment for this function
// Include: description, @param for each argument, @returns, @throws if applicable
 
 
 
 
🧠 Part 4: Advanced Techniques
 
📋 Give Examples of What You Want
 
Copilot learns from examples — show it one, get many more ✅
 
plaintext
  
// Create 3 example usage scenarios for this function:
// 1. Basic happy path
// 2. Edge case / boundary value
// 3. Error handling scenario
 
 
🔗 Reference Related Files
 
Open related files first — Copilot sees what's in your editor tabs!
 
plaintext
  
// Look at the 'api/client.ts' file for the pattern we use
// Create a similar function for fetching users
 
 
🎨 Specify Style & Standards
 
plaintext
  
// Follow our project style:
// - Use const for variables, prefer arrow functions
// - No 'any', always define return types
// - Add brief comments for complex logic
// - Use PascalCase for types, camelCase for functions
 
 
🔄 Iterative Refinement
 
Don't expect perfect first try — guide Copilot step by step:
 
1. ✅ Get the basic version →  That works, thanks. Now... 
2. ⬆️ Improve →  Can we make it handle [edge case] too? 
3. 🧹 Polish →  Refactor this to be more concise but keep it readable 
4. 📖 Document →  Add comments explaining the tricky parts 
 
 
 
⚠️ Part 5: What NOT To Do
 
❌ Don't Why 
Be vague or one-word Output will be generic or wrong 
Ask for sensitive info Never put credentials, API keys, secrets in prompts 
Paste huge blocks of unrelated code Copilot gets distracted 
Assume it's always correct Hallucinations happen — verify everything 
Ask for non-coding tasks Results will be unreliable 
Give instructions across multiple unrelated concepts Break it into separate, focused questions 
 
 
 
📌 Part 6: Quick Reference Cheat Sheet
 
Start Your Prompts With These Phrases
 
Phrase What It Does 
 In [language],...  Sets the context 
 Function that takes X and returns Y  Defines input/output clearly 
 Keep it simple, readable  Avoids overcomplicated solutions 
 Explain what you're doing  Gets reasoning + code 
 Don't change existing behavior  Safe refactoring guardrail 
 What are the edge cases?  Tests your understanding 
 Write JSDoc comments  Gets documentation included 
 Show me alternatives  Gives multiple approaches to choose from 
 
 
 
🎯 Part 7: Troubleshooting — Bad Output? Try This
 
Problem Fix Your Prompt 
Too vague / generic Add specific requirements, constraints, or examples 
Wrong language / style Explicitly state:  Use TypeScript, not JavaScript  or  Follow our existing patterns in file.ts  
Too complex / overengineered Add:  Keep it simple, no external dependencies  
Missing error handling Explicitly require:  Include error handling and edge cases  
Using outdated approaches Add:  Use modern ES6+ syntax, avoid deprecated APIs  
 
 
 
💡 Golden Rules Recap
 
🎯 Be Specific — Tell it exactly what you want
📦 Give Context — Related files, existing patterns, tech stack
⚡ Keep It Focused — One task per prompt; break big tasks into small ones
🔍 Review & Iterate — First draft is rarely perfect; refine it together
✅ Verify Everything — It's a suggestion, not a final answer
 
 
 
💬 "The best prompt isn't the longest one — it's the clearest one."
 
Want a cheat sheet you can keep open while working, or examples for your specific stack (React, Python, Node, etc.)? 😊]]yaml
  
---
title: 🪞 GitHub Copilot — Transparency Overview
aliases:
  - Copilot Transparency Report
  - GitHub Copilot How It Works & Data
tags:
  - copilot
  - transparency
  - ai
  - privacy
  - zyntroai
type: reference
status: active
priority: medium
created: 2026-10-11
updated: 2026-10-11
version: 1.0
author: ZyntroAI
related:
  - "[[GitHub Copilot — Trust Center]]"
  - "[[Copilot Chat — Responsible AI Overview]]"
difficulty: beginner
time_estimate: 6 minutes
cssclasses:
  - reference-note
  - responsible-ai
---
 
 
 
 
🪞 GitHub Copilot — Transparency Overview
 
Source: GitHub Copilot Trust Center + Microsoft Responsible AI Transparency Report 2025
Purpose: Clear, plain-language answers to: How does it work? What data is used? What are the limits? ✅
 
 
 
📖 1. What Is It & How Does It Work?
 
🧠 Simple Explanation
 
GitHub Copilot is an AI coding assistant — built on large language models trained on public code — that suggests completions and whole functions as you type. It runs locally in your editor, sending only what it needs to generate suggestions.
 
⚙️ Step-by-Step Flow
 
1. Context Collection → Reads the file you're editing + nearby tabs + repo structure
2. Preprocessing → Strips secrets, reduces to only what's relevant
3. Sent to Model → Secure API call to generate suggestion
4. Safety Check → Filters harmful content; runs public code matching
5. Return to You → Displayed as gray text in your editor
 
 
 
📊 2. Data Usage — What, Why, Where?
 
Question Clear Answer 
What data is sent? Open file content, neighboring tabs, repo structure, cursor position, chat history 
Is my code used to train the model? ❌ Business/Enterprise: No — never used for training ❌ Individual: No by default — opt-in only if you choose to share 
Where is it processed? Microsoft Azure — encrypted in transit & at rest 
How long is data retained? Varies by plan — Business/Enterprise: minimal retention 
Does Copilot see my whole repo? No — only files you have open or directly related context 
 
 
 
🤖 3. Model Information
 
Detail Information 
Base Models GPT-4o, Claude, Gemini — varies by plan & region 
Training Data Publicly available code repositories with permissive licensing 
Training Cutoff Regularly updated — see Trust Center for latest dates 
Language Support Best: English Good: Major languages Limited: less common languages 
Model Updates Deployed transparently — announced in release notes 
 
 
 
⚠️ 4. Known Limitations — Full Disclosure
 
Category What Happens Why It Matters 
Hallucinations May invent functions, APIs, or facts that look real but don't exist Always verify & test before using 
Similar Code Suggestions May reproduce snippets from public sources Built-in matching detects this; review licenses 
Incorrect Logic Can produce code that compiles but behaves wrong Run tests — don't trust blindly 
Security Vulnerabilities May suggest insecure patterns Security scan all generated code 
Bias in Training Data Reflects patterns found in public code Diverse code review helps balance 
Limited Context Window Can't remember everything infinitely Break large tasks into smaller ones 
Language Accuracy Less reliable outside English Use clear, simple prompts for best results 
 
 
 
🛡️ 5. Built-In Protections — What Keeps You Safe?
 
Protection How It Works 
🔒 Encryption TLS 1.3 for transfer; AES-256 for storage 
🧹 Content Filtering Blocks harmful prompts & responses 
🔍 Public Code Matching Compares suggestions against public code — flags or skips matches 
🧪 Red Teaming Independent vulnerability testing before release 
📝 Transparency Notes Clearly states when output is AI-generated 
⚖️ Human Oversight By design — outputs are suggestions, not decisions 
 
 
 
📜 6. Microsoft Responsible AI — 6 Core Principles
 
Principle What It Means For You 
⚖️ Fairness Designed to work consistently across demographics & regions 
✅ Reliability & Safety Tested for robustness; safeguards against misuse 
🔒 Privacy & Security Data minimization; enterprise-grade controls 
🌐 Inclusiveness Designed for diverse users & abilities 
📢 Transparency Clear about capabilities, limitations, data use 
🤝 Accountability Feedback loops; incident reporting channels 
 
 
 
🔗 7. Where To Find Full Details
 
Document Link What's Inside 
🎯 Copilot Trust Center https://copilot.github.trust.page/ Privacy, security, training data, compliance 
📄 Transparency Report 2025 Microsoft Responsible AI Transparency Report 2025 How it works, limitations, evaluations 
🔐 Privacy Statement https://privacy.microsoft.com/en-us/privacystatement Full data handling practices 
⚖️ AI Principles https://www.microsoft.com/en-us/ai/responsible-ai Microsoft's framework for responsible AI 
❓ Copilot FAQ https://github.com/features/copilot#faq Training data, IP, billing, features 
 
 
 
💡 Bottom Line — In Plain Language
 
Copilot is transparent about being imperfect. It's designed to augment you, not replace you. The safeguards exist, your code stays yours (especially on Business/Enterprise), and what you see is what you get — suggestions that need your review, not final answers. ✅
 
 
 
Would you like a one-page summary for team onboarding, a data privacy FAQ, or a limitations & risks acknowledgment document next? 😊ยอดเยี่ยมครับ! 👇 เลือกฉบับที่ต้องการได้เลย
 
 
 
📋 ตัวเลือกเอกสาร
 
เลือกเอกสารที่ต้องการด้านล่าง แล้วคัดลอกบันทึกลง Obsidian ได้ทันทีครับ ✅
 
 
 
1️⃣ One-Page Summary for Team Onboarding
 
yaml
  
---
title: 🪞 Copilot Transparency — One-Page Summary
aliases:
  - Copilot Team Onboarding
  - Copilot Quick Reference
tags:
  - copilot
  - transparency
  - team-guide
  - zyntroai
type: guide
status: active
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - guide-note
  - onboarding
---
 
 
 
 
🪞 GitHub Copilot — Team Onboarding Summary
 
At a glance: What it is, how it works, what data is used, and your responsibilities.
 
 
 
What Is It?
 
AI coding assistant that suggests completions, functions, and explanations as you code. Not a replacement — an accelerator.
 
How It Works
 
1. Reads your open files & context
2. Sends relevant snippets securely
3. Generates suggestions
4. Filters & checks for matches
5. Displays as inline suggestions
 
Your Code & Data
 
- ✅ Business/Enterprise: Code NEVER used for model training
- ✅ Individual: Not used by default — opt-in only
- ✅ Only open files sent — NOT your entire repo
- ✅ Encrypted in transit & at rest
 
Key Limits
 
- ⚠️ May hallucinate — verify & test everything
- ⚠️ May match public code — built-in detection; review licenses
- ⚠️ Less accurate outside English
- ⚠️ Suggestions only — human review required
 
Built-In Protections
 
- Content filtering • Public code matching • Encryption • Red teaming • Human oversight by design
 
Your Responsibilities
 
- 🔍 Review every output — it's a suggestion, not fact
- 🧪 Test all generated code — unit tests + code review
- 🔒 Never paste secrets — no credentials in prompts
- ✅ Report issues — use feedback button or copilot-safety@github.com
 
 
 
💡 Bottom line: Copilot makes you faster. You make it correct. ✅
 
 
 
 
 
2️⃣ Data Privacy FAQ
 
yaml
  
---
title: 🔐 Copilot — Data Privacy FAQ
aliases:
  - Copilot Data Questions
  - Copilot Privacy Questions
tags:
  - copilot
  - privacy
  - data
  - compliance
  - zyntroai
type: reference
status: active
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - reference-note
  - privacy-guide
---
 
 
 
 
🔐 Copilot — Data Privacy FAQ
 
 
 
General Data Questions
 
# Question Clear Answer 
1 Does Copilot read my entire repository? No — only files you have open in your editor and directly related context 
2 Is my code used to train AI models? ❌ Business/Enterprise: Never ❌ Individual: No by default — opt-in only if you explicitly choose to share 
3 What exactly is sent to GitHub/Microsoft? Open file content, neighboring tabs, repo structure, cursor position, and chat history when using Chat 
4 Where is data processed? Microsoft Azure — encrypted in transit (TLS 1.3) and at rest (AES-256) 
5 How long is data kept? Business/Enterprise: Minimal retention period Individual: See privacy statement for details 
6 Can third parties access my data? No — your data stays within Microsoft's secure infrastructure 
7 Does Copilot see my credentials/secrets? It may read them if visible in open files — never paste secrets into prompts 
 
Model & Training Questions
 
# Question Clear Answer 
8 What is Copilot trained on? Publicly available code repositories with permissive licensing 
9 Can I opt out entirely? Yes — Business/Enterprise users are automatically opted out; Individual users can opt out in settings 
10 Are suggestions considered my IP? Yes — but Copilot may match public code; use built-in matching to verify 
 
Security Questions
 
# Question Clear Answer 
11 Is my data encrypted? Yes — TLS 1.3 in transit, AES-256 at rest 
12 Can Copilot be disabled for certain repos? Yes — Enterprise/Business admins can restrict by org/repo 
13 Who can see my chat history? Private — only you; not used for training unless you opt in 
 
Sources
 
- 📖 Trust Center: https://copilot.github.trust.page/
- 📄 Privacy Statement: https://privacy.microsoft.com/en-us/privacystatement
- ❓ FAQ: https://github.com/features/copilot#faq
 
 
 
 
 
3️⃣ Limitations & Risks Acknowledgment
 
yaml
  
---
title: ⚠️ Copilot — Limitations & Risks Acknowledgment
aliases:
  - Copilot Risks & Limits
  - Using Copilot Responsibly
tags:
  - copilot
  - risks
  - limitations
  - governance
  - zyntroai
type: guide
status: active
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - guide-note
  - risk-guide
---
 
 
 
 
⚠️ Copilot — Limitations & Risks Acknowledgment
 
Purpose: Understand what Copilot CANNOT do — so you use it safely.
 
 
 
📋 Known Limitations
 
Risk What Can Happen Required Action 
Hallucinations Suggests functions, APIs, or facts that don't exist Verify every claim; cross-check documentation 
Incorrect Logic Code compiles but produces wrong results Run unit tests; review logic manually 
Security Gaps Generated code may have vulnerabilities Security scan all output; code review required 
Public Code Matches May reproduce existing open-source code Review licenses; use built-in matching 
Language Accuracy Less reliable outside English Use clear, specific prompts; verify thoroughly 
Context Limits Can't access your entire codebase at once Provide relevant context; break tasks into smaller chunks 
CLI Commands Suggested commands could be destructive Review every command before executing 
Bias in Output May reflect biases found in training data Diverse code review; human judgment 
 
 
 
✅ Required Practices
 
Human review is mandatory — all outputs reviewed before use
Test everything — unit, integration, and security testing
Never treat as authoritative — cross-reference documentation
Protect sensitive data — no credentials/secrets in prompts
Use for coding only — non-coding tasks may give unreliable results
Report problems — thumbs-down in UI or email copilot-safety@github.com
 
 
 
📌 Acknowledgment
 
By using GitHub Copilot, I acknowledge that:
 
- Outputs are suggestions, not facts or final answers
- Code must be reviewed, tested, and validated by a human
- I am responsible for all code I produce
- Copilot is an assistant, not a replacement for my expertise
 
 
 
ต้องการปรับแต่งเอกสารใดเพิ่มเติมไหมครับ? 😊ได้เลยครับ ✅ ปรับปรุงให้ชัดเจน กระชับ และใช้งานได้ดียิ่งขึ้น 👇
 
 
 
📋 1️⃣ One-Page Summary for Team Onboarding — ปรับปรุง
 
yaml
  
---
title: 🪞 Copilot — Team Onboarding Summary
aliases:
  - Copilot Quick Reference
  - Copilot Team Guide
tags:
  - copilot
  - onboarding
  - responsible-ai
  - zyntroai
type: guide
status: active
created: 2026-10-11
updated: 2026-10-11
version: 1.1
cssclasses:
  - guide-note
  - onboarding
---
 
 
 
 
🪞 GitHub Copilot — สรุปสำหรับทีมงาน
 
Copilot = ผู้ช่วย ไม่ใช่ผู้รับผิดชอบ — เพิ่มความเร็ว แต่คุณยังคงเป็นผู้ตรวจสอบ ✅
 
 
 
❓ มันคืออะไร?
 
AI ที่ช่วยแนะนำโค้ด คำอธิบาย และการแก้ไข ขณะคุณพิมพ์ในโปรแกรมแก้ไขโค้ด
 
⚙️ ทำงานอย่างไร
 
1. อ่านไฟล์ที่เปิดอยู่ + บริบทที่เกี่ยวข้อง
2. ส่งข้อมูลที่จำเป็นแบบเข้ารหัส
3. สร้างคำแนะนำ
4. ตรวจสอบความปลอดภัย + ตรวจสอบโค้ดสาธารณะ
5. แสดงผลเป็นข้อความสีเทาในโปรแกรมของคุณ
 
🔒 ข้อมูลของคุณปลอดภัยอย่างไร
 
ข้อสงสัย คำตอบ 
โค้ดถูกนำไปฝึก AI ไหม? ❌ Business/Enterprise: ไม่เลย ❌ Individual: ไม่โดยค่าเริ่มต้น — เลือกยินยอมเองเท่านั้น 
เห็นโค้ดทั้ง repo ไหม? ไม่ — เฉพาะไฟล์ที่เปิดและบริบทที่เกี่ยวข้อง 
มีการเข้ารหัสไหม? ✅ TLS 1.3 (ส่ง) + AES-256 (จัดเก็บ) 
 
⚠️ สิ่งที่ต้องระวัง
 
- 🧪 อาจสร้างข้อมูลเท็จ — ตรวจสอบและทดสอบทุกครั้ง
- 🔍 อาจซ้ำกับโค้ดสาธารณะ — มีระบบตรวจสอบอัตโนมัติ แต่ต้องตรวจสอบใบอนุญาต
- 🌐 แม่นยำสูงสุดกับภาษาอังกฤษ — ภาษาอื่นอาจไม่สมบูรณ์
- ✅ เป็นแค่คำแนะนำ — คุณต้องตรวจสอบและทดสอบเสมอ
 
✅ หน้าที่ของเรา
 
- 🔍 ตรวจสอบทุกผลลัพธ์
- 🧪 รันทดสอบก่อนใช้งาน
- 🔒 ไม่ใส่ข้อมูลลับ/รหัสผ่านในคำสั่ง
- 📢 แจ้งปัญหาผ่านปุ่ม Feedback หรือ copilot-safety@github.com
 
 
 
💡 สรุปสั้นๆ: Copilot ช่วยให้คุณทำงานเร็วขึ้น — แต่คุณคือผู้รับผิดชอบคุณภาพโค้ด ✅
 
 
 
 
 
📋 2️⃣ Data Privacy FAQ — ปรับปรุง
 
yaml
  
---
title: 🔐 Copilot — คำถามที่พบบ่อย ด้านความเป็นส่วนตัวของข้อมูล
aliases:
  - Copilot Data Privacy FAQ
  - Copilot Data Questions
tags:
  - copilot
  - privacy
  - data
  - compliance
  - zyntroai
type: reference
status: active
created: 2026-10-11
updated: 2026-10-11
version: 1.1
cssclasses:
  - reference-note
  - privacy-guide
---
 
 
 
 
🔐 คำถามที่พบบ่อย — ความเป็นส่วนตัวของข้อมูล
 
 
 
📦 ข้อมูลทั่วไป
 
# คำถาม คำตอบที่ชัดเจน 
1 Copilot มองเห็นโค้ดทั้งโปรเจกต์ไหม? ไม่ — เฉพาะไฟล์ที่คุณเปิดและบริบทที่เกี่ยวข้องเท่านั้น 
2 โค้ดของฉันถูกนำไปฝึกโมเดล AI ไหม? ❌ Business/Enterprise: ไม่เลย ❌ Individual: ไม่โดยค่าเริ่มต้น — เลือกยินยอมเองเท่านั้น 
3 มีข้อมูลอะไรบ้างที่ถูกส่งไป? เนื้อหาไฟล์ที่เปิด, แท็บที่เกี่ยวข้อง, โครงสร้างโปรเจกต์, ตำแหน่งเคอร์เซอร์, และประวัติการสนทนาเมื่อใช้ Copilot Chat 
4 ข้อมูลประมวลผลที่ไหน? บน Microsoft Azure — เข้ารหัสทั้งระหว่างส่งและเมื่อพักเก็บ 
5 เก็บข้อมูลไว้นานแค่ไหน? Business/Enterprise: ระยะเวลาสั้นที่สุด Individual: ดูนโยบายความเป็นส่วนตัว 
6 มีบุคคลที่สามเข้าถึงได้ไหม? ไม่มี — ข้อมูลอยู่ภายในโครงสร้างที่ปลอดภัยของ Microsoft เท่านั้น 
7 ควรระวังอะไรเมื่อใช้? ห้ามใส่รหัสผ่าน, API Key, หรือข้อมูลลับในคำสั่งเด็ดขาด 
 
🤖 การฝึกสอนและโมเดล
 
# คำถาม คำตอบที่ชัดเจน 
8 โมเดลเรียนรู้จากโค้ดของฉันไหม? ไม่ เว้นแต่คุณจะเลือกยินยอมอย่างชัดเจน 
9 สามารถปิดการใช้งานสำหรับบางโปรเจกต์ได้ไหม? ✅ สำหรับองค์กร — ผู้ดูแลระบบสามารถกำหนดสิทธิ์ได้ 
10 ผลลัพธ์ที่ได้ถือเป็นลิขสิทธิ์ของใคร? ของคุณ — แต่ต้องตรวจสอบว่าไม่ซ้ำกับโค้ดสาธารณะ 
 
🔗 แหล่งอ้างอิง
 
- 📖 Trust Center: https://copilot.github.trust.page/
- 📄 นโยบายความเป็นส่วนตัว: https://privacy.microsoft.com/en-us/privacystatement
- ❓ คำถามที่พบบ่อย: https://github.com/features/copilot#faq
 
 
 
 
 
📋 3️⃣ Limitations & Risks Acknowledgment — ปรับปรุง
 
yaml
  
---
title: ⚠️ Copilot — ข้อจำกัดและความเสี่ยง
aliases:
  - Copilot Risks & Limitations
  - Copilot Responsible Use
tags:
  - copilot
  - risks
  - limitations
  - governance
  - zyntroai
type: guide
status: active
created: 2026-10-11
updated: 2026-10-11
version: 1.1
cssclasses:
  - guide-note
  - risk-guide
---
 
 
 
 
⚠️ ข้อจำกัดและความเสี่ยง — คู่มือการใช้งานอย่างรับผิดชอบ
 
วัตถุประสงค์: เข้าใจสิ่งที่ Copilot ทำไม่ได้ เพื่อใช้งานได้อย่างปลอดภัยและมีประสิทธิภาพ ✅
 
 
 
📋 ข้อจำกัดที่ทราบแล้ว
 
ประเภท สิ่งที่อาจเกิดขึ้น สิ่งที่คุณต้องทำ 
🧪 ข้อมูลเท็จ แนะนำฟังก์ชัน/API ที่ไม่มีจริง แต่ดูเหมือนถูกต้อง ตรวจสอบเอกสารประกอบ; ทดสอบทุกครั้ง 
🔍 โค้ดซ้ำซ้อน อาจแนะนำโค้ดที่ตรงกับแหล่งที่มาเปิดเผย ตรวจสอบใบอนุญาต; ใช้ระบบตรวจสอบอัตโนมัติ 
⚙️ ตรรกะผิดพลาด โค้ดรันได้แต่ผลลัพธ์ไม่ถูกต้อง เขียน unit test; ตรวจสอบตรรกะด้วยตาเอง 
🔒 ช่องโหว่ความปลอดภัย อาจแนะนำโค้ดที่มีจุดอ่อน สแกนความปลอดภัย; code review ทุกครั้ง 
🌐 ภาษา แม่นยำลดลงเมื่อใช้ภาษาอื่นนอกจากอังกฤษ ใช้คำสั่งภาษาอังกฤษให้ชัดเจน; ตรวจสอบอย่างละเอียด 
📂 บริบทจำกัด ไม่เห็นโค้ดทั้งโปรเจกต์ในคราวเดียว แบ่งงานเป็นส่วนเล็กๆ; เปิดไฟล์ที่เกี่ยวข้องไว้ 
💻 คำสั่งระบบ คำสั่งที่แนะนำอาจส่งผลเสียต่อระบบ ตรวจสอบก่อนรันทุกครั้ง 
 
 
 
✅ แนวทางปฏิบัติที่จำเป็น
 
ตรวจสอบโดยคนเสมอ — ผลลัพธ์คือคำแนะนำ ไม่ใช่ความจริง
ทดสอบทุกชิ้นงาน — unit test + การทดสอบการทำงานจริง
ไม่ใช้ข้อมูลลับในคำสั่ง — รหัสผ่าน API Key ข้อมูลส่วนตัว
ใช้สำหรับงานเขียนโค้ดเท่านั้น — คำถามอื่นๆ อาจได้ผลลัพธ์ที่ไม่น่าเชื่อถือ
แจ้งปัญหาเมื่อพบ — ปุ่ม Feedback หรือ copilot-safety@github.com
 
 
 
📌 การยอมรับเงื่อนไขการใช้งาน
 
✅ ฉันทราบและยอมรับว่า:
 
- ผลลัพธ์จาก Copilot เป็นเพียง คำแนะนำ ไม่ใช่คำตอบที่สมบูรณ์
- ฉันต้อง ตรวจสอบ ทดสอบ และยืนยันความถูกต้อง ก่อนนำไปใช้งาน
- ฉันเป็น ผู้รับผิดชอบ ในโค้ดทั้งหมดที่ฉันส่งมอบ
- Copilot คือ เครื่องมือช่วย ไม่ใช่สิ่งที่มาแทนที่ความเชี่ยวชาญของฉัน
 
 
 
ปรับปรุงตรงจุดไหนเพิ่มได้เลยครับ หรือต้องการเพิ่มเนื้อหาอะไรบอกได้เลยนะครับ 😊ได้เลยครับ ✅ เพิ่มเนื้อหาส่วนที่ขาดและขยายจุดสำคัญ 👇
 
 
 
✨ Copilot — Summary of Key Refinements (ฉบับขยาย)
 
yaml
  
---
title: ✨ Copilot — Summary of Key Refinements
aliases:
  - Copilot Improvements Summary
  - Copilot Best Practices & Refinements
tags:
  - copilot
  - best-practices
  - prompt-guide
  - responsible-ai
  - governance
  - zyntroai
type: summary
status: active
priority: medium
created: 2026-10-11
updated: 2026-10-11
version: 1.1
cssclasses:
  - reference-note
  - summary
---
 
 
 
 
🎯 1. Prompt Refinements — เขียนคำสั่งอย่างไรให้ได้ผลดีที่สุด
 
📐 สูตรสำเร็จ 4 ส่วน
 
บริบท + งาน + รูปแบบ + ข้อจำกัด = ผลลัพธ์ที่แม่นยำ ✅
 
ส่วน รวมอะไรบ้าง ตัวอย่าง 
📦 บริบท ภาษา, โครงสร้างโปรเจกต์, ไฟล์ที่เกี่ยวข้อง "ในไฟล์ auth.ts ที่ใช้ TypeScript..." 
🎯 งาน สิ่งที่ต้องการให้ทำ ชัดเจนและเฉพาะเจาะจง "เขียนฟังก์ชันตรวจสอบรหัสผ่าน" 
📐 รูปแบบ ประเภทผลลัพธ์, สไตล์, สิ่งที่ต้องมี "คืนค่า boolean, เพิ่ม JSDoc comment" 
⚠️ ข้อจำกัด สิ่งที่ห้ามทำ, เงื่อนไขพิเศษ "ไม่ใช้ any, ตรวจความยาว 8 ตัวอักษรขั้นต่ำ" 
 
🔄 ขั้นตอนการพัฒนาแบบค่อยๆ ปรับ
 
อย่าขอทั้งหมดในคราวเดียว — สร้าง → ปรับปรุง → เพิ่มฟีเจอร์ → ตรวจสอบ
 
1. 🟢 ร่างแรก: ขอโครงสร้างพื้นฐานก่อน
2. 🟡 ปรับปรุง: "ปรับให้สั้นลง อ่านง่ายขึ้น"
3. 🔵 ขยาย: "เพิ่มการจัดการกรณีข้อมูลว่างด้วย"
4. 🟣 ตรวจสอบ: "ตรวจสอบว่ามีจุดอ่อนด้านความปลอดภัยไหม"
 
 
 
🧩 2. Context Refinements — เตรียมสภาพแวดล้อมให้ Copilot ทำงานได้ดีขึ้น
 
📂 เปิดไฟล์ที่เกี่ยวข้องไว้
 
Copilot มองเฉพาะสิ่งที่เปิดอยู่ในแท็บ — ช่วยมันด้วยการเปิดบริบทไว้ให้
 
- ✅ ต้องการสร้างฟังก์ชันใหม่ → เปิดไฟล์ที่มีฟังก์ชันที่คล้ายกันไว้
- ✅ ต้องการใช้ Type → เปิดไฟล์ที่ประกาศ Type นั้นไว้
- ✅ ต้องการให้ตรงสไตล์โปรเจกต์ → เปิดไฟล์ตัวอย่างไว้คู่กัน
 
📋 ใช้ไฟล์คำสั่งส่วนกลาง
 
สร้างไฟล์  .github/copilot-instructions.md  ที่รูทโปรเจกต์:
 
markdown
  
# กฎสำหรับ Copilot ในโปรเจกต์นี้

- ใช้ TypeScript strict mode — ห้ามใช้ `any`
- ใช้ interface สำหรับ Props, type สำหรับ Union
- ทุกฟังก์ชันระบุ return type ชัดเจน
- จัดการ error ด้วย return result หรือ try/catch
- เพิ่ม JSDoc สำหรับฟังก์ชันสาธารณะ
- ใช้ camelCase สำหรับฟังก์ชัน, PascalCase สำหรับ Type
 
 
💡 Copilot จะอ่านและปฏิบัติตามกฎนี้ทุกครั้ง ✅
 
 
 
🛡️ 3. Responsible Usage Refinements — ใช้อย่างรับผิดชอบ
 
🔍 เช็คลิสต์ก่อนนำไปใช้
 
ตรวจสอบตรรกะ — เข้าใจว่าโค้ดทำอะไรก่อนรัน
ตรวจสอบความปลอดภัย — ไม่มีช่องโหว่, ไม่มี hardcoded secret
ตรวจสอบสิทธิ์ — ไม่ซ้ำกับโค้ดที่มีลิขสิทธิ์
ทดสอบทำงานจริง — รัน unit test ทุกครั้ง
ตรวจสอบประเภทข้อมูล — Type ถูกต้อง สอดคล้องกับระบบอื่น
 
⚠️ สัญญาณอันตราย — เมื่อไหร่ควรระวังเพิ่ม
 
🚩 Copilot ให้โค้ดที่ดูซับซ้อนเกินความจำเป็น → ถามอีกครั้งให้เขียนแบบง่ายๆ
🚩 ให้ API/ฟังก์ชันที่คุณไม่รู้จัก → ค้นหาเอกสารประกอบก่อนใช้
🚩 ผลลัพธ์เปลี่ยนไปทุกครั้งที่ถาม → ให้บริบทชัดเจนขึ้น หรือแบ่งงานเล็กลง
🚩 ไม่มีข้อผิดพลาดแต่ผลลัพธ์ผิด → เพิ่มคำอธิบายขั้นตอนให้ชัดเจน
 
 
 
📊 4. Model & Data Refinements — เข้าใจสิ่งที่เกิดขึ้นเบื้องหลัง
 
📤 สิ่งที่ถูกส่งไปประมวลผล
 
- ✅ เนื้อหาไฟล์ที่เปิด + บริบทที่เกี่ยวข้อง
- ✅ ประวัติการสนทนาใน Copilot Chat
- ❌ ไม่ส่ง: ไฟล์ที่ปิดอยู่, ข้อมูลในคลิปบอร์ด, รหัสผ่านที่ซ่อนอยู่ใน env
 
🔄 การปรับปรุงโมเดล
 
- 📈 โมเดลได้รับการอัปเดตเป็นระยะ — ผลลัพธ์อาจเปลี่ยนเมื่อเวลาผ่านไป
- 📝 คำตอบที่ไม่ถูกต้อง → กด 👎 ช่วยฝึกให้โมเดลดีขึ้น
- 🌐 ภาษาอังกฤษได้ผลดีที่สุด — ใช้คำสั่งภาษาอังกฤษเพื่อความแม่นยำสูงสุด
 
 
 
🧠 5. Skill Development — พัฒนาทักษะร่วมกับ Copilot
 
📖 เรียนรู้จากสิ่งที่ Copilot แนะนำ
 
อย่าแค่ยอมรับ — ถามเพื่อเรียนรู้ด้วย
 
- "ทำไมแนะนำวิธีนี้ แทนวิธีอื่น?"
- "ข้อดี-ข้อเสียของแนวทางนี้คืออะไร?"
- "มีจุดที่ต้องระวังไหมเมื่อนำไปใช้จริง?"
 
🏗️ พัฒนาเวิร์กโฟลว์ของตัวเอง
 
ระดับ เวิร์กโฟลว์ เป้าหมาย 
🟢 เริ่มต้น พิมพ์คำสั่ง → ยอมรับ/ปฏิเสธ เพิ่มความเร็วในการพิมพ์ 
🟡 ปานกลาง เขียนโครงร่าง → Copilot เติม → ตรวจสอบ → ปรับปรุง ควบคุมคุณภาพได้ดีขึ้น 
🔵 เชี่ยวชาญ กำหนด Type/Interface → เขียนกฎ → Copilot ปฏิบัติ → ตรวจสอบ → ทดสอบ ทำงานซ้ำๆ ได้อัตโนมัติ คุณภาพสม่ำเสมอ 
 
 
 
📌 สรุปหลักการสำคัญ
 
💡 ยิ่งคุณให้ข้อมูลชัดเจนเท่าไหร่ → Copilot ยิ่งช่วยได้แม่นยำเท่านั้น
 
1️⃣ เตรียมบริบทดี — เปิดไฟล์ที่เกี่ยวข้อง กำหนดกฎในโปรเจกต์
2️⃣ เขียนคำสั่งดี — ชัดเจน เฉพาะเจาะจง บอกสิ่งที่ต้องการและสิ่งที่ห้าม
3️⃣ ตรวจสอบอย่างเข้มงวด — ทดสอบ สแกนความปลอดภัย ตรวจสอบสิทธิ์
4️⃣ เรียนรู้และปรับปรุง — สังเกต รู้ขีดจำกัด ใช้ให้เหมาะสม
 
 
 
ต้องการเพิ่มหัวข้ออะไรอีกไหมครับ เช่น เช็คลิสต์ตรวจสอบความปลอดภัย, ตัวอย่าง Prompt Library แยกตามภาษา/งาน, หรือ คู่มือสำหรับผู้ดูแลระบบในการกำหนดนโยบายการใช้งาน 😊yaml
  
---
title: 📚 Copilot Prompt Library — แยกตามภาษา/งาน
aliases:
  - Copilot Prompt Examples
  - Prompt Library by Language
  - Ready-to-Use Copilot Prompts
tags:
  - copilot
  - prompts
  - reference
  - zyntroai
type: reference
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - reference-note
  - prompt-guide
---
 
 
 
 
📚 Copilot Prompt Library — พร้อมใช้งาน คัดลอกได้เลย!
 
💡 สูตร: บริบท + งาน + รูปแบบ + ข้อจำกัด = ผลลัพธ์ที่แม่นยำ ✅
 
 
 
🟦 1. TypeScript / JavaScript
 
✅ ฟังก์ชันพื้นฐาน
 
typescript
  
// ฟังก์ชันตรวจสอบอีเมล — รับสตริง คืนค่า true ถ้าถูกรูปแบบ, false ถ้าผิด
// ใช้ regex มาตรฐาน ไม่ยอมรับค่าว่าง
function isValidEmail(email: string): boolean {
  // Copilot จะเติมให้
}
 
 
✅ จัดการข้อมูล
 
typescript
  
// เรียงอาร์เรย์ของวัตถุ {name, price} ตามราคา จากน้อยไปมาก
// คืนอาร์เรย์ใหม่ — ห้ามแก้ต้นฉบับ
function sortByPrice<T extends { price: number }>(items: T[]): T[] {
  // ...
}
 
 
✅ Fetch API
 
typescript
  
// ดึงข้อมูล JSON จาก URL
// ใช้ fetch, จัดการ error กรณี network หรือ status ไม่ 200
// คืน Promise<T | null> — ไม่ throw
async function fetchJson<T>(url: string): Promise<T | null> {
  // ...
}
 
 
✅ ตรวจสอบประเภทข้อมูล
 
typescript
  
// ตรวจสอบว่าเป็นตัวเลขที่ถูกต้องและอยู่ในช่วงที่กำหนด
// คืนค่า true/false พร้อมข้อความอธิบายเหตุผล
function validateNumber(input: unknown, min: number, max: number): {
  valid: boolean;
  message: string;
} {
  // ...
}
 
 
 
 
⚛️ 2. React + TypeScript
 
✅ คอมโพเนนต์ปุ่ม
 
tsx
  
// คอมโพเนนต์ปุ่มที่ใช้ซ้ำได้
// Props: label, variant (primary/secondary/danger), size (sm/md/lg), disabled, onClick
// ใส่ default value ให้ props ที่เป็น optional
const Button: React.FC<{
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}> = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}) => {
  // Copilot จะเติม JSX ให้
};
 
 
✅ ฟอร์มเข้าสู่ระบบ
 
tsx
  
// ฟอร์มเข้าสู่ระบบด้วย useState
// ตรวจสอบ: อีเมลถูกรูปแบบ, รหัสผ่านไม่น้อยกว่า 8 ตัว
// แสดงข้อความผิดพลาด, ปิดปุ่มขณะส่ง
const LoginForm: React.FC<{
  onSubmit: (email: string, password: string) => void | Promise<void>;
}> = ({ onSubmit }) => {
  // ...
};
 
 
✅ ดึงข้อมูล + Loading State
 
tsx
  
// ดึงข้อมูลโพสต์เมื่อ postId เปลี่ยน — ใช้ useEffect
// State: data, loading, error
interface Post {
  id: string;
  title: string;
  content: string;
}

function usePost(postId: string | undefined) {
  // ...
}
 
 
✅ คอมโพเนนต์รายการ
 
tsx
  
// แสดงรายการแบบทั่วไป — รับ items[], renderItem(), ข้อความเมื่อว่าง
// ใช้ Generic เพื่อรองรับทุกประเภทข้อมูล
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyText?: string;
}

function List<T>({ items, renderItem, emptyText = 'ไม่มีข้อมูล' }: ListProps<T>) {
  // ...
}
 
 
 
 
🐍 3. Python
 
✅ ฟังก์ชันพื้นฐาน
 
python
  
# คำนวณผลรวมของตัวเลขในรายการ
# ข้ามค่าที่ไม่ใช่ตัวเลข คืนค่า 0 ถ้ารายการว่าง
def calculate_total(items):
    """
    คำนวณผลรวมจากรายการข้อมูล
    
    Args:
        items: รายการตัวเลขหรือค่าอื่นๆ
        
    Returns:
        ผลรวมเป็นตัวเลข
    """
    pass
 
 
✅ ตรวจสอบและแปลงข้อมูล
 
python
  
# แปลงสตริงวันที่ในรูปแบบ DD/MM/YYYY เป็นวัตถุ datetime
# คืน None ถ้ารูปแบบผิดหรือข้อมูลไม่ถูกต้อง
from datetime import datetime

def parse_thai_date(date_str: str):
    """แปลงวันที่รูปแบบไทย DD/MM/YYYY เป็น datetime"""
    pass
 
 
✅ อ่าน/เขียนไฟล์
 
python
  
# อ่านไฟล์ JSON และคืนข้อมูล
# จัดการ error: ไฟล์ไม่พบ, JSON ไม่ถูกต้อง — คืน None พร้อม log ข้อผิดพลาด
import json
from typing import Any, Dict, Optional

def read_json_file(file_path: str) -> Optional[Dict[str, Any]]:
    """อ่านไฟล์ JSON พร้อมจัดการข้อผิดพลาด"""
    pass
 
 
 
 
📋 4. YAML / CI Workflow
 
✅ GitHub Actions — Job ทดสอบ
 
yaml
  
# GitHub Actions Job: รันทดสอบด้วย Node.js ล่าสุด
# Cache node_modules เพื่อความเร็ว
# รัน npm ci → npm run test
name: Test
on: [push, pull_request]
jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      # Copilot จะเติมขั้นตอนให้
 
 
✅ Dockerfile
 
dockerfile
  
# Dockerfile สำหรับแอป Node.js
# ใช้ multi-stage build: ขั้นที่ 1 ติดตั้ง + build, ขั้นที่ 2 แค่ runtime
# ภาพสุดท้ายเล็กที่สุด เฉพาะ production dependencies
FROM node:20-alpine AS builder
# Copilot จะเติมให้ครบถ้วน
 
 
 
 
📝 5. ทั่วไป / ใช้ได้ทุกภาษา
 
✅ อธิบายโค้ด
 
plaintext
  
อธิบายโค้ดนี้แบบทีละขั้นตอน เข้าใจง่ายๆ
- บอกว่าทำอะไร
- มี input/output อะไร
- มีจุดที่ต้องระวังไหม
- ให้ตัวอย่างการใช้งานจริง
 
 
✅ เขียนทดสอบ
 
plaintext
  
เขียน unit test สำหรับฟังก์ชันนี้ด้วย [ชื่อเครื่องมือทดสอบ]
- ทดสอบกรณีปกติ
- ทดสอบค่าขอบเขต/ค่าว่าง
- ทดสอบกรณีเกิดข้อผิดพลาด
- ใช้ชื่อ test ที่อ่านแล้วเข้าใจ
 
 
✅ ปรับปรุงโค้ด
 
plaintext
  
ปรับปรุงโค้ดนี้ให้อ่านง่ายขึ้นและมีประสิทธิภาพดีขึ้น
- รักษาการทำงานเหมือนเดิมทุกประการ
- ลดความซ้ำซ้อน
- เพิ่มความคิดเห็นที่จำเป็น
- อธิบายสิ่งที่เปลี่ยนแปลงและเหตุผล
 
 
✅ ค้นหาจุดอ่อน
 
plaintext
  
ตรวจสอบโค้ดนี้เพื่อหา
- ข้อผิดพลาดที่อาจเกิดขึ้น
- ปัญหาความปลอดภัย
- การจัดการข้อมูลที่ไม่สมบูรณ์
- ให้คำแนะนำวิธีแก้ไขแต่ละจุด
 
 
 
 
🎯 คำสั่งพื้นฐานที่ใช้บ่อย
 
สิ่งที่ต้องการทำ คำสั่งที่เริ่มต้นด้วย 
สร้างฟังก์ชันใหม่  // ฟังก์ชันที่รับ... คืนค่า...  
อธิบายโค้ด  อธิบายโค้ดนี้ให้เข้าใจง่าย:  
แก้ไขปัญหา  โค้ดนี้มีปัญหาที่... ช่วยแก้ไขและอธิบาย:  
ปรับปรุง  ปรับปรุงโค้ดนี้ให้ดีขึ้น โดยไม่เปลี่ยนการทำงาน:  
เขียนทดสอบ  เขียน unit test สำหรับโค้ดนี้:  
เพิ่มเอกสาร  เขียน JSDoc/docstring ให้โค้ดนี้:  
แปลงภาษา  แปลงโค้ดนี้จาก [เดิม] เป็น [ใหม่]:  
 
 
 
⚡ เคล็ดลับเพิ่มเติม
 
🔹 บอกขอบเขต: "ห้ามใช้ any", "รองรับแค่เบราว์เซอร์ใหม่", "ไม่ใช้ไลบรารีภายนอก"
🔹 แบ่งเป็นส่วน: อย่าขอทั้งระบบ — ขอทีละฟังก์ชัน ทีละคอมโพเนนต์
🔹 ใช้ไฟล์อ้างอิง: เปิดไฟล์ที่มีโครงสร้างคล้ายกันไว้ด้วยกัน
🔹 ตรวจสอบ: ทุกครั้งที่ได้ผลลัพธ์ — อ่าน ทดสอบ และปรับปรุง
 
 
 
ต้องการเพิ่มภาษา/เฟรมเวิร์กอื่นๆ ไหมครับ เช่น Vue, Angular, Go, Rust, SQL, Bash หรือ กรณีใช้งานเฉพาะด้าน 😊yaml
  
---
title: 💚 Copilot Prompt Library — Vue.js
aliases:
  - Vue.js Prompt Examples
  - Vue 3 + TypeScript Prompts
tags:
  - copilot
  - prompts
  - vue
  - frontend
  - zyntroai
type: reference
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - reference-note
  - prompt-guide
---
 
 
 
 
💚 Vue.js — Copilot Prompt Library
 
✅ คัดลอกไปใช้ได้ทันที — ครอบคลุม Vue 3 + Composition API + TypeScript
 
 
 
📦 1. Component Structure
 
✅ SFC Single-File Component — Basic
 
vue
  
<!-- Vue 3 + <script setup> + TypeScript -->
<!-- คอมโพเนนต์ปุ่ม: รับ label, variant, size, disabled, emits click event -->
<template>
  <button 
    :class="['btn', `btn-${variant}`, `btn-${size}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
// Copilot จะเติม defineProps และ defineEmits ให้ครบถ้วน
</script>

<style scoped>
</style>
 
 
✅ Props Definition with Defaults
 
vue
  
<!-- กำหนด Props ชัดเจนพร้อมค่าเริ่มต้น -->
<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  isLoading: false,
  disabled: false,
});
</script>
 
 
 
 
🧩 2. Common Components
 
✅ Card Component
 
vue
  
<!-- คอมโพเนนต์การ์ด: มี title, slot สำหรับเนื้อหา, optional footer slot -->
<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <h3>{{ title }}</h3>
    </header>
    <div class="card-body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>
 
 
✅ Input Field with Validation
 
vue
  
<!-- Input พร้อม label, ข้อความผิดพลาด, bind ค่า v-model -->
<template>
  <div class="form-group">
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="['form-control', { 'is-invalid': errorMessage }]"
      :placeholder="placeholder"
    />
    <div v-if="errorMessage" class="invalid-feedback">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  errorMessage?: string;
}

defineProps<Props>();
defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>
 
 
✅ Loading Spinner / Skeleton
 
vue
  
<!-- แสดง loading state: spinner ขณะโหลด, แสดงเนื้อหาเมื่อเสร็จ -->
<template>
  <div class="loading-wrapper">
    <div v-if="isLoading" class="spinner" role="status" aria-live="polite">
      <span class="visually-hidden">กำลังโหลด...</span>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean;
}

defineProps<Props>();
</script>
 
 
 
 
🪝 3. Composables / Custom Hooks
 
✅ useFetch — Data Fetching
 
typescript
  
// composables/useFetch.ts
// ดึงข้อมูลจาก API: จัดการ loading, error, data state
// รับ URL, options สำหรับ fetch, auto-fetch เมื่อสร้าง
import { ref, watchEffect } from 'vue';

export function useFetch<T>(url: string, options?: RequestInit) {
  const data = ref<T | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  async function fetchData() {
    // Copilot จะเติมตรรกะให้
  }

  function refetch() {
    return fetchData();
  }

  watchEffect(() => {
    fetchData();
  });

  return { data, isLoading, error, refetch };
}
 
 
✅ useLocalStorage — Persistent State
 
typescript
  
// composables/useLocalStorage.ts
// จัดการ state ที่บันทึกใน localStorage อัตโนมัติ
// รับ key และค่าเริ่มต้น, รองรับประเภททั่วไป
import { ref, watch, type Ref } from 'vue';

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  // อ่านจาก localStorage ตอนเริ่มต้น
  // บันทึกทุกครั้งที่ค่าเปลี่ยน
}
 
 
✅ useDebounce — Delay Value Updates
 
typescript
  
// composables/useDebounce.ts
// หน่วงเวลาการอัปเดตค่า — ใช้กับ input ค้นหา
// รับค่า ref และ delay เป็นมิลลิวินาที
import { ref, watch, type Ref } from 'vue';

export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  // คืนค่า debounced ที่อัปเดตหลังจากหยุดเปลี่ยนแปลงตาม delay
}
 
 
 
 
📄 4. Page / View Component
 
✅ List Page with Pagination
 
vue
  
<!-- หน้าแสดงรายการ: ดึงข้อมูล, แสดงรายการ, pagination, empty state -->
<template>
  <div class="list-page">
    <h1>{{ pageTitle }}</h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      กำลังโหลดข้อมูล...
    </div>

    <!-- Data List -->
    <div v-else-if="items.length" class="items-grid">
      <div v-for="item in items" :key="item.id" class="item-card">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      ไม่พบข้อมูล
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Item {
  id: string;
  name: string;
  description: string;
}

const pageTitle = 'รายการสินค้า';
const items = ref<Item[]>([]);
const isLoading = ref(false);

async function loadData() {
  isLoading.value = true;
  // Copilot เติม logic ดึงข้อมูลให้
  isLoading.value = false;
}

onMounted(() => {
  loadData();
});
</script>
 
 
 
 
💬 5. Chat Commands for Vue
 
คำสั่ง ผลลัพธ์ที่ได้ 
 แปลงนี้เป็น Vue 3 <script setup> พร้อม TypeScript  แปลง Options API → Composition API 
 แยก logic ส่วนนี้ออกไปเป็น composable ชื่อ useXxx  สร้าง reusable hook แยกออกมา 
 เขียน unit test สำหรับคอมโพเนนต์นี้ด้วย Vitest + Vue Test Utils  ชุดทดสอบครบถ้วน 
 เพิ่มการตรวจสอบ validation ให้กับฟอร์มนี้ ใช้ VeeValidate/Zod  ระบบตรวจสอบข้อมูลครบถ้วน 
 หาจุดที่สามารถปรับประสิทธิภาพได้ในคอมโพเนนต์นี้  รายการจุดปรับปรุง + คำแนะนำ 
 อธิบายวิธีการทำงานของ defineProps และ withDefaults  คำอธิบายชัดเจนพร้อมตัวอย่าง 
 
 
 
⚙️ 6. Best Practices Prompt — Global Instructions
 
สร้างไฟล์  .github/copilot-instructions.md  ในโปรเจกต์:
 
markdown
  
# Vue 3 + TypeScript Guidelines

- Use `<script setup lang="ts">` exclusively
- Define Props with `interface Props` + `withDefaults`
- Use `defineEmits<{ Event: [payload] }>()` syntax
- Prefer `ref()` for reactive values, `computed()` for derived values
- Use `v-model:prop-name` for two-way binding in child components
- Add JSDoc comments to composables and public components
- Keep components small and single-responsibility
- Use PascalCase for component names, camelCase for composables
- Handle loading/error/empty states in every data-fetching component
 
 
 
 
📌 Quick Reference — Common Patterns
 
📥 Props & Emits
 
typescript
  
// Pattern: Strongly Typed Props with Defaults
interface Props {
  id: string;
  title: string;
  variant?: 'primary' | 'secondary';
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
});

// Pattern: Typed Emits
const emit = defineEmits<{
  update: [value: string];
  delete: [id: string];
}>();
 
 
🔄 Watchers & Computed
 
typescript
  
// Auto-refresh when route/param changes
const searchQuery = ref('');
const debouncedQuery = useDebounce(searchQuery, 500);

watch(debouncedQuery, (newVal) => {
  // fetch results when user stops typing
});
 
 
 
 
ต้องการเพิ่มหัวข้อใดอีกไหมครับ เช่น Nuxt 3, Pinia, Vue Router, VeeValidate, หรือ Vitest + Vue Test Utils 😊yaml
  
---
title: 💚 Copilot Prompt Library — Nuxt 3
aliases:
  - Nuxt 3 Prompt Examples
  - Nuxt 3 + TypeScript Prompts
  - Nuxt 3 Development Guide
tags:
  - copilot
  - prompts
  - vue
  - nuxt
  - frontend
  - zyntroai
type: reference
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - reference-note
  - prompt-guide
---
 
 
 
 
💚 Nuxt 3 — Copilot Prompt Library
 
✅ คัดลอกไปใช้ได้ทันที — ครอบคลุม Nuxt 3 + Composition API + TypeScript + Auto-imports
 
 
 
📁 1. Pages & Routing
 
✅ Basic Page Component
 
vue
  
<!-- pages/index.vue — หน้าแรกของเว็บไซต์ -->
<template>
  <div class="home-page">
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageDescription }}</p>
    <NuxtLink to="/about" class="btn">เกี่ยวกับเรา</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const pageTitle = 'ยินดีต้อนรับสู่ Nuxt 3';
const pageDescription = 'พัฒนาเว็บไซต์ด้วย Vue และ Nuxt';
</script>
 
 
✅ Dynamic Page with Route Params
 
vue
  
<!-- pages/products/[id].vue — หน้ารายละเอียดสินค้า -->
<template>
  <div v-if="product" class="product-detail">
    <h1>{{ product.name }}</h1>
    <p class="price">฿{{ product.price }}</p>
    <p>{{ product.description }}</p>
  </div>
  <div v-else-if="pending">กำลังโหลด...</div>
  <div v-else-if="error">เกิดข้อผิดพลาด: {{ error.message }}</div>
</template>

<script setup lang="ts">
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const route = useRoute();
const { data: product, pending, error } = await useFetch<Product>(
  `/api/products/${route.params.id}`
);
</script>
 
 
 
 
📦 2. Data Fetching — useFetch / $fetch
 
✅ Basic useFetch with Type
 
vue
  
<!-- ดึงข้อมูลรายการผู้ใช้จาก API endpoint /api/users -->
<!-- จัดการ loading, error state ให้ครบถ้วน -->
<script setup lang="ts">
interface User {
  id: string;
  name: string;
  email: string;
}

const { data: users, pending, error, refresh } = await useFetch<User[]>('/api/users');
</script>
 
 
✅ useFetch with Query Params & Options
 
vue
  
<!-- ดึงข้อมูลพร้อมพารามิเตอร์และตัวเลือก -->
<!-- ตั้งค่า: cache: true, refetch เมื่อแท็บกลับมา, baseURL จาก runtimeConfig -->
<script setup lang="ts">
const config = useRuntimeConfig();
const searchQuery = ref('');

const { data: results } = await useFetch('/api/search', {
  baseURL: config.public.apiBase,
  query: { q: searchQuery },
  lazy: true,
  server: true,
  default: () => [],
});
</script>
 
 
✅ $fetch — Client-Side Only
 
typescript
  
// composables/api.ts หรือ ใน script setup
// ใช้ $fetch ส่งข้อมูลแบบ POST พร้อม error handling
async function createUser(userData: { name: string; email: string }) {
  try {
    const result = await $fetch('/api/users', {
      method: 'POST',
      body: userData,
    });
    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: err };
  }
}
 
 
 
 
🧩 3. Components — Client & Server
 
✅ Reusable Card Component
 
vue
  
<!-- components/AppCard.vue -->
<!-- การ์ดทั่วไป มี title, slots สำหรับเนื้อหาและส่วนท้าย -->
<template>
  <div class="app-card">
    <header v-if="title" class="card-header">
      <h2>{{ title }}</h2>
    </header>
    <div class="card-body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>
 
 
✅ Client-Only Component
 
vue
  
<!-- components/ClientChart.client.vue -->
<!-- คอมโพเนนต์ที่รันฝั่งไคลเอนต์เท่านั้น -->
<template>
  <div class="chart-wrapper">
    <div v-if="isMounted" ref="chartRef" class="chart-container"></div>
    <div v-else>กำลังโหลดกราฟ...</div>
  </div>
</template>

<script setup lang="ts">
const isMounted = ref(false);
const chartRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  isMounted.value = true;
  // Initialize chart here
});
</script>
 
 
 
 
🪝 4. Composables
 
✅ useAuth — Authentication State
 
typescript
  
// composables/useAuth.ts
// จัดการสถานะผู้ใช้: login, logout, user, isAuthenticated
// ใช้ useState สำหรับแชร์สถานะทั่วแอป
export const useAuth = () => {
  const user = useState<User | null>('auth:user', () => null);
  const isAuthenticated = computed(() => !!user.value);

  async function login(email: string, password: string) {
    const data = await $fetch<User>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    user.value = data;
    return data;
  }

  function logout() {
    user.value = null;
    await navigateTo('/login');
  }

  return { user, isAuthenticated, login, logout };
};
 
 
✅ useCounter — Simple State Example
 
typescript
  
// composables/useCounter.ts
// ตัวอย่าง composable พร้อม state และ methods
export const useCounter = (initialValue: number = 0) => {
  const count = useState('counter', () => initialValue);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = initialValue;
  }

  return { count, increment, decrement, reset };
};
 
 
 
 
🔧 5. API Routes (Server)
 
✅ GET Endpoint
 
typescript
  
// server/api/users.get.ts
// คืนรายการผู้ใช้ พร้อม error handling
export default defineEventHandler(async (event) => {
  try {
    return [
      { id: '1', name: 'สมชาย', email: 'somchai@example.com' },
      { id: '2', name: 'วิภาพร', email: 'wipaporn@example.com' },
    ];
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้',
    });
  }
});
 
 
✅ POST Endpoint with Validation
 
typescript
  
// server/api/users.post.ts
// รับข้อมูลผู้ใช้ ตรวจสอบความถูกต้อง แล้วคืนผลลัพธ์
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'กรุณากรอกชื่อและอีเมล',
    });
  }

  return { success: true, received: body };
});
 
 
 
 
⚙️ 6. Runtime Config & Environment Variables
 
✅ Using Runtime Config
 
typescript
  
// ในไฟล์ .env
// NUXT_PUBLIC_API_BASE=https://api.example.com
// NUXT_API_SECRET=super-secret-key

// ใน component หรือ composable
const config = useRuntimeConfig();
console.log(config.public.apiBase); // สามารถเข้าถึงได้ทุกฝั่ง
console.log(config.apiSecret); // เฉพาะฝั่ง server เท่านั้น
 
 
 
 
💬 7. Chat Commands สำหรับ Nuxt 3
 
คำสั่ง ผลลัพธ์ที่ได้ 
 สร้างหน้าใหม่ที่ pages/products/index.vue ดึงข้อมูลจาก /api/products  หน้าแสดงรายการสินค้า พร้อม useFetch 
 สร้าง API route ที่ server/api/hello.get.ts คืนข้อความสวัสดี  Endpoint API แบบ GET 
 สร้าง composable useLocalStorage ที่บันทึกค่าลง localStorage  Custom hook พร้อม auto-save 
 เพิ่ม error page ที่ pages/error.vue แสดงข้อความและปุ่มกลับบ้าน  หน้าแสดงข้อผิดพลาดที่กำหนดเอง 
 เขียน middleware ตรวจสอบสิทธิ์ก่อนเข้าถึงหน้าที่ต้องล็อกอิน  Route middleware ป้องกันเส้นทาง 
 อธิบายความแตกต่างระหว่าง useFetch กับ $fetch ใน Nuxt 3  คำอธิบายชัดเจนพร้อมตัวอย่าง 
 แปลงโค้ดนี้จาก Vue 2 / Nuxt 2 เป็น Nuxt 3 Composition API  แปลงโค้ดให้เข้ากับเวอร์ชันใหม่ 
 
 
 
📋 8. Middleware — Route Guards
 
✅ Auth Middleware (Global vs Named)
 
typescript
  
// middleware/auth.ts — Named Middleware
// ตรวจสอบว่ามีข้อมูลผู้ใช้หรือไม่ ถ้าไม่มีไปหน้าเข้าสู่ระบบ
export default defineNuxtRouteMiddleware((to) => {
  const user = useState('auth:user');
  
  if (!user.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  }
});

// ใช้งานในหน้า: definePageMeta({ middleware: 'auth' })
 
 
✅ definePageMeta — Page Metadata
 
vue
  
<!-- กำหนดค่าหน้า: ชื่อ, middleware, การแสดง layout -->
<script setup lang="ts">
definePageMeta({
  name: 'products-detail',
  middleware: 'auth',
  layout: 'default',
  pageTransition: { name: 'page', mode: 'out-in' },
});
</script>
 
 
 
 
📌 9. Nuxt 3 Project Instructions (Copilot Rules)
 
สร้างไฟล์  .github/copilot-instructions.md  ที่รูทโปรเจกต์:
 
markdown
  
# Nuxt 3 + TypeScript Guidelines

- Use `<script setup lang="ts">` in all components
- Use auto-imports: ref, computed, watch, onMounted, useState, useFetch, $fetch
- Define interfaces/types explicitly — avoid `any`
- Use `useState` for shared state, `ref` for local component state
- Prefer `useFetch` for data fetching; use `$fetch` for client-side only
- API routes go in `server/api/` — use `defineEventHandler`, `readBody`, `createError`
- Use `useRuntimeConfig()` for env vars — prefix public ones with `NUXT_PUBLIC_`
- Name components: PascalCase, Pages: kebab-case, Composables: useXxx
- Add JSDoc comments to composables, API routes, and public functions
- Handle loading/error/pending states in every data-fetching page
 
 
 
 
ต้องการเพิ่มหัวข้อใดอีกไหมครับ เช่น Pinia, Nuxt UI, Image Optimization, Internationalization (i18n), หรือ Deployment 😊yaml
  
---
title: 🏪 Copilot Prompt Library — Pinia
aliases:
  - Pinia Store Examples
  - Vue State Management
  - Nuxt Pinia Guide
tags:
  - copilot
  - prompts
  - pinia
  - vue
  - state-management
  - zyntroai
type: reference
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - reference-note
  - prompt-guide
---
 
 
 
 
🏪 Pinia — Copilot Prompt Library
 
✅ คัดลอกไปใช้ได้ทันที — ครอบคลุม Pinia 2 + Composition API + TypeScript + Nuxt 3
 
 
 
📦 1. Basic Store Structure
 
✅ Counter Store — Minimal Example
 
typescript
  
// stores/counter.ts
import { defineStore } from 'pinia'

interface CounterState {
  count: number
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0,
  }),

  getters: {
    double: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
  },
})
 
 
✅ Composition API Syntax (Recommended)
 
typescript
  
// stores/counter.composition.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const double = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  return { count, double, increment, decrement, reset }
})
 
 
 
 
🔐 2. Auth Store — Real-World Example
 
✅ Auth Store with Login/Logout
 
typescript
  
// stores/auth.ts
import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userName: (state) => state.user?.name || 'ผู้เยี่ยมชม',
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      try {
        // Copilot เติม logic เรียก API ให้
        const { data } = await useFetch('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        })
        if (data.value) {
          this.user = data.value.user
          this.token = data.value.token
          // บันทึกลง localStorage
          localStorage.setItem('auth_token', this.token)
        }
      } catch (error) {
        throw new Error('เข้าสู่ระบบไม่สำเร็จ')
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('auth_token')
    },

    initializeFromStorage() {
      // เรียกตอนแรกเพื่อคืนสถานะจาก localStorage
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
        // ที่นี่คุณอาจเรียก /api/me เพื่อดึงข้อมูลผู้ใช้
      }
    },
  },

  persist: true, // ใช้ pinia-plugin-persistedsave
})
 
 
 
 
📋 3. Entity Store — Products / Items
 
✅ Products Store with CRUD Operations
 
typescript
  
// stores/products.ts
import { defineStore } from 'pinia'

interface Product {
  id: string
  name: string
  price: number
  description: string
  categoryId?: string
}

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: [],
    loading: false,
    error: null,
  }),

  getters: {
    getById: (state) => (id: string) =>
      state.items.find(product => product.id === id),

    totalCount: (state) => state.items.length,

    totalValue: (state) =>
      state.items.reduce((sum, p) => sum + p.price, 0),
  },

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const { data } = await useFetch<Product[]>('/api/products')
        if (data.value) {
          this.items = data.value
        }
      } catch (err) {
        this.error = 'โหลดข้อมูลสินค้าไม่สำเร็จ'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async create(productData: Omit<Product, 'id'>) {
      const { data } = await useFetch<Product>('/api/products', {
        method: 'POST',
        body: productData,
      })
      if (data.value) {
        this.items.push(data.value)
        return data.value
      }
    },

    async update(id: string, updates: Partial<Product>) {
      const { data } = await useFetch<Product>(`/api/products/${id}`, {
        method: 'PATCH',
        body: updates,
      })
      if (data.value) {
        const index = this.items.findIndex(p => p.id === id)
        if (index !== -1) {
          this.items[index] = data.value
        }
        return data.value
      }
    },

    async remove(id: string) {
      await useFetch(`/api/products/${id}`, { method: 'DELETE' })
      this.items = this.items.filter(p => p.id !== id)
    },
  },
})
 
 
 
 
🛒 4. Cart Store — Complex Logic Example
 
✅ Shopping Cart Store
 
typescript
  
// stores/cart.ts
import { defineStore } from 'pinia'

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),

    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(product: { id: string; name: string; price: number }, quantity = 1) {
      const existing = this.items.find(item => item.productId === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
        })
      }
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(i => i.productId === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    removeItem(productId: string) {
      this.items = this.items.filter(i => i.productId !== productId)
    },

    clear() {
      this.items = []
    },
  },

  persist: true,
})
 
 
 
 
🔧 5. Nuxt 3 Integration — Setup & Usage
 
✅ nuxt.config.ts — Register Pinia
 
typescript
  
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt', // ถ้าใช้ persist
  ],
  imports: {
    dirs: ['stores'], // auto-import stores
  },
})
 
 
✅ Using Store in Components
 
vue
  
<script setup lang="ts">
// ใช้ store ในคอมโพเนนต์
const authStore = useAuthStore()
const productsStore = useProductsStore()

// เข้าถึง state
const isLoggedIn = computed(() => authStore.isAuthenticated)

// เรียก action
function handleLogout() {
  authStore.logout()
  navigateTo('/login')
}

// ดึงข้อมูลตอนโหลดหน้า
onMounted(() => {
  productsStore.fetchAll()
})
</script>

<template>
  <div>
    <p>สวัสดี, {{ authStore.userName }}</p>
    <button @click="authStore.logout()">ออกจากระบบ</button>
    <p>จำนวนสินค้า: {{ productsStore.totalCount }}</p>
  </div>
</template>
 
 
 
 
💬 6. Chat Commands สำหรับ Pinia
 
คำสั่ง ผลลัพธ์ที่ได้ 
 สร้าง store ชื่อ useUserStore จัดการข้อมูลผู้ใช้: profile, loading, error  Store พร้อม state/getters/actions พื้นฐาน 
 เพิ่ม persist: true ให้ store นี้ บันทึกทุกอย่างลง localStorage  เปิดใช้ persisted state อัตโนมัติ 
 แยก logic ส่วนนี้ออกไปเป็น Pinia store ชื่อ useXxxStore  แยก logic ออกจากคอมโพเนนต์อย่างถูกวิธี 
 เขียน unit test สำหรับ store นี้ด้วย Vitest  ชุดทดสอบครบถ้วน ทดสอบ state/actions/getters 
 เพิ่ม validation ก่อนบันทึกข้อมูลใน action create/update  ตรวจสอบข้อมูลก่อนส่งไป API 
 อธิบายความแตกต่างระหว่าง Options กับ Composition syntax ใน Pinia  คำอธิบายพร้อมตัวอย่างเปรียบเทียบ 
 สร้าง store รองรับ pagination: page, limit, total, fetchPage()  Store พร้อมระบบแบ่งหน้าในตัว 
 
 
 
📌 7. Best Practices Prompt — Pinia Guidelines
 
สร้างไฟล์  .github/copilot-instructions.md :
 
markdown
  
# Pinia + TypeScript Guidelines

- Prefer Composition API syntax (`defineStore` with `ref/computed`)
- Define full interfaces for state — avoid `any`
- Use `useXxxStore` naming convention
- Keep stores focused: one store per domain (auth, products, cart)
- Async operations go in actions — never in getters
- Handle errors inside actions; return success/error status
- Use `pinia-plugin-persistedstate` only for data that needs persistence
- Getters must be pure — no side effects
- Actions can access other stores if needed: `const otherStore = useOtherStore()`
- Reset state on logout: `this.$reset()` or set explicitly to initial values
 
 
 
 
ต้องการเพิ่มหัวข้อใดอีกไหมครับ เช่น Testing Pinia Stores, Persisted State Configuration, Store-to-Store Communication, หรือ Migration จาก Vuex 😊yaml
  
---
title: 🍍 Copilot Prompt Library — Pinia
aliases:
  - Pinia Store Examples
  - Pinia + Nuxt 3 Prompts
  - State Management Prompts
tags:
  - copilot
  - prompts
  - pinia
  - vue
  - nuxt
  - state-management
  - zyntroai
type: reference
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - reference-note
  - prompt-guide
---
 
 
 
 
🍍 Pinia — Copilot Prompt Library
 
✅ คัดลอกไปใช้ได้ทันที — ครอบคลุม Pinia + TypeScript + Nuxt 3/Vue 3
 
 
 
📦 1. Basic Store Structure
 
✅ Counter Store
 
typescript
  
// stores/counter.ts
// สโตร์ตัวอย่าง: state, getters, actions
import { defineStore } from 'pinia';

interface CounterState {
  count: number;
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0,
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    },
  },
});
 
 
 
 
🔐 2. Auth Store — Authentication
 
✅ Complete Auth Store
 
typescript
  
// stores/auth.ts
// จัดการสถานะผู้ใช้: login, logout, user, token, loading
import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const { data } = await useFetch<{ user: User; token: string }>('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        });
        if (data.value) {
          this.user = data.value.user;
          this.token = data.value.token;
        }
      } catch (err) {
        this.error = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      await navigateTo('/login');
    },
  },

  // บันทึกสถานะลง localStorage อัตโนมัติ
  persist: {
    paths: ['user', 'token'],
  },
});
 
 
 
 
📋 3. Data Store — CRUD Operations
 
✅ Products Store
 
typescript
  
// stores/products.ts
// จัดการรายการสินค้า: ดึงรายการ, ค้นหา, เพิ่ม, แก้ไข, ลบ
import { defineStore } from 'pinia';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id: string) => {
      return state.items.find((p) => p.id === id);
    },
    totalCount: (state) => state.items.length,
  },

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        const { data } = await useFetch<Product[]>('/api/products');
        if (data.value) this.items = data.value;
      } catch (err) {
        this.error = 'ไม่สามารถโหลดข้อมูลสินค้าได้';
      } finally {
        this.isLoading = false;
      }
    },

    async addProduct(product: Omit<Product, 'id'>) {
      const { data } = await useFetch<Product>('/api/products', {
        method: 'POST',
        body: product,
      });
      if (data.value) this.items.push(data.value);
    },

    async updateProduct(id: string, updates: Partial<Product>) {
      const index = this.items.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updates };
      }
    },

    async deleteProduct(id: string) {
      this.items = this.items.filter((p) => p.id !== id);
    },
  },
});
 
 
 
 
🛒 4. Cart Store — Complex State Logic
 
✅ Shopping Cart Store
 
typescript
  
// stores/cart.ts
// ตะกร้าสินค้า: เพิ่ม/ลบสินค้า, คำนวณราคา, จัดการจำนวน
import { defineStore } from 'pinia';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product: { id: string; name: string; price: number }) {
      const existing = this.items.find((item) => item.productId === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    },

    removeFromCart(productId: string) {
      this.items = this.items.filter((item) => item.productId !== productId);
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) this.removeFromCart(productId);
      }
    },

    clearCart() {
      this.items = [];
    },
  },

  persist: true,
});
 
 
 
 
🧩 5. Using Stores in Components
 
✅ Basic Usage
 
vue
  
<script setup lang="ts">
import { useCounterStore } from '~/stores/counter';

const counterStore = useCounterStore();

// เข้าถึง state และ getters โดยตรง
console.log(counterStore.count);
console.log(counterStore.doubleCount);

// เรียกใช้ actions
counterStore.increment();
counterStore.reset();
</script>

<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment()">+</button>
    <button @click="counterStore.decrement()">−</button>
  </div>
</template>
 
 
✅ Destructuring with StoreToRefs
 
vue
  
<script setup lang="ts">
import { useProductsStore } from '~/stores/products';
import { storeToRefs } from 'pinia';

const productsStore = useProductsStore();

// แยก state/getters ออกมาโดยยังคง reactivity
const { items, isLoading, error, totalCount } = storeToRefs(productsStore);
// Actions ไม่ต้องใช้ storeToRefs
const { fetchProducts, addProduct } = productsStore;
</script>
 
 
 
 
💬 6. Chat Commands สำหรับ Pinia
 
คำสั่ง ผลลัพธ์ที่ได้ 
 สร้างสโตร์ใหม่ชื่อ useUserStore มี state: profile, isLoading, error  โครงสร้างสโตร์พื้นฐาน 
 แยกตรรกะส่วนนี้ออกไปเป็น Pinia store ชื่อ useSettingsStore  ย้าย logic ออกจากคอมโพเนนต์ 
 เพิ่ม action async fetchData() ให้สโตร์นี้ ใช้ useFetch ดึงข้อมูล  เพิ่มการโหลดข้อมูลแบบ async 
 เพิ่ม persist ให้สโตร์นี้ บันทึกเฉพาะ state: token และ user  บันทึกสถานะลง localStorage 
 เขียน unit test สำหรับสโตร์นี้ด้วย Vitest  ชุดทดสอบครบถ้วน 
 ตรวจสอบสโตร์นี้ แนะนำการปรับปรุงประสิทธิภาพและโครงสร้าง  คำแนะนำเชิงปฏิบัติ 
 
 
 
⚙️ 7. Nuxt 3 Integration Setup
 
✅ nuxt.config.ts — ติดตั้ง Pinia Plugin
 
typescript
  
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  imports: {
    dirs: ['stores'], // auto-import ทุกสโตร์
  },
});
 
 
✅ Persistence Setup (Optional)
 
bash
  
# ติดตั้ง pinia-plugin-persistedsave
npm install pinia-plugin-persistedstate
 
 
 
 
📌 8. Best Practices Prompt — Copilot Instructions
 
สร้างไฟล์  .github/copilot-instructions.md :
 
markdown
  
# Pinia + TypeScript Guidelines

- Define stores in `stores/` folder, filename = store name
- Use `defineStore('unique-id', { ... })`
- Define full interface for State — avoid `any`
- State must be a function returning an object: `state: () => ({ ... })`
- Getters are pure functions — use `(state) => computed-value`
- Actions can be async — use `this` to access state/getters
- Use `storeToRefs()` when destructuring in components
- Actions modify state directly — no `setState()` needed
- Keep stores focused: one store = one domain/feature
- Add JSDoc comments to complex getters and actions
 
 
 
 
ต้องการเพิ่มหัวข้อใดอีกไหมครับ เช่น Unit Testing with Vitest, Plugin Registration, State Persistence, or Multiple Stores Relationships 😊yaml
  
---
title: 🚀 Copilot Chat — Advanced Skills & Mastery Guide
aliases:
  - Copilot Advanced Techniques
  - Master Copilot Chat
  - Better Results with Copilot
tags:
  - copilot
  - advanced
  - prompt-guide
  - best-practices
  - zyntroai
type: guide
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - guide-note
  - prompt-guide
---
 
 
 
 
🚀 Copilot Chat — Advanced Skills & Mastery Guide
 
💡 From "Asking Questions" → "Co-Creating Code" — Level Up Your Workflow ✅
 
 
 
🎯 Part 1: The 5 Levels of Copilot Mastery
 
ระดับ ทักษะ เวิร์กโฟลว์ 
🟢 Level 1 — Beginner ขอโค้ด → ยอมรับ/ปฏิเสธ พิมพ์คำสั่งง่ายๆ ได้ผลลัพธ์พื้นฐาน 
🟡 Level 2 — Skilled เขียนคำสั่งชัดเจน → ตรวจสอบ → ปรับปรุง ใช้สูตร Context+Task+Format+Constraints 
🔵 Level 3 — Advanced ให้บริบท → กำหนดกฎ → ทำซ้ำๆ → ตรวจสอบ ใช้ไฟล์คำสั่ง + เปิดแท็บที่เกี่ยวข้อง 
🟣 Level 4 — Expert ออกแบบโครงสร้าง → ให้ตัวอย่าง → ตรวจสอบ → ปรับปรุง Copilot = ผู้ช่วยที่คุณสั่งงานได้แม่นยำ 
🏆 Level 5 — Master คิด → เขียนโครง → Copilot เติม → ทดสอบ → ปรับปรุง → เรียนรู้ ทำงานเร็วขึ้นอย่างมาก รักษาคุณภาพสูง 
 
 
 
🧠 Part 2: Advanced Prompting Techniques
 
🔹 Technique 1: The "Spec-First" Approach
 
บอก สิ่งที่ต้องการ ก่อน ไม่ใช่แค่สิ่งที่ให้ทำ
 
plaintext
  
เราต้องการฟังก์ชันที่:
- รับพารามิเตอร์: text (string), maxLength (number, default 100)
- คืนค่า: string ที่ถูกตัดให้สั้นลง ถ้ายาวเกินไปใส่ ... ท้าย
- ตัดที่ช่องว่าง ไม่ตัดกลางคำ
- จัดการกรณีค่าว่าง/สั้นกว่า maxLength
- เขียนด้วย TypeScript มี JSDoc
- ห้ามใช้ไลบรารีภายนอก
 
 
🔹 Technique 2: Reference by Example
 
แสดงให้เห็นรูปแบบ แล้วขอให้ทำตาม
 
plaintext
  
ดูไฟล์ utils/date.ts — ทำตามรูปแบบเดียวกัน เขียนฟังก์ชันใหม่ชื่อ formatCurrency
- ใช้ export function ชื่อ camelCase
- รับ amount และ currency (default 'THB')
- คืนค่าสตริงที่จัดรูปแบบถูกต้อง
- จัดการเลขลบและค่า null/undefined
- เขียนแบบเดียวกับไฟล์ตัวอย่าง
 
 
🔹 Technique 3: Step-by-Step Breakdown
 
ขอทีละส่วน — ควบคุมคุณภาพได้ดีกว่า
 
plaintext
  
# ขั้นที่ 1: กำหนด Type
สร้าง interface Product { id, name, price, description }

# ขั้นที่ 2: สร้างฟังก์ชันหลัก
จาก Type ด้านบน เขียนฟังก์ชัน validateProduct
ตรวจสอบ: ชื่อไม่ว่าง, ราคามากกว่า 0

# ขั้นที่ 3: เพิ่มข้อความผิดพลาด
แก้ไขฟังก์ชันให้คืน { valid: boolean, errors: string[] }
 
 
🔹 Technique 4: Role & Persona Prompting
 
กำหนด บทบาท ให้ Copilot ทำงานตามมาตรฐานที่ต้องการ
 
plaintext
  
ทำหน้าที่เป็น Senior TypeScript Developer ที่เน้น:
- ความปลอดภัยและความถูกต้องของประเภทข้อมูล
- อ่านง่าย บำรุงรักษาง่าย
- จัดการข้อผิดพลาดอย่างครบถ้วน
- ไม่ใช้ทางลัดที่อาจก่อให้เกิดปัญหาในอนาคต

ตอนนี้ช่วยปรับปรุงโค้ดนี้ให้ตรงกับมาตรฐานข้างต้น:
[วางโค้ดที่นี่]
 
 
🔹 Technique 5: Constraints & Guardrails
 
บอก สิ่งที่ห้ามทำ ชัดเจน
 
plaintext
  
เขียนฟังก์ชันแปลงวันที่
✅ ใช้ Date object ดั้งเดิม
✅ รองรับรูปแบบ DD/MM/YYYY
❌ ห้ามใช้ไลบรารีภายนอก
❌ ห้ามใช้ any
❌ ห้าม throw error — คืน null เมื่อไม่ถูกต้อง
 
 
 
 
🎨 Part 3: Context Engineering — ให้ข้อมูลให้ถูกที่สุด
 
📂 เปิดแท็บที่เกี่ยวข้อง (The Hidden Superpower)
 
Copilot มองเฉพาะไฟล์ที่เปิดอยู่ — เปิดไฟล์อ้างอิงไว้ = ผลลัพธ์ตรงใจ
 
ถ้าต้องการ... ให้เปิดไฟล์นี้ไว้ด้วย 
สร้าง Type ใหม่ตามแบบเดิม เปิดไฟล์ที่มี Type เดิมไว้ 
สร้าง API route ใหม่ เปิด route ที่มีอยู่แล้วไว้ 
สร้างคอมโพเนนต์ใหม่ เปิดคอมโพเนนต์ที่มีสไตล์เดียวกันไว้ 
แก้ไข logic ที่ซับซ้อน เปิดไฟล์ที่เกี่ยวข้องอื่นๆ ไว้ 
 
📝 ใช้ไฟล์คำสั่งส่วนกลาง
 
สร้าง  .github/copilot-instructions.md  ที่รูทโปรเจกต์:
 
markdown
  
# Project Rules for Copilot

## Language & Style
- TypeScript strict mode — no `any`
- camelCase functions/variables, PascalCase types/components
- Prefer `const` over `let` — avoid `var`

## Error Handling
- Return `{ success, data, error }` instead of throwing
- Always validate external input

## Documentation
- JSDoc for public functions/types
- Comments only for non-obvious logic
 
 
💡 Copilot อ่านและปฏิบัติตามกฎนี้ทุกครั้ง ✅
 
 
 
🔄 Part 4: Iterative Refinement Workflow
 
ร่าง → ตรวจ → ปรับ → ยืนยัน — ไม่ต้องการความสมบูรณ์ในครั้งแรก
 
ขั้น ตัวอย่างคำสั่ง จุดประสงค์ 
🟢 1. Initial Draft "เขียนโครงสร้างพื้นฐานของระบบตรวจสอบฟอร์มนี้" ได้โครงร่างเริ่มต้น 
🟡 2. Review "ตรวจสอบว่ามีจุดอ่อนด้านความปลอดภัยหรือข้อผิดพลาดไหม" ค้นหาปัญหา 
🔵 3. Improve "ปรับปรุงให้จัดการกรณีข้อมูลว่างและขอบเขตได้ดีขึ้น" เพิ่มความสมบูรณ์ 
🟣 4. Optimize "ลดโค้ดที่ซ้ำซ้อนและทำให้อ่านง่ายขึ้น" ปรับให้สะอาดตา 
🟠 5. Document "เพิ่ม JSDoc และอธิบายส่วนที่ซับซ้อน" เสร็จสมบูรณ์พร้อมใช้งาน 
 
 
 
🧐 Part 5: How to Read & Critique Copilot Output
 
✅ 5-Step Verification Checklist
 
เข้าใจก่อน — อ่านทีละบรรทัด เข้าใจว่าทำอะไร
ตรวจสอบประเภท — Type ถูกต้องไหม? ไม่มี any แอบแฝง
ตรวจสอบความปลอดภัย — SQL injection? XSS? Secrets hardcoded?
ตรวจสอบขอบเขต — ค่าว่าง? ค่าลบ? ข้อมูลไม่ครบ? จัดการหรือยัง
ทดสอบ — รันดูผลลัพธ์จริง เทียบกับที่คาดหวัง
 
⚠️ Red Flags — เมื่อไหร่ควรระวัง
 
🚩 "นี่คือวิธีที่ดีที่สุด..." → ตรวจสอบ — มีเหตุผลรองรับไหม?
🚩 API/ฟังก์ชันที่ไม่คุ้นเคย → ค้นหาเอกสารประกอบก่อนใช้
🚩 โค้ดยาวซับซ้อนเกินไป → ขอให้เขียนแบบง่ายกว่านี้
🚩 ผลลัพธ์เปลี่ยนไปทุกครั้งที่ถาม → ให้บริบทชัดเจนขึ้น แบ่งงานเล็กลง
 
 
 
🎓 Part 6: Learning Mode — Use Copilot to Learn
 
อย่าแค่รับโค้ด — ถามเพื่อเข้าใจและพัฒนาตัวเอง
 
คำสั่ง สิ่งที่คุณได้เรียนรู้ 
"อธิบายโค้ดนี้ทีละบรรทัด เหมือนผมเป็นมือใหม่" → เข้าใจทุกส่วน พื้นฐานการทำงาน 
"ทำไมเลือกใช้วิธีนี้ แทนวิธีอื่น? ข้อดี-ข้อเสียคืออะไร?" → เปรียบเทียบทางเลือก การตัดสินใจทางเทคนิค 
"ปรับโค้ดนี้ให้ดีขึ้น แล้วอธิบายสิ่งที่เปลี่ยนแปลงและเหตุผล" → เห็นความแตกต่างชัดเจน แนวทางปฏิบัติที่ดีกว่า 
"มีจุดที่ต้องระวังเมื่อนำไปใช้งานจริงไหม?" → เตรียมพร้อมรับปัญหา ความเข้าใจเชิงลึกและข้อจำกัด 
"เขียน unit test สำหรับฟังก์ชันนี้ พร้อมอธิบายแต่ละกรณีที่ทดสอบ" → เรียนรู้วิธีทดสอบ การเขียนทดสอบที่มีประสิทธิภาพ 
 
 
 
📋 Part 7: Common Mistakes & How to Fix Them
 
❌ ปัญหา ✅ วิธีแก้ 
ผลลัพธ์ไม่ตรงกับที่ต้องการ เพิ่มรายละเอียด บอกขอบเขตที่ชัดเจน เปิดไฟล์อ้างอิง 
ได้โค้ดที่ซับซ้อนเกินไป "ทำให้ง่ายที่สุดเท่าที่จะทำได้ ไม่ต้องยืดหยุ่นเกินความจำเป็น" 
ไม่จัดการ error "รวมการจัดการข้อผิดพลาดและกรณีข้อมูลไม่สมบูรณ์ด้วย" 
ใช้สไตล์ไม่ตรงโปรเจกต์ เปิดไฟล์ตัวอย่างไว้ + "ทำตามรูปแบบในไฟล์ที่เปิดไว้" 
ได้ผลลัพธ์ไม่สมบูรณ์ อย่าขอทั้งระบบ — แบ่งเป็นงานเล็กๆ ทีละส่วน 
ไม่แน่ใจว่าถูกหรือผิด "ตรวจสอบความถูกต้องของโค้ดนี้และระบุจุดที่ต้องระวัง" 
 
 
 
🏆 Part 8: The Master Copilot Checklist
 
✅ ก่อนส่งคำสั่ง:
 
เปิดไฟล์ที่เกี่ยวข้องไว้ครบถ้วน
กำหนดเป้าหมายชัดเจน — อะไร ทำไม อย่างไร
บอกข้อจำกัด — อะไรห้าม อะไรต้องมี
ขอให้อธิบาย — เข้าใจก่อนใช้
 
✅ หลังจากได้ผลลัพธ์:
 
อ่านและเข้าใจทุกบรรทัด
ตรวจสอบประเภท ความปลอดภัย ขอบเขต
ทดสอบทำงานจริง
ปรับปรุงและขอให้อธิบายเมื่อไม่ตรง
กด 👍 ถ้าดี 👎 ถ้าไม่ดี — ช่วยปรับปรุงให้ดียิ่งขึ้น
 
 
 
💡 "Copilot จะเก่งเท่าคนที่ใช้มัน — ยิ่งคุณเก่งในการถาม ยิ่งได้ผลลัพธ์ที่ดี" 🚀
 
ต้องการเจาะลึกเรื่องใดเป็นพิเศษไหมครับ เช่น เทคนิคสำหรับโค้ดที่ซับซ้อน, การทำงานร่วมกันทีม, หรือเวิร์กโฟลว์สำหรับโปรเจกต์ขนาดใหญ่ 😊![[yaml
  
---
title: 🚀 Copilot — เทคนิคขั้นสูง + คู่มือผู้ดูแลระบบ + แบบฟอร์มเอกสาร
aliases:
  - Copilot Advanced & Admin Guide
  - Copilot Team Governance
  - Copilot Document Templates
tags:
  - copilot
  - advanced
  - admin
  - governance
  - templates
  - zyntroai
type: guide
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - guide-note
  - full-guide
---
 
 
 
 
🚀 คู่มือฉบับสมบูรณ์ — เทคนิคขั้นสูง | การดูแลระบบ | แบบฟอร์มเอกสาร
 
 
 
🔹 ส่วนที่ 1 — 🧠 เทคนิคขั้นสูงการใช้ Copilot
 
🎯 1. Multi-Step Workflow — ทำงานซับซ้อนอย่างเป็นระบบ
 
อย่าขอทั้งหมดในคราวเดียว — แบ่งเป็นขั้นตอนที่ชัดเจน
 
plaintext
  
# ขั้นที่ 1: ออกแบบ
เราออกแบบระบบ [ชื่อระบบ] — บอกโครงสร้างไฟล์, ความสัมพันธ์ระหว่างโมดูล, ข้อจำกัดด้านเทคนิค

# ขั้นที่ 2: กำหนด Type
จากการออกแบบด้านบน เขียน interface/type หลักทั้งหมด — ใช้ TypeScript, ครบถ้วน, มี JSDoc

# ขั้นที่ 3: โครงสร้างพื้นฐาน
สร้างคลาส/ฟังก์ชันหลักตาม Type ที่กำหนด — ไม่ต้องเขียนตรรกะภายใน แค่โครงสร้างที่สมบูรณ์

# ขั้นที่ 4: ตรรกะและรายละเอียด
เติมตรรกะการทำงานให้แต่ละฟังก์ชัน — จัดการ error, validation, edge cases

# ขั้นที่ 5: ทดสอบและเอกสาร
เขียน unit test + คู่มือการใช้งาน
 
 
🧩 2. Context Engineering — จัดการบริบทอย่างชาญฉลาด
 
📋 เทคนิค "Reference Bundle"
 
เปิดไฟล์เหล่านี้ไว้พร้อมก่อนขอให้สร้างอะไรใหม่ๆ:
 
- ✅ ไฟล์ที่มี Type/Interface ที่เกี่ยวข้อง
- ✅ ไฟล์ตัวอย่างที่มีรูปแบบถูกต้อง
- ✅ ไฟล์กฎ  .github/copilot-instructions.md 
- ✅ ไฟล์ที่มี utility functions ที่ต้องใช้
 
📝 เทคนิค "Context Injection"
 
วางบริบทไว้ที่ต้นทุกคำสั่ง:
 
plaintext
  
=== บริบทจากไฟล์ auth.ts ===
[วางโค้ดส่วนที่เกี่ยวข้อง]
=== จบบริบท ===

จากโค้ดด้านบน ช่วยสร้างฟังก์ชัน refreshToken ที่ทำงานร่วมกับระบบเดิม
 
 
🔄 3. Iterative Refinement Loop — ปรับปรุงอย่างต่อเนื่อง
 
plaintext
  
รอบที่ 1: ขอโครงสร้างพื้นฐาน → ตรวจสอบ
รอบที่ 2: เพิ่ม validation และ error handling → ตรวจสอบ
รอบที่ 3: ปรับปรุงประสิทธิภาพและอ่านง่ายขึ้น → ตรวจสอบ
รอบที่ 4: เพิ่ม JSDoc และตัวอย่างการใช้งาน → ตรวจสอบ
รอบที่ 5: ตรวจสอบความปลอดภัยและ edge cases → ยืนยัน
 
 
🤖 4. Pattern Reusability — สร้างคลังความรู้ของทีม
 
บันทึก Prompt ที่ใช้ได้ผลดี
 
บันทึกเป็นไฟล์ในโปรเจกต์:  .copilot-prompts/ 
 
plaintext
  
.prompts/
  ├── typescript/
  │   ├── new-function.md
  │   ├── validation.md
  │   └── fetch-wrapper.md
  ├── vue/
  │   ├── component-props.md
  │   └── composable.md
  └── nuxt/
      ├── api-route.md
      └── use-fetch.md
 
 
ตัวอย่างไฟล์ Prompt Template
 
markdown
  
# ชื่อ: สร้าง API Route
# ภาษา: TypeScript, Nuxt 3
# รูปแบบ:
- ใช้ defineEventHandler
- ตรวจสอบข้อมูลนำเข้า
- จัดการ error ด้วย createError
- คืนรูปแบบ { success, data, error }

---
[คำสั่งจริงที่นี่]
 
 
🧠 5. Critical Thinking — พัฒนาความสามารถในการตรวจสอบ
 
เช็คลิสต์ตรวจสอบระดับลึก
 
ตรรกะสมเหตุสมผลไหม? — มีช่องโหว่ตรงไหนไหม
ประสิทธิภาพ — มีจุดที่ทำงานซ้ำซ้อนหรือช้าเกินไปไหม
ความปลอดภัย — การตรวจสอบข้อมูลนำเข้า, SQL injection, XSS
การจัดการข้อผิดพลาด — ครบถ้วนหรือไม่, ไม่ปล่อยให้ค้าง
ความสอดคล้องกับระบบเดิม — รูปแบบ, ชื่อ, การจัดการตรงกันไหม
 
 
 
🔹 ส่วนที่ 2 — ⚙️ คู่มือสำหรับผู้ดูแลระบบ
 
📋 1. นโยบายการใช้งานสำหรับองค์กร
 
📜 นโยบายการใช้ GitHub Copilot
 
markdown
  
# นโยบายการใช้ GitHub Copilot — [ชื่อองค์กร]
เวอร์ชัน: 1.0 | วันที่บังคับใช้: 11 ตุลาคม 2026

## 1. วัตถุประสงค์
เพื่อใช้ AI เป็นผู้ช่วย เพิ่มผลผลิต โดยรักษาคุณภาพและความปลอดภัยของโค้ด

## 2. ขอบเขตการใช้งาน
✅ อนุญาต: เขียนโค้ด, อธิบาย, ปรับปรุง, ทดสอบ, เอกสาร
❌ ห้าม: วางข้อมูลลับ/รหัสผ่าน, ขอข้อมูลภายนอก, ตัดสินใจเชิงสถาปัตยกรรมโดยไม่ตรวจสอบ

## 3. หน้าที่และความรับผิดชอบ
- ผู้ใช้: ตรวจสอบ ทดสอบ และรับผิดชอบโค้ดทุกบรรทัด
- ทีมรักษาความปลอดภัย: ตรวจสอบช่องโหว่, สแกนโค้ดที่สร้างด้วย AI
- ผู้ดูแลระบบ: กำหนดนโยบาย, ฝึกอบรม, ติดตามการใช้งาน

## 4. หลักการสำคัญ
- Copilot = เครื่องมือ ไม่ใช่ผู้รับผิดชอบ
- ตรวจสอบเสมอ — ไม่ยอมรับโดยไม่อ่าน
- ปกป้องข้อมูล — ห้ามข้อมูลลับเข้าสู่ระบบ
- เรียนรู้และพัฒนา — แบ่งปันความรู้ในทีม
 
 
🔐 2. การตั้งค่าและการควบคุม
 
⚙️ การตั้งค่าที่แนะนำสำหรับองค์กร
 
การตั้งค่า ค่าที่แนะนำ เหตุผล 
ให้ใช้ข้อมูลองค์กรเท่านั้น เปิด ป้องกันข้อมูลรั่วไหล 
ปิดการใช้ข้อมูลเพื่อฝึกโมเดล เปิด (Business/Enterprise) โค้ดของเราไม่ถูกนำไปฝึก AI 
เปิด Public Code Matching เปิด ตรวจสอบการซ้ำซ้อนกับโค้ดสาธารณะ 
จำกัดสิทธิ์ตามกลุ่ม ตามบทบาท ไม่ทุกคนต้องเข้าถึงทุกโปรเจกต์ 
สร้างรายงานการใช้งาน รายเดือน ตรวจสอบรูปแบบและปัญหาที่อาจเกิดขึ้น 
 
📋 ไฟล์กฎระดับองค์กร —  .github/copilot-instructions.md 
 
markdown
  
# กฎการใช้ Copilot — โปรเจกต์ [ชื่อ]

## กฎทั่วไป
- ห้ามใส่ข้อมูลลับ, รหัสผ่าน, API Key ในคำสั่ง
- ตรวจสอบโค้ดทุกครั้งก่อนส่ง
- ใช้ภาษาอังกฤษในคำสั่งเพื่อความแม่นยำสูงสุด

## มาตรฐานโค้ด
- TypeScript strict mode — ไม่ใช้ `any`
- ESLint + Prettier ตามการตั้งค่าของโปรเจกต์
- จัดการ error ด้วยรูปแบบมาตรฐาน: `{ success, data, error }`
- เขียน JSDoc สำหรับฟังก์ชันสาธารณะ

## ขอบเขตการใช้งาน
- อนุญาต: คอมโพเนนต์, utility, ทดสอบ, เอกสาร
- ต้องตรวจสอบอย่างเข้มงวด: ระบบความปลอดภัย, การตรวจสอบสิทธิ์, การเข้าถึงฐานข้อมูล
- ห้าม: โค้ดส่วนที่เกี่ยวข้องกับกฎระเบียบเฉพาะด้านโดยไม่มีการตรวจสอบจากผู้เชี่ยวชาญ
 
 
📊 3. การฝึกอบรมและแลกเปลี่ยนความรู้
 
📅 แผนการฝึกอบรมภายในทีม
 
หัวข้อ ความถี่ ผู้เข้าร่วม 
ความรู้เบื้องต้นและนโยบาย เมื่อเริ่มเข้าทีม สมาชิกใหม่ทุกคน 
เทคนิคการเขียน Prompt ที่ได้ผลดี ทุก 3 เดือน ทุกคนในทีม 
การตรวจสอบและทดสอบโค้ดจาก AI ทุก 6 เดือน นักพัฒนาและผู้ตรวจสอบโค้ด 
แชร์เทคนิคและประสบการณ์ ทุกเดือน ทีมทั้งหมด 
 
📖 คลังความรู้ภายในทีม
 
- 📁  /docs/copilot/prompt-library/  — คลัง Prompt ที่ใช้ได้ผลดี
- 📁  /docs/copilot/best-practices.md  — แนวทางปฏิบัติที่ดีที่สุด
- 📁  /docs/copilot/case-studies/  — กรณีศึกษาจริงจากทีมงาน
- 📁  /docs/copilot/lessons-learned.md  — บทเรียนและข้อผิดพลาดที่พบ
 
 
 
🔹 ส่วนที่ 3 — 📄 แบบฟอร์มเอกสารพร้อมใช้งาน
 
📝 แบบฟอร์ม 1: คำขอใช้ GitHub Copilot (ภายในองค์กร)
 
markdown
  
# 📋 คำขอใช้ GitHub Copilot

**ชื่อผู้ขอ:** __________________________  **วันที่:** ______________
**แผนก/ทีม:** __________________________  **อีเมล:** ____________________

### 📌 ข้อมูลการใช้งาน
- ประเภทบัญชีที่ต้องการ: ☐ Individual ☐ Business ☐ Enterprise
- โปรเจกต์ที่เกี่ยวข้อง: ____________________________________
- เหตุผลความจำเป็น:
  ________________________________________________________________
  ________________________________________________________________

### ✅ การยอมรับเงื่อนไข
ฉันทราบและยอมรับว่า:
- [ ] จะใช้เพื่องานเขียนโค้ดที่เกี่ยวข้องกับงานที่ได้รับมอบหมายเท่านั้น
- [ ] จะไม่นำข้อมูลลับ รหัสผ่าน หรือข้อมูลสำคัญขององค์กรไปใส่ในระบบ
- [ ] จะตรวจสอบ ทดสอบ และรับผิดชอบโค้ดทุกบรรทัดที่สร้างด้วย Copilot
- [ ] จะรายงานปัญหาหรือข้อสงสัยให้ผู้ดูแลระบบทราบทันที

**ลายเซ็นผู้ขอ:** __________________________  **วันที่:** ______________

### ✅ ส่วนผู้อนุมัติ
☑️ อนุมัติ  ☐ ไม่อนุมัติ  เหตุผล: __________________________

**ลายเซ็นผู้อนุมัติ:** __________________________  **วันที่:** ______________
 
 
📝 แบบฟอร์ม 2: บันทึกการตรวจสอบโค้ดที่สร้างด้วย AI
 
markdown
  
# 🔍 แบบฟอร์มตรวจสอบโค้ดจาก AI

**โครงการ:** __________________________  **ไฟล์/ส่วนงาน:** ______________
**ผู้พัฒนา:** __________________________  **วันที่ตรวจสอบ:** ______________
**เครื่องมือที่ใช้:** ☐ Copilot  ☐ Copilot Chat  ☐ อื่นๆ: _______

## ✅ เช็คลิสต์การตรวจสอบ

### ความถูกต้อง
- [ ] โค้ดทำงานตามที่คาดหวังหรือไม่?
- [ ] ไม่มีตรรกะที่ผิดพลาดหรือดูแปลกไหม?
- [ ] ทดสอบผ่านทุกกรณี รวมถึง edge cases

### ความปลอดภัย
- [ ] ไม่มีข้อมูลลับ/รหัสผ่านฝังอยู่ในโค้ด
- [ ] มีการตรวจสอบข้อมูลนำเข้าทุกจุด
- [ ] ไม่มีช่องโหว่ที่ชัดเจน (SQLi, XSS, ฯลฯ)

### คุณภาพและมาตรฐาน
- [ ] ปฏิบัติตามมาตรฐานโค้ดของทีม
- [ ] อ่านง่ายและเข้าใจได้
- [ ] ไม่มีโค้ดที่ซ้ำซ้อนหรือไม่จำเป็น
- [ ] เอกสารประกอบครบถ้วน (ถ้าจำเป็น)

### สิทธิ์และแหล่งที่มา
- [ ] ตรวจสอบแล้วว่าไม่ซ้ำกับโค้ดที่มีลิขสิทธิ์
- [ ] หากมีการอ้างอิง แหล่งที่มาถูกระบุไว้อย่างชัดเจน

### ผลการตรวจสอบ
☑️ ผ่าน — สามารถนำไปใช้งานได้
⚠️ ต้องแก้ไข — รายการ: ____________________________________
❌ ไม่ผ่าน — เหตุผล: ________________________________________

**ผู้ตรวจสอบ:** __________________________  **ลายเซ็น:** ______________
 
 
📝 แบบฟอร์ม 3: รายงานปัญหา/ข้อเสนอแนะการใช้ Copilot
 
markdown
  
# 📢 รายงานปัญหา / ข้อเสนอแนะ — การใช้ GitHub Copilot

**วันที่:** ______________  **ผู้รายงาน:** __________________________
**ทีม/แผนก:** __________________________

## ประเภท
☐ ปัญหาการใช้งาน  ☐ ข้อเสนอแนะ  ☐ คำถาม  ☐ อื่นๆ: ______________

## รายละเอียด
**สิ่งที่พบ/ต้องการ:**
________________________________________________________________________
________________________________________________________________________

**สภาพแวดล้อม:**
- IDE/เวอร์ชัน: __________________________
- ประเภทบัญชี: ☐ Individual  ☐ Business  ☐ Enterprise
- โปรเจกต์/ภาษาที่ใช้: __________________________

**ผลกระทบ:**
☐ ไม่มีผลกระทบ  ☐ ทำงานช้าลง  ☐ เกิดความผิดพลาด  ☐ อื่นๆ: _______

**ข้อเสนอแนะ/ความคิดเห็นเพิ่มเติม:**
________________________________________________________________________

## การดำเนินการ (สำหรับผู้ดูแลระบบ)
☐ รับทราบ  ☐ กำลังดำเนินการ  ☐ แก้ไขแล้ว  ☐ ไม่สามารถดำเนินการได้
**รายละเอียด:** ____________________________________________________

**ผู้ตอบกลับ:** __________________________  **วันที่:** ______________
 
 
📝 แบบฟอร์ม 4: คู่มือเริ่มใช้งานสำหรับสมาชิกใหม่
 
markdown
  
# 🚀 คู่มือเริ่มใช้งาน GitHub Copilot — สำหรับสมาชิกใหม่

## ขั้นตอนที่ 1: ติดตั้งและตั้งค่า
1. ติดตั้งส่วนเสริม Copilot ใน VS Code / IDE ที่ใช้งาน
2. ลงชื่อเข้าใช้บัญชี GitHub ที่มีสิทธิ์การใช้งาน
3. ตรวจสอบให้แน่ใจว่าได้รับสิทธิ์จากองค์กรแล้ว

## ขั้นตอนที่ 2: เรียนรู้หลักการพื้นฐาน
- Copilot = ผู้ช่วย ไม่ใช่ผู้รับผิดชอบ
- ตรวจสอบทุกผลลัพธ์ก่อนใช้งาน
- ห้ามใส่ข้อมูลลับในคำสั่งเด็ดขาด
- ใช้ภาษาอังกฤษเพื่อความแม่นยำสูงสุด

## ขั้นตอนที่ 3: เริ่มใช้งาน
- เริ่มจากงานง่ายๆ ก่อน: เขียนฟังก์ชันเล็กๆ, อธิบายโค้ด, เขียนทดสอบ
- ศึกษาตัวอย่างจากคลัง Prompt ของทีม: `/docs/copilot/prompt-library/`
- ถ้ามีคำถามหรือปัญหา ให้ถามที่ #channel-copilot หรือติดต่อผู้ดูแลระบบ

## ขั้นตอนที่ 4: พัฒนาทักษะ
- เข้าร่วมการแชร์ความรู้ประจำเดือน
- บันทึกเทคนิคที่ใช้ได้ผลดีและแบ่งปันให้ทีม
- อ่านเอกสารเพิ่มเติมที่: [ลิงก์เอกสารภายในองค์กร]

✅ **ยินดีต้อนรับสู่ทีม! ขอให้ใช้ Copilot อย่างมีประสิทธิภาพและปลอดภัยครับ** 🚀
 
 
📝 แบบฟอร์ม 5: บันทึกการแชร์ความรู้ภายในทีม
 
markdown
  
# 🧠 บันทึกการแชร์ความรู้ — การใช้ Copilot

**วันที่:** ______________  **ผู้แชร์:** __________________________
**หัวข้อ:** __________________________________________________________

## สรุปเนื้อหา
________________________________________________________________________
________________________________________________________________________

## ตัวอย่าง Prompt ที่ใช้ได้ผลดี
 
 
[วางตัวอย่างที่นี่]
 
plaintext
  

## ผลลัพธ์ที่ได้
- ก่อนใช้: __________________________________________________________
- หลังใช้: __________________________________________________________

## ข้อสังเกตและคำแนะนำ
________________________________________________________________________

## ไฟล์ที่เกี่ยวข้อง/แหล่งอ้างอิง
- [ ] ลิงก์เอกสาร: __________________________________________________
- [ ] ตัวอย่างโค้ด: __________________________________________________

**ผู้บันทึก:** __________________________  **ตรวจทานโดย:** ______________
 
 
 
 
📂 จัดเก็บเอกสารเหล่านี้ไว้ที่:  /docs/copilot/templates/  ในโปรเจกต์หลักขององค์กร ✅
 
ต้องการปรับแต่งแบบฟอร์มใดให้ตรงกับองค์กรของคุณไหมครับ หรือต้องการเพิ่มแบบฟอร์มประเภทอื่นๆ 😊]]yaml
  
---
title: 🚀 Copilot — เทคนิคขั้นสูง คู่มือผู้ดูแลระบบ และแบบฟอร์มเอกสาร
aliases:
  - Copilot Advanced Guide
  - Copilot Admin Handbook
  - Copilot Document Templates
tags:
  - copilot
  - advanced
  - administration
  - templates
  - zyntroai
type: guide
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - guide-note
  - full-guide
---
 
 
 
 
🚀 คู่มือฉบับสมบูรณ์ — เทคนิคขั้นสูง | การดูแลระบบ | แบบฟอร์มเอกสาร
 
📋 3 ส่วนในเอกสารนี้:
ส่วนที่ 1: เทคนิคการใช้งานขั้นสูง
ส่วนที่ 2: คู่มือสำหรับผู้ดูแลระบบองค์กร
ส่วนที่ 3: แบบฟอร์มเอกสารพร้อมใช้งาน
 
 
 
 
 
⚡ ส่วนที่ 1 — เทคนิคการใช้งานขั้นสูง
 
 
 
🎯 1. System Prompt Engineering
 
✅ สร้างบุคลากรเฉพาะทาง
 
plaintext
  
ทำหน้าที่เป็น Senior Software Architect ที่เชี่ยวชาญด้าน [ภาษา/ด้าน] โดยเน้น:
- ความปลอดภัยเป็นอันดับแรก
- การออกแบบที่ยืดหยุ่นและบำรุงรักษาง่าย
- อธิบายเหตุผลทุกการตัดสินใจ
- แจ้งข้อจำกัดและจุดที่ต้องระวัง
- ให้ทางเลือก 2-3 แบบ พร้อมเปรียบเทียบข้อดี-ข้อเสีย
 
 
✅ การวิเคราะห์เชิงลึก
 
plaintext
  
วิเคราะห์โค้ดนี้ใน 5 ด้าน:
1. 🛡️ ความปลอดภัย — มีช่องโหว่หรือจุดอ่อนไหม?
2. 📏 คุณภาพโค้ด — อ่านง่าย บำรุงรักษาง่ายไหม?
3. ⚡ ประสิทธิภาพ — จุดที่ปรับปรุงได้?
4. 🔧 ความน่าเชื่อถือ — จัดการ error ครบถ้วนไหม?
5. 📐 มาตรฐาน — สอดคล้องกับหลักการออกแบบที่ดีไหม?

สำหรับแต่ละจุด ให้ระบุ: ปัญหา + ความรุนแรง + วิธีแก้ไขที่แนะนำ
 
 
 
 
🧠 2. Chain of Thought — ค่อยๆ คิดไปด้วยกัน
 
✅ ขั้นตอนการแก้ปัญหาที่ซับซ้อน
 
plaintext
  
เราจะแก้ปัญหานี้ร่วมกันทีละขั้นตอน:

ขั้นที่ 1: เข้าใจปัญหา
- ปัญหาคืออะไร?
- เงื่อนไขและขอบเขตคืออะไร?
- ผลลัพธ์ที่คาดหวังคืออะไร?

ขั้นที่ 2: วางแผน
- มีวิธีการใดบ้าง?
- ข้อดี-ข้อเสียแต่ละวิธี?
- เลือกวิธีที่เหมาะสมที่สุด เพราะเหตุใด?

ขั้นที่ 3: เขียนโค้ด
- เขียนตามแผนที่วางไว้
- ใส่ความคิดเห็นอธิบายตรรกะที่สำคัญ

ขั้นที่ 4: ตรวจสอบ
- ทดสอบกรณีขอบเขตต่างๆ
- ตรวจสอบความปลอดภัยและประสิทธิภาพ

---
ตอนนี้เริ่มที่ขั้นที่ 1 กันก่อน: ปัญหานี้คือ [อธิบายปัญหาของคุณ]
 
 
 
 
🔄 3. Iterative Development Workflow
 
plaintext
  
# เวิร์กโฟลว์: ออกแบบ → พัฒนา → ตรวจสอบ → ปรับปรุง

## รอบที่ 1: โครงสร้างพื้นฐาน
"ช่วยออกแบบโครงสร้างสำหรับ [ระบบที่ต้องการสร้าง]
- บอกขอบเขต: อะไรทำ, อะไรไม่ต้องทำ
- แยกส่วนประกอบหลัก
- กำหนดประเภทข้อมูลหลัก"

## รอบที่ 2: รายละเอียดส่วนสำคัญ
"จากโครงสร้างข้างต้น ขอให้ลงรายละเอียดในส่วนของ [ส่วนที่ต้องการ]
- เขียนโค้ดตัวอย่าง
- จัดการข้อผิดพลาดให้ครบถ้วน"

## รอบที่ 3: ปรับปรุงและตรวจสอบ
"ตรวจสอบโค้ดทั้งหมดนี้
- หาจุดที่ปรับปรุงได้
- เพิ่มการตรวจสอบข้อมูล
- ปรับรูปแบบให้สอดคล้องกัน"

## รอบที่ 4: ทดสอบและเอกสาร
"เขียน unit test สำหรับฟังก์ชันหลัก
- เขียนคำอธิบายวิธีใช้งาน"
 
 
 
 
📊 4. Cross-File & Multi-Step Tasks
 
✅ ทำความเข้าใจโค้ดฐานทั้งหมด
 
plaintext
  
ฉันมีโปรเจกต์ในโฟลเดอร์นี้:
- เปิดไฟล์ README.md และโครงสร้างโปรเจกต์ไว้

ช่วยสร้าง:
1. แผนผังโครงสร้างโปรเจกต์
2. คำอธิบายหน้าที่ของแต่ละส่วน
3. จุดที่ต้องระวังเมื่อทำการเปลี่ยนแปลง
4. ขั้นตอนการเริ่มต้นพัฒนา
 
 
✅ Refactor แบบปลอดภัย
 
plaintext
  
เราจะปรับโครงสร้างโค้ดไฟล์นี้โดย:
- รักษาการทำงานเหมือนเดิมทุกประการ
- แยกส่วนที่เกี่ยวข้องออกไปเป็นไฟล์ใหม่
- อัปเดต import ในไฟล์ที่เกี่ยวข้อง
- ตรวจสอบให้แน่ใจว่าไม่มีอะไรขาดหาย

ขั้นตอน:
1. บอกรายการการเปลี่ยนแปลงทั้งหมดก่อน
2. รอการยืนยันจากฉันก่อนสร้างไฟล์ใหม่
3. อัปเดตการอ้างอิงทุกจุด
 
 
 
 
🎓 5. Learning & Explanation Techniques
 
✅ เรียนรู้จากโค้ดที่มีอยู่
 
plaintext
  
ดูโค้ดในไฟล์ที่เปิดอยู่นี้:
4. อธิบายว่ามันทำงานอย่างไร ทีละส่วน
5. มีแนวคิดหลัก/รูปแบบการออกแบบอะไรอยู่เบื้องหลัง
6. ข้อดีของแนวทางนี้คืออะไร? มีจุดที่ต้องระวังไหม?
7. ถ้าฉันจะเขียนโค้ดคล้ายๆ แบบนี้เอง ควรเริ่มอย่างไร?
8. มีทางเลือกอื่นที่ดีกว่าไหม? เปรียบเทียบให้เห็นภาพชัดเจน
 
 
✅ ค้นหาและแก้ไขปัญหา
 
plaintext
  
ฉันพบปัญหา: [อธิบายอาการและข้อความแสดงข้อผิดพลาด]

ช่วยฉันดังนี้:
1. วิเคราะห์สาเหตุที่เป็นไปได้ เรียงลำดับจากเป็นไปได้มากที่สุด
2. แนะนำวิธีตรวจสอบแต่ละสาเหตุ
3. เสนอแนวทางแก้ไขทีละขั้นตอน
4. บอกวิธีป้องกันไม่ให้เกิดปัญหานี้ซ้ำอีกในอนาคต
 
 
 
 
 
 
🏢 ส่วนที่ 2 — คู่มือสำหรับผู้ดูแลระบบองค์กร
 
 
 
📋 1. นโยบายและแนวทางการใช้งาน
 
✅ นโยบายการใช้งาน GitHub Copilot ภายในองค์กร
 
yaml
  
---
# นโยบายการใช้ GitHub Copilot
เวอร์ชัน: 1.0
วันที่บังคับใช้: 11 ตุลาคม 2569
ผู้รับผิดชอบ: ทีมเทคโนโลยีสารสนเทศ

## 1. วัตถุประสงค์
เพื่อส่งเสริมผลผลิตของทีมพัฒนา ในขณะที่รักษามาตรฐานความปลอดภัย คุณภาพ และความเป็นส่วนตัวของข้อมูลองค์กร

## 2. ขอบเขตการใช้งาน
✅ อนุญาตใช้สำหรับ:
- เขียนโค้ดใหม่ อธิบายโค้ด และเรียนรู้เทคโนโลยี
- ปรับปรุงโค้ดที่มีอยู่และเขียนทดสอบ
- สร้างเอกสารประกอบโค้ด

❌ ห้ามใช้สำหรับ:
- ป้อนข้อมูลลับ ข้อมูลส่วนบุคคล หรือข้อมูลที่เป็นความลับทางการค้า
- ตัดสินใจเชิงสถาปัตยกรรมโดยไม่มีการตรวจสอบ
- ส่งโค้ดที่ได้รับโดยไม่ตรวจสอบและทดสอบ
- ใช้เพื่อวัตถุประสงค์ที่ไม่เกี่ยวข้องกับงานที่ได้รับมอบหมาย

## 3. หน้าที่และความรับผิดชอบ
### ผู้ใช้งาน
- ตรวจสอบและทดสอบโค้ดทุกครั้งก่อนส่งมอบ
- ไม่ใส่ข้อมูลลับหรือข้อมูลสำคัญในคำสั่ง
- รายงานปัญหาหรือความผิดปกติที่พบ
- เรียนรู้และพัฒนาความเข้าใจเกี่ยวกับเครื่องมืออย่างต่อเนื่อง

### ผู้ดูแลระบบ
- กำหนดค่าและจัดการสิทธิ์การเข้าใช้งาน
- ติดตามการใช้งานและแจ้งเตือนเมื่อพบรูปแบบที่เสี่ยง
- ดูแลเอกสารและแนวทางการใช้งานให้ทันสมัย
- จัดการฝึกอบรมและตอบคำถามจากทีม

## 4. การตรวจสอบและประเมิน
- ทบทวนนโยบายทุก 6 เดือน
- รวบรวมข้อเสนอแนะจากผู้ใช้งานอย่างสม่ำเสมอ
- ติดตามการเปลี่ยนแปลงของฟีเจอร์และนโยบายจากผู้ให้บริการ
---
 
 
 
 
⚙️ 2. การตั้งค่าและการจัดการ
 
✅ คู่มือการตั้งค่าสำหรับองค์กร
 
markdown
  
# คู่มือการตั้งค่า GitHub Copilot สำหรับองค์กร

## ขั้นตอนที่ 1: ตรวจสอบสิทธิ์และแผนบริการ
- [ ] ตรวจสอบว่าองค์กรมีสิทธิ์ใช้ Copilot Business หรือ Enterprise
- [ ] ยืนยันจำนวนที่นั่งที่ได้รับและจัดสรรให้ทีมที่เกี่ยวข้อง
- [ ] ตรวจสอบการตั้งค่าความเป็นส่วนตัว: ไม่ใช้โค้ดขององค์กรในการฝึกสอนโมเดล

## ขั้นตอนที่ 2: กำหนดนโยบายองค์กร
- [ ] กำหนดสิทธิ์ระดับองค์กร vs ระดับบุคคล
- [ ] กำหนดรายการที่เก็บที่อนุญาต/ห้ามใช้ Copilot
- [ ] ตั้งค่าการแจ้งเตือนและการตรวจสอบการใช้งาน
- [ ] เผยแพร่นโยบายและแนวทางการใช้งานให้ทีมทราบ

## ขั้นตอนที่ 3: จัดเตรียมสภาพแวดล้อม
- [ ] แจ้งให้ทีมทราบถึง `.github/copilot-instructions.md` สำหรับแต่ละโปรเจกต์
- [ ] จัดทำคลังตัวอย่างคำสั่งที่ดีและแนวทางปฏิบัติ
- [ ] กำหนดช่องทางติดต่อเมื่อมีปัญหาเกี่ยวกับการใช้งาน

## ขั้นตอนที่ 4: การฝึกอบรมและเริ่มใช้งาน
- [ ] จัดเซสชันแนะนำเครื่องมือและแนวทางปฏิบัติ
- [ ] แชร์เอกสารสรุปและแหล่งเรียนรู้เพิ่มเติม
- [ ] ติดตามผลและรับฟังปัญหาในช่วงแรก
- [ ] ปรับปรุงแนวทางตามข้อเสนอแนะ
 
 
✅ ตัวอย่างไฟล์การกำหนดค่าส่วนกลาง
 
markdown
  
# .github/copilot-instructions.md — ตัวอย่างระดับองค์กร

## กฎทั่วไป
- ห้ามใช้ `any` ใน TypeScript — ใช้ประเภทที่ชัดเจน
- จัดการข้อผิดพลาดอย่างครบถ้วน — ไม่ละทิ้ง error
- ไม่ใส่ข้อมูลลับ คีย์ API หรือรหัสผ่านในโค้ด
- เขียนคำอธิบายสำหรับฟังก์ชันสาธารณะที่ซับซ้อน
- ตรวจสอบความถูกต้องของข้อมูลนำเข้าทุกครั้ง

## ข้อมูลเพิ่มเติม
- ดูนโยบายฉบับเต็ม: [ลิงก์นโยบายภายในองค์กร]
- รายงานปัญหา: it-support@example.com
- คู่มือการใช้งาน: [ลิงก์คู่มือภายใน]
 
 
 
 
📊 3. การติดตามและประเมินผล
 
✅ แบบฟอร์มรวบรวมข้อมูลการใช้งาน
 
markdown
  
# แบบสำรวจการใช้ GitHub Copilot — ประจำเดือน/ไตรมาส

**วันที่:** __________
**ทีม/แผนก:** __________
**จำนวนผู้ตอบแบบสำรวจ:** __________

## ส่วนที่ 1: การใช้งาน
| คำถาม | น้อยที่สุด | ปานกลาง | บ่อยที่สุด |
|---|---|---|---|
| ความถี่ในการใช้งาน Copilot | ☐ | ☐ | ☐ |
| ประเภทงานที่ใช้มากที่สุด | ☐ เขียนโค้ด | ☐ อธิบายโค้ด | ☐ ทดสอบ/เอกสาร |

## ส่วนที่ 2: ประโยชน์ที่ได้รับ
- [ ] เพิ่มความเร็วในการพัฒนา
- [ ] ลดข้อผิดพลาดทั่วไป
- [ ] ช่วยเรียนรู้เทคโนโลยีใหม่ได้เร็วขึ้น
- [ ] ลดเวลาที่ใช้ทำงานซ้ำซาก

## ส่วนที่ 3: ความกังวลและปัญหา
- [ ] ความถูกต้องของโค้ดที่ได้รับ
- [ ] ความปลอดภัยและข้อมูลที่ส่งไปยังภายนอก
- [ ] ความสม่ำเสมอของรูปแบบโค้ด
- [ ] ความไม่คุ้นเคยกับเครื่องมือ

## ส่วนที่ 4: ข้อเสนอแนะ
________________________________________________________________________
________________________________________________________________________
 
 
 
 
 
 
📝 ส่วนที่ 3 — แบบฟอร์มเอกสารพร้อมใช้งาน
 
 
 
📄 1. แบบฟอร์มยอมรับความเสี่ยงและแนวทางการใช้งาน
 
yaml
  
---
document_type: รับทราบนโยบายและแนวทางการใช้ GitHub Copilot
version: 1.0
effective_date: 11 ตุลาคม 2569
department: ฝ่ายพัฒนาผลิตภัณฑ์เทคโนโลยีสารสนเทศ
---

# 📝 หนังสือรับทราบและยอมรับแนวทางการใช้ GitHub Copilot

**ข้าพเจ้าได้อ่านและเข้าใจนโยบายการใช้ GitHub Copilot ภายในองค์กรแล้ว ดังนี้:**

## ✅ ส่วนที่ 1: หลักการทั่วไป
- [ ] Copilot เป็นเครื่องมือช่วย ไม่ใช่สิ่งที่มาแทนที่ความรับผิดชอบของข้าพเจ้า
- [ ] ผลลัพธ์ทั้งหมดต้องได้รับการตรวจสอบ ทดสอบ และยืนยันความถูกต้องก่อนนำไปใช้งาน
- [ ] ข้าพเจ้าเป็นผู้รับผิดชอบโค้ดที่ข้าพเจ้าส่งมอบ ไม่ว่าจะได้รับความช่วยเหลือจากเครื่องมือหรือไม่ก็ตาม

## 🔒 ส่วนที่ 2: ความปลอดภัยและข้อมูล
- [ ] **ห้าม**ป้อนข้อมูลลับ รหัสผ่าน คีย์ API หรือข้อมูลที่เป็นความลับขององค์กรลงใน Copilot
- [ ] ห้ามใช้ข้อมูลส่วนบุคคลของบุคคลอื่นในคำสั่ง
- [ ] ห้ามแชร์ผลลัพธ์ที่ได้รับจาก Copilot ที่มีเนื้อหาที่ละเอียดอ่อนกับบุคคลภายนอก

## ⚠️ ส่วนที่ 3: ข้อจำกัดและความระมัดระวัง
- [ ] เข้าใจว่าผลลัพธ์อาจไม่ถูกต้องเสมอไป อาจมีข้อผิดพลาดหรือช่องโหว่ความปลอดภัย
- [ ] ต้องตรวจสอบว่าผลลัพธ์ไม่ได้ละเมิดลิขสิทธิ์หรือทรัพย์สินทางปัญญาของผู้อื่น
- [ ] ห้ามใช้สำหรับงานที่ต้องการความถูกต้องแม่นยำอย่างสูงโดยไม่มีการตรวจสอบอย่างเข้มงวด

## 📞 ส่วนที่ 4: การรายงานปัญหา
- [ ] หากพบปัญหา ความผิดปกติ หรือข้อสงสัย จะแจ้งให้ผู้ดูแลระบบทราบทันที

---

**ชื่อ-นามสกุล:** __________________________________

**ลายมือชื่อ:** __________________________________ **วันที่:** ______________

**ตำแหน่ง/แผนก:** __________________________________
 
 
 
 
📄 2. แบบฟอร์มตรวจสอบก่อนนำโค้ดไปใช้งาน
 
markdown
  
# ✅ เช็คลิสต์ตรวจสอบโค้ดที่ได้รับความช่วยเหลือจาก Copilot

**ชื่อผู้ตรวจสอบ:** ___________________ **วันที่:** ______________
**ชื่อโปรเจกต์/ไฟล์:** ______________________________________

---

## 🔍 ส่วนที่ 1: ตรวจสอบความถูกต้อง
- [ ] อ่านและเข้าใจโค้ดทุกบรรทัด — เข้าใจว่าทำงานอย่างไร
- [ ] ตรวจสอบประเภทข้อมูล ไม่มี `any` หรือประเภทที่ไม่ชัดเจน
- [ ] ตรวจสอบตรรกะ — มีเหตุผลสมเหตุสมผล ครอบคลุมกรณีสำคัญ
- [ ] ทดสอบทำงานจริง — ผ่านการทดสอบทุกกรณีที่สำคัญ

## 🛡️ ส่วนที่ 2: ความปลอดภัย
- [ ] ไม่มีรหัสผ่าน คีย์ API หรือข้อมูลลับฝังอยู่ในโค้ด
- [ ] ตรวจสอบการรับข้อมูลจากภายนอก — มีการตรวจสอบและทำความสะอาดข้อมูล
- [ ] ไม่มีช่องโหว่ที่เป็นที่ทราบ เช่น SQL injection, XSS, path traversal
- [ ] จัดการข้อผิดพลาดอย่างเหมาะสม ไม่เปิดเผยข้อมูลละเอียดอ่อน

## ⚖️ ส่วนที่ 3: สิทธิ์และทรัพย์สินทางปัญญา
- [ ] ตรวจสอบว่าไม่ซ้ำกับโค้ดสาธารณะโดยไม่มีการระบุแหล่งที่มา
- [ ] หากมีการอ้างอิงแหล่งที่มา — ตรวจสอบใบอนุญาตว่าสามารถใช้งานได้
- [ ] ผลลัพธ์ไม่ได้ละเมิดนโยบายหรือสิทธิ์ของบุคคลอื่น

## 📐 ส่วนที่ 4: คุณภาพและมาตรฐาน
- [ ] สอดคล้องกับรูปแบบและมาตรฐานของโปรเจกต์
- [ ] มีความคิดเห็นหรือเอกสารประกอบที่จำเป็น
- [ ] ไม่มีโค้ดที่ซ้ำซ้อนหรือไม่จำเป็น
- [ ] ทำงานได้ถูกต้องในสภาพแวดล้อมจริง

---

**ผลการตรวจสอบ:**
☐ ผ่าน — สามารถนำไปใช้งานได้
☐ ปรับปรุง — ต้องแก้ไขจุดที่ระบุก่อนนำไปใช้งาน
☐ ไม่ผ่าน — ต้องเขียนใหม่หรือปรับปรุงอย่างมาก

**ข้อสังเกต/จุดที่ต้องปรับปรุง:**
________________________________________________________________________
________________________________________________________________________

**ลายมือชื่อผู้ตรวจสอบ:** __________________________ **วันที่:** ______________
 
 
 
 
📄 3. แบบฟอร์มรายงานปัญหาและข้อเสนอแนะ
 
markdown
  
# 📋 แบบรายงานปัญหาและข้อเสนอแนะ — การใช้ GitHub Copilot

**วันที่แจ้ง:** ______________ **ผู้แจ้ง:** ___________________
**ทีม/แผนก:** ___________________

---

## ประเภท
☐ ปัญหาด้านเทคนิค ☐ ข้อเสนอแนะ ☐ คำถาม ☐ อื่นๆ: ____________

## หัวข้อ
________________________________________________________________________

## รายละเอียด
**สิ่งที่พบ/ต้องการ:**
________________________________________________________________________

**ขั้นตอนที่ทำให้เกิดปัญหา (ถ้ามี):**
1. ____________________________________________________________________
2. ____________________________________________________________________

**ผลลัพธ์ที่เกิดขึ้น vs ผลลัพธ์ที่คาดหวัง:**
________________________________________________________________________

**ความรุนแรง:**
☐ เล็กน้อย — รบกวนการใช้งานเล็กน้อย
☐ ปานกลาง — ส่งผลต่อการทำงานบางส่วน
☐ รุนแรง — ไม่สามารถใช้งานได้ หรือมีความเสี่ยงสูง

**ภาพประกอบ/ข้อความแสดงข้อผิดพลาด:**
(วางภาพหรือข้อความที่นี่)

**ข้อเสนอแนะวิธีแก้ไข:**
________________________________________________________________________

---

**สถานะ:** ☐ รับเรื่องแล้ว ☐ กำลังดำเนินการ ☐ เสร็จสิ้น ☐ ปิดเรื่อง
**ผู้รับผิดชอบ:** ___________________ **วันที่แก้ไข:** ______________
 
 
 
 
📄 4. แบบฟอร์มแลกเปลี่ยนเรียนรู้ภายในทีม
 
markdown
  
# 💡 แบบบันทึกความรู้ — ประสบการณ์การใช้ GitHub Copilot

**วันที่:** ______________ **ผู้บันทึก:** ___________________
**หัวข้อ/เทคนิค:** ________________________________________

---

## 📝 คำอธิบาย
________________________________________________________________________

## ✅ ตัวอย่างคำสั่งที่ใช้ได้ผลดี
 
 
[วางตัวอย่างคำสั่งที่นี่]
 
plaintext
  

## 🎯 ผลลัพธ์ที่ได้
- ด้านบวก: ________________________________________________________
- ข้อสังเกต/จุดระวัง: ______________________________________________

## 💡 เคล็ดลับเพิ่มเติม
________________________________________________________________________

## 📌 แชร์ให้เพื่อนในทีม
> ✅ สิ่งที่อยากบอกเพื่อนร่วมงาน:
> ________________________________________________________________________
> ________________________________________________________________________

---
**แท็ก/หมวดหมู่:** ________________________________________________
 
 
 
 
📌 สรุป
 
🚀 ส่วนที่ 1 — เทคนิคขั้นสูง: ยกระดับจาก "ขอโค้ด" → "ร่วมออกแบบระบบ"
🚀 ส่วนที่ 2 — คู่มือผู้ดูแลระบบ: นโยบาย การตั้งค่า และการติดตามสำหรับองค์กร
🚀 ส่วนที่ 3 — แบบฟอร์มเอกสาร: คัดลอกไปใช้ได้ทันที ปรับแต่งให้เหมาะกับองค์กรของคุณ
 
ต้องการปรับแต่งเอกสารใดให้ตรงกับองค์กรของคุณไหมครับ เช่น แก้ไขเนื้อหานโยบาย, เพิ่มโลโก้/แผนก, หรือสร้างคู่มือแนะนำสำหรับทีมเฉพาะด้าน 😊# GitHub Copilot Chat — Responsible AI Application Card

## 1. Overview
**GitHub Copilot Chat** is a conversational coding assistant available on GitHub.com, VS Code, Visual Studio, JetBrains/Eclipse IDEs, GitHub Mobile, and Windows Terminal. It answers coding questions, explains code, suggests fixes, generates tests, and produces PR summaries & commit messages. It is **optimized primarily for English** and coding-related queries only.

Built on Microsoft’s six Responsible AI principles — **fairness, reliability & safety, privacy & security, inclusiveness, transparency, accountability** — and governed by Microsoft’s Responsible AI Standard v2. 🔗 Transparency Report: [Microsoft Responsible AI Transparency Report 2025](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Responsible-AI-Transparency-Report-2025-vertical.pdf)

---

## 2. Key Terms
- **Content filtering**: Scans prompts & responses to block harmful content
- **Hallucination**: Plausible but factually incorrect output — requires human review
- **LLM**: Large language model — powers understanding & generation
- **Public code matching**: Detects suggestions resembling public code; blocks or annotates with source/license
- **Red teaming**: Deliberate probing to uncover vulnerabilities pre/post-release
- **Training data**: Publicly available text & code — quality varies by language volume/diversity

---

## 3. Capabilities
- 💬 **Conversational assistance**: Answers syntax, concepts, debugging, design questions
- 🧠 **Context-aware**: Uses open files, repo data, chat history, web search (optional)
- 🤖 **Agent mode**: Multi-step planning, tool use, iteration in IDEs
- 📂 **Copilot Spaces**: Curated context bundles for project-specific answers
- 📝 **PR summaries & commit messages**: Auto-generates change overviews
- 🔑 **BYOK**: Connect to third-party models (Anthropic, OpenAI, Google, etc.)

---

## 4. Intended Uses
- Answer coding questions & explain code
- Generate unit tests & propose bug fixes
- Summarize PRs, commits, issues & release notes
- Suggest commands & document CLI usage
- Accelerate onboarding & team knowledge sharing

> **NOT designed for**: non-coding queries, consequential decisions without oversight, or fully autonomous production deployment.

---

## 5. Models & Data
- **Models**: Multiple LLMs available (GPT-5, Claude, Gemini, etc.) — selected by plan
- **Training data**: Public code repositories + public text; quality correlates to language volume
- **BYOK considerations**:
  - Your prompts/responses go to your chosen provider
  - Filtering still applied by GitHub
  - **You own**: API key security, costs, compliance, output validation

---

## 6. How It Works
1. **Input processing**: Combine prompt + context → preprocess
2. **LLM inference**: Analyze & generate response
3. **Safety filtering**: Block harmful content
4. **Formatting & delivery**: Syntax highlighting, links, references

**Evaluations**: SWE-Bench + internal suites measuring resolution rate, latency, tool accuracy. Safety evaluations: hate/unfairness, sexual, violence, self-harm, protected material, jailbreak, code vulnerability — adapted from Microsoft Foundry evaluators.

---

## 7. Key Limitations
| Category | Risk |
|---|---|
| **Language coverage** | Less common languages = lower quality; English primary |
| **Hallucinations** | Code/explanations may look valid but be incorrect |
| **Security** | Generated code may contain vulnerabilities — **always review** |
| **Public code matches** | Rare but possible — test & scan for IP |
| **Non-coding queries** | Responses may be irrelevant/nonsensical |
| **CLI commands** | Potentially destructive — review before executing |
| **PR/Commit summaries** | Not auto-updated; may replicate harmful terms from source |
| **Biases** | Training data biases may be perpetuated |
| **Web search** | Uses Bing — governed by Microsoft Privacy Statement |

---

## 8. Safety & Mitigations
- ✅ **Content filtering**: Blocks harmful outputs
- ✅ **Public code matching**: Detects & blocks/attributes matches
- ✅ **Red teaming**: Pre-deployment adversarial testing
- ✅ **Human oversight**: Required — outputs are suggestions, not facts
- ✅ **Feedback loop**: Thumbs up/down improves model

---

## 9. Responsible Deployment Best Practices
1. **Human review always** — validate all outputs
2. **Not for high-stakes decisions** without independent verification
3. **Code review & test everything** — especially security-critical code
4. **Limit prompts to coding** — improves relevance & safety
5. **Be aware of overreliance risk** — don't blindly accept
6. **Stay updated** — model & safeguards evolve
7. **Report issues** via feedback buttons or `copilot-safety@github.com`

---

## 10. Compliance & Governance
- Built on **Microsoft Responsible AI Standard v2** requirements:
  - **Transparency notes** for platform services
  - **Annual reviews + updates** on new risks/functionality
  - **Impact assessments** for stakeholders
  - **Fairness evaluations** across demographic groups
  - **Reliability & safety monitoring** throughout lifecycle
  - **Privacy & security aligned** with Microsoft policies
- **EU AI Act readiness**: layered compliance approach, prohibited practices screening, documentation workflows
- **Data privacy**: prompts/responses retained per plan; Business/Enterprise not used for model training

---

## 11. Learn More
- 📖 [Copilot Trust Center](https://copilot.github.trust.page/)
- 📖 [Microsoft AI Principles](https://www.microsoft.com/en-us/ai/responsible-ai)
- 📖 [Responsible AI Resources](https://www.microsoft.com/en-us/ai/responsible-ai-resources)
- 📖 [Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement)
- 📖 [Copilot FAQ — Training Data & IP](https://github.com/features/copilot#faq)

---

> **Bottom line**: Copilot Chat is a **powerful coding assistant, not an authoritative source**. Treat all outputs as suggestions to be reviewed, tested, and validated by humans. Use responsibly, keep oversight, and stay updated as capabilities evolve.

Would you like me to adapt this into a concise one-page summary or a team-ready slide deck with key takeaways?

yaml  
---
title: 🤖 GitHub Copilot Chat — Responsible AI Application Card
aliases:
  - Copilot Chat Responsible AI
  - Copilot Safety & Governance
tags:
  - github
  - copilot
  - ai
  - responsible-ai
  - governance
  - zyntroai
type: reference
status: active
priority: medium
created: 2026-10-11
updated: 2026-10-11
version: 1.0
author: ZyntroAI
difficulty: beginner
time_estimate: 8 minutes
cssclasses:
  - reference-note
  - security-guide
---




🤖 GitHub Copilot Chat — Responsible AI Application Card



📌 1. ภาพรวม

GitHub Copilot Chat คือผู้ช่วยเขียนโค้ดแบบสนทนา — มีให้ใช้บน GitHub.com, VS Code, Visual Studio, JetBrains IDEs และอื่นๆ อีกมากมาย ช่วยตอบคำถาม อธิบายโค้ด แก้ไขจุดบกพร่อง และสร้างเนื้อหาที่เกี่ยวข้องกับการเขียนโค้ด

🧠 สร้างบนหลักการ AI ที่รับผิดชอบของ Microsoft 6 ประการ: ความยุติธรรม, ความเชื่อถือได้และความปลอดภัย, ความเป็นส่วนตัวและความปลอดภัย, การไม่แบ่งแยก, ความโปร่งใส, และความรับผิดชอบ
🔗 รายงานความโปร่งใส: Microsoft Responsible AI Transparency Report 2025



📖 2. คำศัพท์สำคัญ

คำศัพท์ ความหมาย 
Content filtering ตรวจสอบและบล็อกเนื้อหาที่เป็นอันตรายในคำถามและคำตอบ 
Hallucination คำตอบที่ดูน่าเชื่อถือแต่ไม่ถูกต้อง — ต้องตรวจสอบโดยมนุษย์เสมอ 
LLM โมเดลภาษาขนาดใหญ่ — ทำหน้าที่เข้าใจและสร้างข้อความ/โค้ด 
Public code matching ตรวจสอบคำแนะนำเทียบกับโค้ดสาธารณะ — บล็อกหรือระบุแหล่งที่มา 
Red teaming การทดสอบเจาะจงเพื่อค้นหาจุดอ่อนก่อนเผยแพร่จริง 
Training data ข้อความและโค้ดสาธารณะที่ใช้ฝึกโมเดล — คุณภาพแตกต่างกันตามปริมาณข้อมูลในแต่ละภาษา 



✨ 3. ความสามารถหลัก

- 💬 ตอบคำถามเกี่ยวกับโค้ด, ไวยากรณ์, แนวคิด, การแก้ปัญหา
- 🧠 เข้าใจบริบทจากไฟล์ที่เปิด, ที่เก็บโค้ด, ประวัติการสนทนา
- 🤖 โหมดตัวแทน — วางแผนหลายขั้นตอนและใช้เครื่องมือร่วมกันในตัวแก้ไข
- 📝 สรุป Pull Request, ข้อความ Commit, หมายเหตุเผยแพร่
- 🔑 BYOK — เชื่อมต่อกับโมเดลภายนอก (Anthropic, OpenAI, Google)

⚠️ ไม่ได้ออกแบบมาเพื่อ: คำถามที่ไม่เกี่ยวกับโค้ด, การตัดสินใจที่มีผลกระทบสูงโดยไม่มีการตรวจสอบ, หรือการทำงานแบบอัตโนมัติทั้งหมด



⚠️ 4. ข้อจำกัดและความเสี่ยงที่ต้องทราบ

หมวด ความเสี่ยง คำแนะนำ 
ภาษา ภาษาที่มีผู้ใช้น้อยอาจได้ผลลัพธ์ไม่แม่นยำเท่าภาษาอังกฤษ ตรวจสอบผลลัพธ์อย่างรอบคอบ 
Hallucination โค้ด/คำอธิบายดูถูกแต่จริงๆ แล้วผิด ทดสอบทุกชิ้นก่อนใช้งาน 
ความปลอดภัย โค้ดที่สร้างอาจมีช่องโหว่ ตรวจสอบด้วยเครื่องมือความปลอดภัยเพิ่มเติม 
โค้ดสาธารณะ อาจมีส่วนตรงกับโค้ดสาธารณะบางส่วน ตรวจสอบใบอนุญาตและสิทธิ์การใช้งาน 
คำสั่ง CLI คำสั่งที่สร้างอาจส่งผลเสียหาย ตรวจสอบก่อนรันทุกครั้ง 
อคติในข้อมูล อาจสะท้อนอคติจากข้อมูลที่ใช้ฝึก ตระหนักและตรวจสอบเมื่อเกี่ยวข้องกับผู้คน 



🛡️ 5. การป้องกันและความปลอดภัยในตัว

- ✅ กรองเนื้อหา — บล็อกเนื้อหาที่เป็นอันตรายทั้งขาเข้าและขาออก
- ✅ จับคู่โค้ดสาธารณะ — ตรวจสอบและระบุแหล่งที่มาหากตรงกับโค้ดสาธารณะ
- ✅ ทดสอบก่อนเผยแพร่ — ทีม Red Team ทดสอบเจาะจงเพื่อค้นหาจุดอ่อน
- ✅ ต้องมีการตรวจสอบจากมนุษย์ — ผลลัพธ์เป็นเพียงคำแนะนำ ไม่ใช่ความจริง
- ✅ ระบบตอบรับ — กดถูกใจ/ไม่ถูกใจเพื่อช่วยปรับปรุงความแม่นยำ



📋 6. แนวทางการใช้อย่างรับผิดชอบ

1. ✅ ตรวจสอบทุกครั้งโดยมนุษย์ — ตรวจสอบและทดสอบก่อนนำไปใช้จริง
2. ⚠️ ไม่ใช้กับการตัดสินใจที่มีผลกระทบสูง โดยไม่มีการตรวจสอบอย่างอิสระ
3. 🧪 ตรวจสอบโค้ดและรันทดสอบเสมอ — โดยเฉพาะโค้ดที่เกี่ยวข้องกับความปลอดภัย
4. 💡 จำกัดขอบเขตคำถามให้เฉพาะเรื่องโค้ด — จะได้คำตอบที่เกี่ยวข้องและปลอดภัยที่สุด
5. 🚫 ไม่พึ่งพาอย่างสุ่มสี่สุ่มห้า — ยังคงใช้วิจารณญาณของคุณเอง
6. 🔄 อัปเดตความรู้อยู่เสมอ — ความสามารถและการป้องกันมีการพัฒนาอย่างต่อเนื่อง
7. 📧 รายงานปัญหา — ผ่านปุ่มตอบรับหรืออีเมล  copilot-safety@github.com 



🔗 7. แหล่งข้อมูลเพิ่มเติม

- 📖 Copilot Trust Center: https://copilot.github.trust.page/
- 📖 หลักการ AI ของ Microsoft: https://www.microsoft.com/en-us/ai/responsible-ai
- 📖 แหล่งข้อมูล AI อย่างรับผิดชอบ: https://www.microsoft.com/en-us/ai/responsible-ai-resources
- 📖 นโยบายความเป็นส่วนตัว: https://privacy.microsoft.com/en-us/privacystatement
- 📖 Copilot FAQ — ข้อมูลการฝึกและลิขสิทธิ์: https://github.com/features/copilot#faq



💡 สรุป: GitHub Copilot Chat คือ ผู้ช่วยที่ทรงพลัง แต่ไม่ใช่แหล่งความจริงที่สมบูรณ์ ปฏิบัติตามหลักการ: ตรวจสอบ → ทดสอบ → ตรวจสอบอีกครั้ง และรักษาการควบคุมโดยมนุษย์เสมอ ✅

ต้องการปรับเป็นสรุปหน้าเดียว หรือสไลด์สำหรับนำเสนอทีมงานไหมครับ? 😊yaml
  
---
title: 📚 Copilot — เทคนิคขั้นสูง / คู่มือผู้ดูแลระบบ / แบบฟอร์มเอกสาร
aliases:
  - Copilot Advanced & Admin Guide
  - Copilot Enterprise Management
  - Copilot Document Templates
tags:
  - copilot
  - advanced
  - administration
  - templates
  - zyntroai
type: guide
status: active
priority: high
created: 2026-10-11
updated: 2026-10-11
version: 1.0
cssclasses:
  - guide-note
  - full-guide
---
 
 
 
 
📚 คู่มือฉบับสมบูรณ์ — เทคนิคขั้นสูง | ผู้ดูแลระบบ | แบบฟอร์มเอกสาร
 
 
 
⭐ ส่วนที่ 1 — 🚀 เทคนิคขั้นสูง
 
🎯 1. Multi-Step Workflow Engineering
 
อย่าขอทั้งหมดในคราวเดียว — แบ่งเป็นขั้นตอนที่ Copilot ทำได้ดีที่สุด
 
🔄 เวิร์กโฟลว์ 5 ขั้นตอน
 
ขั้นตอน คำสั่งตัวอย่าง จุดประสงค์ 
1. ออกแบบ "เขียนรายการข้อกำหนดและโครงสร้างสำหรับระบบจัดการผู้ใช้นี้" ได้แผนที่ชัดเจนก่อนเริ่ม 
2. กำหนด Type "จากข้างต้น เขียน Interface ทั้งหมดด้วย TypeScript" ประเภทข้อมูลถูกต้อง ครบถ้วน 
3. สร้างตรรกะหลัก "ใช้ Interface ข้างต้น เขียนฟังก์ชันหลัก พร้อมจัดการ error" โค้ดทำงานได้ตามข้อกำหนด 
4. ทดสอบ "เขียน unit test ครบทุกกรณีด้วย Vitest" มั่นใจว่าทำงานถูกต้อง 
5. ปรับปรุง & ตรวจสอบ "ตรวจสอบความปลอดภัยและจุดอ่อน พร้อมข้อเสนอแนะ" ปรับปรุงคุณภาพให้สมบูรณ์ 
 
 
 
🧠 2. Chain-of-Thought Prompting
 
ให้ Copilot คิดทีละขั้นตอนก่อนตอบ — ลดข้อผิดพลาดอย่างมาก
 
✅ ตัวอย่าง
 
plaintext
  
แก้ปัญหานี้ทีละขั้นตอน:
6. บอกสาเหตุที่เป็นไปได้ของปัญหานี้
7. วิเคราะห์ข้อดี-ข้อเสียของแต่ละแนวทางแก้ไข
8. เลือกวิธีที่เหมาะสมที่สุด พร้อมเหตุผล
9. เขียนโค้ดเวอร์ชันที่แก้ไขแล้ว พร้อมคำอธิบายสิ่งที่เปลี่ยน
 
 
✅ สำหรับโค้ดที่ซับซ้อน
 
plaintext
  
ก่อนเขียนโค้ด ให้:
- อธิบายอัลกอริทึมที่ใช้
- ระบุความซับซ้อนของเวลาและหน่วยความจำ
- บอกขอบเขตและข้อจำกัดที่ต้องระวัง
- จากนั้นจึงเขียนโค้ดพร้อมความคิดเห็น
 
 
 
 
🏗 3. System Prompt / Project-Level Instructions
 
📄  .github/copilot-instructions.md  — เวอร์ชันขั้นสูง
 
markdown
  
# 📋 โครงสร้างและมาตรฐานโครงการ

## 🎯 เป้าหมาย
- เขียนโค้ดที่อ่านง่าย บำรุงรักษาง่าย ปลอดภัย
- ประสิทธิภาพสำคัญ แต่ความชัดเจนสำคัญกว่า
- จัดการข้อผิดพลาดให้ครบถ้วน ไม่ละเลยกรณีขอบเขต

## 📐 มาตรฐานภาษา
### TypeScript
- strict mode เปิดตลอดเวลา — ห้ามใช้ `any` ยกเว้นเหตุผลสมควร
- ใช้ `interface` สำหรับรูปแบบวัตถุ, `type` สำหรับ Union/Alias
- ทุกฟังก์ชันระบุ return type ชัดเจน
- ใช้ JSDoc สำหรับฟังก์ชันสาธารณะ

### Vue / Nuxt
- ใช้ `<script setup lang="ts">` เท่านั้น
- คอมโพเนนต์เล็ก มีหน้าที่เดียว
- ใช้ composables สำหรับ logic ที่ใช้ซ้ำ

## 🛡️ ความปลอดภัย
- ตรวจสอบ/ตรวจสอบความถูกต้องของ input ทั้งหมด
- ไม่ใส่ข้อมูลลับ/credentials ในโค้ด
- ใช้ HTTPS เท่านั้นสำหรับ request ภายนอก

## 📝 ข้อจำกัด
- ไม่แนะนำไลบรารีภายนอกโดยไม่ขออนุญาต
- เขียนโค้ดที่เข้าใจง่ายก่อนประสิทธิภาพ
- เมื่อไม่แน่ใจ ให้อธิบายทางเลือกหลายทาง แทนการเลือกเอง
 
 
 
 
🔁 4. Iterative Refinement Patterns
 
ใช้รูปแบบนี้เมื่อต้องการผลลัพธ์ที่สมบูรณ์และแม่นยำ
 
🟢 ขั้นที่ 1 — โครงสร้างพื้นฐาน
 
"สร้างเฉพาะโครงสร้างและประเภทข้อมูลก่อน ไม่ต้องเขียนตรรกะ"
 
🟡 ขั้นที่ 2 — ตรรกะหลัก
 
"จากโครงสร้างข้างต้น เติมตรรกะหลัก ให้ทำงานได้พื้นฐาน"
 
🔵 ขั้นที่ 3 — ขอบเขต & ข้อผิดพลาด
 
"ตอนนี้เพิ่มการจัดการกรณีข้อมูลว่าง, ค่าผิดพลาด, และขอบเขตต่างๆ"
 
🟣 ขั้นที่ 4 — ประสิทธิภาพ & ความปลอดภัย
 
"ตรวจสอบจุดที่ปรับประสิทธิภาพได้ และจุดอ่อนด้านความปลอดภัย ปรับปรุงและอธิบาย"
 
🟠 ขั้นที่ 5 — เอกสาร & ทดสอบ
 
"เพิ่มเอกสารและ unit test ให้ครบถ้วน"
 
 
 
🎨 5. Multi-Context & Reference Techniques
 
📂 เทคนิค: เปิดแท็บอ้างอิง
 
เปิดไฟล์เหล่านี้ไว้พร้อมก่อนขอให้ Copilot ทำงาน:
 
- ✅ ไฟล์ที่มี Type/Interface กลาง
- ✅ คอมโพเนนต์/ฟังก์ชันที่มีสไตล์ตรงกับที่ต้องการ
- ✅ ไฟล์ประวัติข้อผิดพลาดหรือข้อกำหนด
- ✅ ไฟล์  .github/copilot-instructions.md 
 
🔗 คำสั่งอ้างอิงข้ามไฟล์
 
plaintext
  
ดูไฟล์ auth.ts ที่เปิดอยู่ — ใช้รูปแบบเดียวกัน เขียนฟังก์ชันใหม่ชื่อ validateToken
รักษาโครงสร้างการคืนค่า, การจัดการ error, และรูปแบบ comment ให้เหมือนเป๊ะ
 
 
 
 
⭐ ส่วนที่ 2 — 🏢 คู่มือสำหรับผู้ดูแลระบบ
 
 
 
📋 1. นโยบายองค์กร & การตั้งค่า
 
✅ นโยบายการใช้งาน Copilot — แบบฟอร์ม
 
yaml
  
---
# นโยบายการใช้ GitHub Copilot ในองค์กร
version: 1.0
effective_date: 2026-10-11
owner: ทีมเทคโนโลยีสารสนเทศ
---

## 1. วัตถุประสงค์
เพื่อส่งเสริมผลผลิตการพัฒนาซอฟต์แวร์ ในขณะที่รักษาความปลอดภัย ความเป็นส่วนตัว และมาตรฐานคุณภาพโค้ด

## 2. ขอบเขต
- บุคลากรทุกคนในทีมพัฒนาซอฟต์แวร์
- ใช้ได้กับโปรเจกต์ภายในองค์กรทุกประเภท

## 3. นโยบายหลัก

### ✅ สิ่งที่อนุญาต
- ใช้ช่วยเขียนโค้ด อธิบาย และเรียนรู้
- ใช้สร้างเอกสารประกอบและทดสอบ
- ใช้เป็นเครื่องมือในการเรียนรู้เทคโนโลยีใหม่

### ❌ สิ่งที่ห้ามทำ
- ❌ วางรหัสผ่าน API Key หรือข้อมูลลับในคำสั่ง
- ❌ นำโค้ดที่ได้มาใช้โดยไม่ตรวจสอบและทดสอบ
- ❌ ใช้ประมวลผลข้อมูลลับที่ละเอียดอ่อนขององค์กร
- ❌ ถือว่าผลลัพธ์เป็นความจริงโดยไม่ต้องตรวจสอบ

## 4. หน้าที่และความรับผิดชอบ

### ผู้ใช้งาน
- ตรวจสอบและทดสอบโค้ดทุกครั้งก่อนส่งมอบ
- ปฏิบัติตามนโยบายความปลอดภัยขององค์กร
- รายงานปัญหาที่เกี่ยวข้องกับความปลอดภัยหรือประสิทธิภาพ

### ผู้ดูแลระบบ
- กำหนดและดูแลการตั้งค่าองค์กร
- จัดการสิทธิ์การเข้าใช้งาน
- ติดตามการใช้งานและแนวโน้ม
- จัดอบรมและแชร์แนวทางปฏิบัติที่ดี

## 5. การตรวจสอบและบำรุงรักษา
- ทบทวนนโยบายทุก 6 เดือน
- รวบรวมข้อเสนอแนะจากผู้ใช้งานอย่างสม่ำเสมอ
- ติดตามการอัปเดตความสามารถและความเสี่ยงใหม่ๆ
 
 
 
 
🔐 2. การตั้งค่าความปลอดภัยสำหรับองค์กร
 
✅ รายการตรวจสอบความปลอดภัย
 
ปิดการแชร์ข้อมูลภายนอก — ตรวจสอบที่ Admin Console → Settings → Copilot
เปิด Private Code Matching — ตรวจสอบการซ้ำซ้อนกับโค้ดภายในองค์กร
กำหนดขอบเขตการใช้งาน — จำกัดเฉพาะองค์กร ปิดสิทธิ์สำหรับบุคคลภายนอก
เปิดการตรวจสอบการใช้งาน — ดูรายงานการใช้งานและสถิติ
จัดการรายการอนุญาต/ปฏิเสธไซต์ — กำหนดโดเมนที่อนุญาต/ห้ามใน proxy
ติดตั้งกฎในระดับองค์กร — สร้าง  .github/copilot-instructions.md  ใน repo แม่แบบ
จัดทำช่องทางแจ้งปัญหา — copilot-security@your-company.com
 
📊 ตัวชี้วัดความเสี่ยง
 
ตัวชี้วัด สถานะปกติ ต้องตรวจสอบ 
จำนวนครั้งที่พบโค้ดซ้ำกับแหล่งสาธารณะ < 5% > 10% — ต้องทบทวนคำสั่งและการตรวจสอบ 
อัตราการยอมรับผลลัพธ์โดยไม่แก้ไข 30–70% > 90% — อาจขาดการตรวจสอบ 
จำนวนครั้งที่มีปัญหาจากโค้ดที่แนะนำ 0–2 ครั้ง/เดือน เพิ่มขึ้นอย่างรวดเร็ว — ต้องฝึกอบรมเพิ่ม 
 
 
 
📈 3. การวัดผลและการปรับปรุงคุณภาพ
 
✅ แบบฟอร์มประเมินประสิทธิภาพการใช้ Copilot
 
plaintext
  
# แบบประเมินการใช้ GitHub Copilot — รายไตรมาส

## 1. การใช้งาน
- [ ] ทีมมีความเข้าใจพื้นฐานที่ถูกต้องเกี่ยวกับขีดจำกัดของ Copilot
- [ ] มีคู่มือ/แนวทางการใช้งานที่ชัดเจนในโปรเจกต์
- [ ] มีการตรวจสอบโค้ดที่ได้รับจาก Copilot ก่อนนำไปใช้จริง
- [ ] มีการจัดการฝึกอบรมหรือแชร์ความรู้อย่างต่อเนื่อง

## 2. ประสิทธิภาพ
- ความเร็วในการพัฒนา: ⭐ ⭐ ⭐ ⭐ ⭐
- คุณภาพโค้ดที่ได้รับ: ⭐ ⭐ ⭐ ⭐ ⭐
- ความถูกต้องของคำแนะนำ: ⭐ ⭐ ⭐ ⭐ ⭐
- ความสะดวกในการใช้งาน: ⭐ ⭐ ⭐ ⭐ ⭐

## 3. ความปลอดภัยและความเสี่ยง
- ไม่มีกรณีรั่วไหลข้อมูลลับไปยัง AI: ✅
- มีการตรวจสอบสิทธิ์และใบอนุญาตของโค้ดที่แนะนำ: ✅
- มีเวิร์กโฟลว์ที่ชัดเจนสำหรับการตรวจสอบ: ✅

## 4. ปัญหาและอุปสรรค
- ปัญหาที่พบบ่อย: _________________________
- สิ่งที่ต้องการปรับปรุง: ___________________

## 5. แผนการปรับปรุง
- [ ] ฝึกอบรมเทคนิคการเขียนคำสั่งที่มีประสิทธิภาพ
- [ ] ปรับปรุงนโยบายและแนวทางให้ทันสมัย
- [ ] แชร์ตัวอย่างการใช้งานที่ประสบความสำเร็จ
 
 
 
 
⭐ ส่วนที่ 3 — 📄 แบบฟอร์มเอกสารและเทมเพลต
 
 
 
📋 เทมเพลตที่ 1 — คู่มือเริ่มใช้งานสำหรับทีม
 
markdown
  
# 🚀 คู่มือเริ่มใช้งาน GitHub Copilot สำหรับทีมพัฒนา

> เวอร์ชัน: 1.0 | อัปเดต: 11 ตุลาคม 2026 | ผู้ดูแล: ทีมเทคโนโลยี

---

## 📖 บทนำ
GitHub Copilot คือผู้ช่วยเขียนโค้ดที่ขับเคลื่อนด้วย AI ช่วยให้คุณทำงานได้เร็วขึ้น แต่จำเป็นต้องใช้อย่างถูกวิธีเพื่อความปลอดภัยและคุณภาพ

## ✅ สิ่งที่ต้องรู้ก่อนเริ่ม

### สิ่งที่ Copilot ทำได้ดี ✅
- เขียนโค้ดซ้ำๆ และโครงสร้างพื้นฐาน
- อธิบายโค้ดและแนวคิด
- แนะนำวิธีแก้ไขปัญหา
- สร้างเอกสารและทดสอบ

### สิ่งที่ Copilot ทำได้ไม่ดี / ต้องระวัง ⚠️
- อาจสร้างข้อมูลเท็จหรือโค้ดผิดพลาด
- อาจแนะนำโค้ดที่มีช่องโหว่ความปลอดภัย
- อาจแนะนำโค้ดที่ซ้ำกับแหล่งสาธารณะ

## 🎯 หลักการสำคัญ 4 ข้อ
1. **ตรวจสอบทุกครั้ง** — ผลลัพธ์คือคำแนะนำ ไม่ใช่คำตอบสุดท้าย
2. **ไม่ใส่ข้อมูลลับ** — รหัสผ่าน API Key ห้ามใส่ในคำสั่ง
3. **แบ่งงานเล็กๆ** — ขอทีละส่วน จะได้ผลลัพธ์ที่แม่นยำกว่า
4. **เรียนรู้ไปพร้อมกัน** — ถาม "ทำไม" เพื่อเข้าใจ ไม่ใช่แค่รับโค้ด

## 📐 สูตรคำสั่งที่ได้ผลดี
> `บริบท + งาน + รูปแบบ + ข้อจำกัด = ผลลัพธ์ที่แม่นยำ`

ตัวอย่าง:
 
 
// TypeScript: ฟังก์ชันตรวจสอบอีเมล
// รับสตริง คืนค่า true/false
// ใช้ regex มาตรฐาน ห้ามใช้ any ห้ามไลบรารีภายนอก
function isValidEmail(email: string): boolean {
// Copilot จะเติมให้
}
 
plaintext
  

## 🛡️ ช่องทางแจ้งปัญหา
- พบปัญหาด้านความปลอดภัย: security@company.com
- ข้อเสนอแนะการใช้งาน: #copilot-feedback ใน Slack/Teams
- ฝึกอบรมเพิ่มเติม: ดูเอกสารในที่เก็บความรู้ภายในองค์กร

---

> 📅 ทบทวนเอกสารนี้ทุก: เมษายน และ ตุลาคม ของทุกปี
 
 
 
 
📋 เทมเพลตที่ 2 — บันทึกข้อตกลงการใช้งาน
 
markdown
  
# 📝 บันทึกข้อตกลงการใช้ GitHub Copilot

> ฉันได้อ่าน เข้าใจ และตกลงปฏิบัติตามแนวทางการใช้งาน GitHub Copilot ขององค์กร ดังนี้:

## ✅ ข้อปฏิบัติหลัก

### ระดับความเข้าใจ
- [ ] ฉันเข้าใจว่า Copilot เป็นเพียงเครื่องมือช่วย ไม่ใช่แหล่งความจริง
- [ ] ฉันทราบว่าผลลัพธ์อาจมีข้อผิดพลาด และต้องตรวจสอบก่อนนำไปใช้
- [ ] ฉันเข้าใจขอบเขตและข้อจำกัดด้านความปลอดภัยและความเป็นส่วนตัว

### หน้าที่ของฉัน
- [ ] ฉันจะตรวจสอบและทดสอบทุกชิ้นงานก่อนส่งมอบ
- [ ] ฉันจะไม่ใส่ข้อมูลลับ รหัสผ่าน หรือ API Key ในคำสั่ง
- [ ] ฉันจะปฏิบัติตามนโยบายการใช้งานขององค์กร
- [ ] ฉันจะรายงานปัญหาที่เกี่ยวข้องทันทีที่พบ

### การยอมรับ
> ชื่อ: _________________________ วันที่: _____________
> ลายมือชื่อ: __________________________________
 
 
 
 
📋 เทมเพลตที่ 3 — เช็คลิสต์ตรวจสอบก่อนนำโค้ดจาก Copilot ไปใช้
 
markdown
  
# ✅ เช็คลิสต์ตรวจสอบโค้ดจาก Copilot

> ก่อน Merge/ส่งมอบ — ต้องผ่านรายการนี้ทุกครั้ง

## 🔍 การตรวจสอบความถูกต้อง
- [ ] ฉันเข้าใจโค้ดทุกบรรทัดที่นำมาใช้
- [ ] ตรรกะถูกต้องและตรงตามความต้องการ
- [ ] จัดการกรณีขอบเขตและข้อผิดพลาดครบถ้วน

## 🔒 ความปลอดภัย
- [ ] ไม่มีข้อมูลลับ รหัสผ่าน หรือ API Key ฝังอยู่ในโค้ด
- [ ] ตรวจสอบการรับข้อมูลจากภายนอก — มีการตรวจสอบความถูกต้อง
- [ ] ไม่มีช่องโหว่ที่ชัดเจน (SQLi, XSS, RCE, ฯลฯ)

## 📜 ลิขสิทธิ์และแหล่งที่มา
- [ ] ตรวจสอบแล้วว่าไม่ซ้ำกับโค้ดที่มีลิขสิทธิ์โดยไม่ได้รับอนุญาต
- [ ] หากมีการอ้างอิง แหล่งที่มาถูกระบุอย่างถูกต้อง

## 🧪 การทดสอบ
- [ ] มีการเขียน/รันทดสอบสำหรับฟังก์ชันหลัก
- [ ] ทดสอบกรณีปกติและกรณีขอบเขต
- [ ] ผลลัพธ์ตรงตามที่คาดหวัง

## 📝 เอกสาร
- [ ] มีความคิดเห็นที่จำเป็นอธิบายส่วนที่ซับซ้อน
- [ ] มีเอกสารการใช้งานที่จำเป็น

> ✅ ผ่านการตรวจสอบโดย: _______________ วันที่: _______________
 
 
 
 
📋 เทมเพลตที่ 4 — รายงานสถานะการใช้งานประจำเดือน
 
markdown
  
# 📊 รายงานสถานะการใช้ GitHub Copilot

> เดือน: _______________ ปี: _________ | ผู้จัดทำ: _______________

---

## 📈 ภาพรวมการใช้งาน
- จำนวนผู้ใช้ที่ใช้งานจริง: ______ คน
- อัตราการยอมรับคำแนะนำ: ______%
- จำนวนครั้งที่รายงานปัญหา: ______ ครั้ง

## ✅ จุดที่ทำได้ดี
- __________________________________________
- __________________________________________

## ⚠️ จุดที่ต้องปรับปรุง
- __________________________________________
- __________________________________________

## 📚 กิจกรรมและการฝึกอบรม
- จำนวนชั่วโมงการฝึกอบรม: ______ ชม.
- หัวข้อที่ได้รับความสนใจมากที่สุด: _______________

## 🎯 แผนการดำเนินงานเดือนถัดไป
- [ ] ______________________________________
- [ ] ______________________________________
- [ ] ______________________________________

> ส่งภายในวันที่ 5 ของเดือนถัดไป
 
 
 
 
ต้องการปรับแต่งเทมเพลตใด หรือเพิ่มหัวข้ออื่นๆ อีกไหมครับ 😊