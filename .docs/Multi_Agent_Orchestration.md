Multi_Agent_Orchestration

# Multi-Agent Orchestration

**Multi-Agent Orchestration** คือการออกแบบให้ LLM agents หลายตัวทำงานร่วมกันอย่างมีโครงสร้าง ผ่าน **planner, executor, supervisor, memory, tools และ observability** — เป้าหมายคือ reliability, auditability และ scalability ไม่ใช่แค่ “หลาย agent คุยกัน” [4519][4520][4527]

## Core Architecture

```text
User → Orchestrator → Planner → Executors → Synthesizer → User
```

| Component | ใช้ทำอะไร |
|---|---|
| **Orchestrator** [4520][4527] | ควบคุม flow [4520][4527] |
| **Planner** [4519][4520] | แตกงาน [4519][4520] |
| **Executor** [4519][4520] | ทำงาน + เรียก tool [4519][4520] |
| **Synthesizer** [4519][4520] | รวมผล [4519][4520] |
| **Memory** [4520][4527] | State / context [4520][4527] |
| **Tools** [4527][4524] | Action [4527][4524] |

ใช้ 6 component นี้เป็นฐาน [4519][4520][4527]

## Orchestration Patterns

| Pattern | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| **Planner–Executor** [4519][4520] | งานซับซ้อน ต้องแตก step [4519][4520] | Plan → execute → synthesize [4519][4520] |
| **Supervisor** [4520][4527] | หลาย specialist [4520][4527] | Router → worker [4520][4527] |
| **Pipeline** [4527][4524] | งาน deterministic [4527][4524] | Step 1 → 2 → 3 [4527][4524] |
| **Maker–Checker** [4527] | ต้องลด hallucination [4527] | Actor → verifier [4527] |
| **Swarm / Network** [4524][4527] | งาน open-ended [4524][4527] | Peer handoff [4524][4527] |
| **Parallel Fan-out** [4524][4527] | งานแยกได้ [4524][4527] | Fan-out → merge [4524][4527] |

ใช้ pattern ตามลักษณะงาน [4519][4520][4527]

## Planner–Executor

```text
Goal → Plan → Execute step → Synthesize
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Decompose** [4519][4520] | แตกงาน [4519][4520] |
| **Execute** [4519][4520] | ทำ step [4519][4520] |
| **Synthesize** [4519][4520] | รวมผล [4519][4520] |
| **Audit** [4519][4520] | ตรวจย้อนได้ [4519][4520] |

ใช้ pattern นี้เพื่อ reliability [4519][4520][4527]

## Supervisor

```text
Request → Supervisor → Specialist → Response
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Classify** [4520][4527] | รู้ว่าใครรับ [4520][4527] |
| **Route** [4520][4527] | ส่งงาน [4520][4527] |
| **Monitor** [4520][4527] | ตรวจผล [4520][4527] |
| **Escalate** [4520][4527] | ส่งต่อ [4520][4527] |

ใช้ supervisor เพื่อ specialization [4520][4527][4524]

## State & Memory

```yaml
state:
  conversation: []
  plan: []
  results: {}
  artifacts: {}
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Shared state** [4520][4527] | ประสานงาน [4520][4527] |
| **Checkpoint** [4522][4529] | Resume ได้ [4522][4529] |
| **Short-term** [4520][4527] | Context [4520][4527] |
| **Long-term** [4520][4527] | Knowledge [4520][4527] |

ใช้ state เพื่อ continuity [4520][4527][4522]

## Tool Calling

```python
@tool
def search_docs(query: str) -> str:
    """Search internal docs."""
    ...
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Typed args** [4527][4524] | กัน invalid [4527][4524] |
| **Validate** [4527][4524] | ก่อนเรียก [4527][4524] |
| **Structured error** [4527][4524] | ไม่ throw raw [4527][4524] |
| **Least privilege** [4527][4524] | จำกัด scope [4527][4524] |

ใช้ tool เพื่อ action [4527][4524][4520]

## Observability

