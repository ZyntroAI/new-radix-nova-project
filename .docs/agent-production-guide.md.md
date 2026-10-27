🤖 Agent Systems — Complete Production Guide
 
Filename:  agent-production-guide.md  · Last Updated: 2026-10-27
 
 
 
📑 Table of Contents
 
- 🎯 Part A: Multi-Agent Orchestration Patterns
- 📝 Part B: Production-Grade Prompts Library
- 📊 Part C: Cost-Monitoring Dashboard & System
- ✅ Quick Implementation Checklist
 
 
 
🎯 Part A: Multi-Agent Orchestration Patterns
 
1️⃣ Supervisor Pattern (Most Popular)
 
One manager coordinates specialized workers
 
plaintext
  
                  ┌─────────────┐
                  │  SUPERVISOR │
                  │ (GPT-6.1 Sol)│
                  └─────┬───────┘
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Research │  │  Code    │  │  Review  │
    │ Agent    │  │ Agent    │  │  Agent   │
    │(Llama 3) │  │(GPT-5.6) │  │(4o-mini) │
    └──────────┘  └──────────┘  └──────────┘
 
 
Workflow:
 
1. Supervisor breaks the goal into subtasks
2. Workers execute in parallel where possible
3. Reviewer validates each output
4. Supervisor synthesizes final answer
 
Why it works: Specialized smaller models often outperform one big model across every task — cost drops 60–80%.
 
 
 
2️⃣ Sequential Pipeline Pattern
 
Data flows linearly — each stage refines the previous
 
plaintext
  
INPUT → 📝 Planner → 🔍 Researcher → 💻 Coder → ✅ Validator → OUTPUT
 
 
- Each stage has clear exit criteria — nothing passes until quality bar met
- Context is condensed between stages — not bloated
- Example: Documentation → Outline → Draft → Review → Publish
 
 
 
3️⃣ Debate / Consensus Pattern
 
Two agents argue → Judge decides
 
plaintext
  
Agent A (Pro) ─┐
               ├──▶ Judge (GPT-4o-mini) ──▶ Final Answer
Agent B (Con) ─┘
 
 
- Best for: fact-checking, technical decisions, complex analysis
- Judge validates reasoning, not just output — higher reliability
 
 
 
📝 Part B: Production-Grade Prompts Library
 
✅ Prompt 1: Self-Healing System Prompt
 
Use as base instruction for every capable agent.
 
plaintext
  
You are an autonomous task agent. Follow these rules ALWAYS:

## 🎯 GOAL
Complete the user's task efficiently and accurately.

## 🔄 SELF-HEALING PROTOCOL
1. If a tool call or action fails:
   - STOP what you're doing
   - Diagnose: "The error is [X]. Likely cause: [Y]"
   - Try a DIFFERENT approach — do NOT repeat exactly what failed
   - Maximum 3 attempts per step

2. After ANY critical step (web fetch, file write, calculation):
   - VERIFY the result independently
   - If verification fails → retry with a different method

3. If stuck after 3 tries → summarize what you tried and ask for guidance

## ⚡ EFFICIENCY RULES
- Be concise — 150 words or less per response
- If you have enough information → finish and report immediately
- Don't ask clarifying questions unless truly necessary
 
 
 
 
✅ Prompt 2: Progress Summarizer (Mid-Task Compression)
 
Inject automatically every 5–8 turns.
 
plaintext
  
In 100 words or fewer:
1. What has been completed successfully
2. What remains to be done
3. Any blockers or issues encountered
4. Current status: On track / At risk / Blocked
 
 
 
 
✅ Prompt 3: Judge / Verifier Prompt
 
Run AFTER critical steps — use a smaller, cheaper model.
 
plaintext
  
Your job is to VERIFY, not create or improve.

Check this result against the expected criteria: [paste criteria here]

Answer ONLY with one of these:
✅ PASS — All requirements met
⚠️ PARTIAL — Mostly okay but missing: [list]
❌ FAIL — Incorrect or incomplete: [explain briefly]

Be strict but fair. If uncertain → PARTIAL or FAIL.
 
 
 
 
✅ Prompt 4: Failure Diagnosis
 
Auto-run on any error.
 
plaintext
  
Previous attempt failed. Answer these 3 questions concisely:

1. What exactly went wrong?
2. What is ONE different approach to try instead?
3. What should I watch out for this time?

Then execute the new strategy.
 
 
 
 
📊 Part C: Cost-Monitoring Dashboard & System
 
📈 Key Metrics to Track
 