```text
Trace → Span → Agent → Tool → LLM
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Trace** [4527][4524] | End-to-end [4527][4524] |
| **Span** [4527][4524] | ต่อ step [4527][4524] |
| **Metrics** [4527][4524] | Latency / cost / success [4527][4524] |
| **Eval** [4527][4524] | Quality [4527][4524] |

ใช้ observability เพื่อ debug [4527][4524][4520]

## Frameworks

| Framework | จุดแข็ง | เหมาะกับ |
|---|---|---|
| **LangGraph** [4520][4529] | Graph + checkpoint [4520][4529] | Production [4520][4529] |
| **CrewAI** [4520][4525] | Role-based [4520][4525] | Prototype [4520][4525] |
| **AutoGen / AG2** [4523][4529] | Conversation [4523][4529] | Multi-agent chat [4523][4529] |
| **OpenAI Agents SDK** [4527][4524] | Handoff [4527][4524] | Supervisor [4527][4524] |

ใช้ framework ตามความต้องการ [4520][4529][4527]

## Best Practices

- [ ] แยก planning กับ execution [4519][4520][4527]
- [ ] เริ่มจาก 2–3 agents [4528][4520][4527]
- [ ] ให้ parent ตอบ user [4521][4520][4527]
- [ ] ใช้ typed tools [4527][4524][4520]
- [ ] ใช้ structured errors [4527][4524][4520]
- [ ] ใช้ checkpoint [4522][4529][4520]
- [ ] ใช้ tracing [4527][4524][4520]
- [ ] ใช้ eval [4527][4524][4520]
- [ ] ทบทวน architecture เป็นรอบ [4520][4529][4527]

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| Agent คุยกันเอง [4520][4527] | ควบคุมยาก [4520][4527] | ใช้ supervisor / graph [4520][4527] |
| ไม่มี planner [4519][4520] | งานใหญ่พัง [4519][4520] | เพิ่ม planner [4519][4520] |
| ไม่มี state [4520][4527] | หลง context [4520][4527] | เพิ่ม memory [4520][4527] |
| Tool ไม่ typed [4527][4524] | Error บ่อย [4527][4524] | ใช้ schema [4527][4524] |
| ไม่มี tracing [4527][4524] | Debug ยาก [4527][4524] | เพิ่ม observability [4527][4524] |

## Checklist

- [ ] มี orchestrator
- [ ] มี planner
- [ ] มี executor
- [ ] มี synthesizer
- [ ] มี state
- [ ] มี tools
- [ ] มี tracing
- [ ] มี eval
- [ ] ทบทวน architecture

## Related Notes

- [[MOC - AI Engineering]]
- [[LLM Agents]]
- [[RAG Architecture]]
- [[Tool Calling]]
- [[MOC - Platform Engineering]]
- [[MOC - Obsidian]]

การอ้างอิง:
[1] builder.aws.com · content · 3AtvWf5Z0DfZLINb0E4iVFHWzeGBuilding multi-agent applications: orchestration patterns | AWS... https://builder.aws.com/content/3AtvWf5Z0DfZLINb0E4iVFHWzeG/building-multi-agent-applications-orchestration-patterns
[2] Choosing Between Ai Agent... https://domino.ai/blog/multi-agent-orchestration-patterns
[3] Multi-agent orchestration patterns and best practices https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns
[4] The missing layer: data quality... https://atlan.com/know/best-ai-agent-harness-tools-2026/
[5] LangGraph vs. AutoGen vs. CrewAI: An Agent Framework Comparison https://www.jetbrains.com/pages/ai-agents/building/agent-framework-comparison/
[6] AI agent frameworks compared: LangGraph, CrewAI, AutoGen, and ... https://arize.com/ai-agents/agent-frameworks/
[7] The best AI agent frameworks in 2026 - langchain.com https://www.langchain.com/resources/ai-agent-frameworks
[8] Best AI Agent Frameworks [2026]: LangGraph, CrewAI, AutoGen https://scrimba.com/articles/best-ai-agent-frameworks/
[9] Multi-Agent AI Systems 2026: Patterns and Production https://futureagi.com/blog/multi-agent-systems-2025/
[10] Multi-Agent Orchestration 2026: LangGraph, CrewAI, and ... https://dev.to/saaro_net/multi-agent-orchestration-2026-langgraph-crewai-and-autogen-compared-34bd
[11] 02-orchestration-frameworks-today.md https://github.com/iarechaga/oh-my-learning/blob/main/agentic-engineering/landscape-snapshot/lessons/02-orchestration-frameworks-today.md
[12] LLM-Based Multi-Agent Orchestration: A Survey of Frameworks ... https://www.mdpi.com/1999-5903/18/6/326
[13] best-of-agent-harnesses/comparisons/multi-agent-orchestration.md at main · dhanizael/best-of-agent-harnesses https://github.com/dhanizael/best-of-agent-harnesses/blob/main/comparisons/multi-agent-orchestration.md