Metric What It Means Alert Threshold 
Cost per hour/day Total spend trend >2× daily average 
Cost per task How much each job costs >3× historical average 
Token efficiency Output tokens ÷ Input tokens <0.05 = wasteful loop 
Retry rate % of steps retried >15% = systemic issue 
Model distribution % spend per model tier Heavy model >30% → optimize 
Success rate Tasks completed ÷ started <85% → investigate failures 
 
 
 
🐍 Cost Tracker — Python Code
 
Save as:  cost_tracker.py 
 
python
  
from datetime import datetime
from collections import defaultdict

class CostTracker:
    def __init__(self, daily_budget=5.00):
        self.daily_budget = daily_budget
        self.daily_spend = defaultdict(float)
        
        # Pricing in USD per 1,000 tokens (input)
        self.model_rates = {
            "gpt-4o": 0.0050,
            "gpt-4o-mini": 0.00015,
            "gpt-5.6-sol": 0.0010,
            "gpt-6.1-sol": 0.0150,
            "llama-3-70b": 0.0008
        }

    def log_request(self, model: str, input_tokens: int, output_tokens: int) -> float:
        """Log a request and return the calculated cost."""
        rate_in = self.model_rates.get(model, 0.0050)
        rate_out = rate_in * 2  # Output typically more expensive
        
        cost = (input_tokens / 1000 * rate_in) + (output_tokens / 1000 * rate_out)
        
        today = datetime.now().date().isoformat()
        self.daily_spend[today] += cost
        
        # 🚨 Budget alert
        if self.daily_spend[today] > self.daily_budget:
            print(f"⚠️  DAILY BUDGET EXCEEDED: ${self.daily_spend[today]:.2f} / ${self.daily_budget}")
        
        return cost

    def get_daily_summary(self) -> str:
        today = datetime.now().date().isoformat()
        spent = self.daily_spend.get(today, 0.0)
        pct = (spent / self.daily_budget * 100) if self.daily_budget > 0 else 0
        return f"💰 Today: ${spent:.2f} / ${self.daily_budget:.2f} ({pct:.0f}%)"


# ── Example Usage ──
if __name__ == "__main__":
    tracker = CostTracker(daily_budget=10.00)
    
    # Log some requests
    tracker.log_request("gpt-4o-mini", 500, 150)
    tracker.log_request("gpt-5.6-sol", 1200, 400)
    
    # Print summary
    print(tracker.get_daily_summary())
 
 
 
 
🚨 Alert Rules — Configure Immediately
 
Rule Action 
Single request > $0.50 ⚠️ Warn before proceeding 
Hourly spend exceeds 2× average 🔒 Pause new jobs — review 
5+ retries in 10 minutes 📧 Alert admin — stuck loop detected 
Daily budget reached at 50% of day ⚡ Auto-demote all tasks to cheaper models 
Token efficiency < 0.03 for 30min 🔄 Reset all agent sessions 
 
 
 
📉 Dashboard Layout Template
 
plaintext
  
╔══════════════════════════════════════════════════════════╗
║  🤖 AGENT OPERATIONS DASHBOARD          Last Updated: Now ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  💰 TODAY'S SPEND: $42.80 / $100 BUDGET                  ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │  Progress: ███████████░░░░ 42%                     │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  📊 BY MODEL TIER          🔄 SUCCESS RATE               ║
║  • Light:   $5.20  12%     • Overall:  92.4%            ║
║  • Standard:$18.60  43%     • Retry %:   7.1%            ║
║  • Heavy:   $19.00  45%     • Failures:  8 today         ║
║                                                          ║
║  ⚡ TOP COST DRIVERS                                      ║
║  1. Market research — $12.40  avg 2.1k tokens            ║
║  2. Code generation —   $10.80  avg 4.5k tokens          ║
║  3. Long summaries —     $8.30   avg 8.2k tokens         ║
║                                                          ║
║  🚨 ACTIVE ALERTS                                         ║
║  • Heavy model usage up 18% from yesterday               ║
║  • 3 jobs exceeded token budget today                     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
 
 
 
 
✅ Quick Implementation Checklist
 
Set daily budget cap — start conservative
Route 60% of traffic to cheaper models first
Implement 3-retry max on all agent loops
Add Judge verification after every critical action
Build failure vector store — start small, grow over time
Log every request — model, tokens, cost, success/failure
Set 3 alerts: daily budget, retry %, token efficiency
 
 
 
📌 How to use this file: Copy everything above into a file named  agent-production-guide.md  on your computer — it works offline in Obsidian, VS Code, or any text editor. The Python code can be saved separately as  cost_tracker.py  and run directly.
 
Would you like a CrewAI/LangGraph implementation guide next, or anything else expanded? 😊