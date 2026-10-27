เปรียบเทียบ LangGraph กับ CrewAI และ AutoGen

# เปรียบเทียบ LangGraph กับ CrewAI และ AutoGen

**สรุปสั้น:** เลือก **LangGraph** เมื่อต้องการควบคุม flow, state, checkpoint และ production-grade control; เลือก **CrewAI** เมื่อต้องการ role-based workflow ที่เริ่มเร็ว; เลือก **AutoGen** เมื่อต้องการ conversational multi-agent แบบ message-driven [4533][4538][4534]

## ภาพรวม

| ประเด็น | LangGraph | CrewAI | AutoGen / AG2 |
|---|---|---|---|
| **Mental model** [4538][4533] | Directed graph [4538][4533] | Role-based crew [4538][4533] | Group conversation [4538][4533] |
| **Control flow** [4538][4536] | Explicit [4538][4536] | Abstracted [4538][4536] | Emergent [4538][4536] |
| **State** [4537][4538] | Typed + checkpoint [4537][4538] | Memory stores [4538][4537] | Manual [4538][4537] |
| **Learning curve** [4538][4533] | ชัน [4538][4533] | ต่ำ [4538][4533] | กลาง [4538][4533] |
| **Prototyping** [4538][4533] | ช้า [4538][4533] | เร็ว [4538][4533] | กลาง [4538][4533] |
| **Production** [4538][4536] | แข็งแรง [4538][4536] | กลาง [4538][4536] | อ่อน [4538][4536] |

ใช้ตารางนี้เพื่อเลือก [4538][4533][4536]

## LangGraph

```python
from langgraph.graph import StateGraph

graph = StateGraph(State)
graph.add_node("planner", planner)
graph.add_node("executor", executor)
graph.add_edge("planner", "executor")
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **StateGraph** [4533][4534] | Typed state [4533][4534] |
| **Node / Edge** [4535][4537] | Flow [4535][4537] |
| **Checkpoint** [4533][4534] | Resume [4533][4534] |
| **Human-in-the-loop** [4533][4534] | Pause / approve [4533][4534] |
| **Replay** [4533][4534] | Debug [4533][4534] |

ใช้ LangGraph เพื่อ control [4533][4534][4538]

## CrewAI

```python
from crewai import Agent, Task, Crew

researcher = Agent(role="Researcher", goal="Find facts", tools=[search])
writer = Agent(role="Writer", goal="Write report")

crew = Crew(agents=[researcher, writer], tasks=[...])
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Role** [4533][4525] | นิยาม agent [4533][4525] |
| **Goal** [4533][4525] | วัตถุประสงค์ [4533][4525] |
| **Task** [4533][4525] | งาน [4533][4525] |
| **Crew** [4533][4525] | กลุ่ม [4533][4525] |
| **Flow** [4533][4536] | Event-driven [4533][4536] |

ใช้ CrewAI เพื่อ speed [4533][4525][4538]

## AutoGen

```python
from autogen import ConversableAgent

assistant = ConversableAgent("assistant", llm_config=...)
user = ConversableAgent("user", human_input_mode="ALWAYS")
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **ConversableAgent** [4533][4536] | Agent คุยกัน [4533][4536] |
| **Message passing** [4533][4536] | Coordination [4533][4536] |
| **Group chat** [4533][4536] | Multi-agent [4533][4536] |
| **Human input** [4533][4536] | HITL [4533][4536] |

ใช้ AutoGen เพื่อ conversation [4533][4536][4538]

## State & Persistence

| Framework | State | Persistence |
|---|---|---|
| **LangGraph** [4533][4537] | Typed state [4533][4537] | Native checkpoint [4533][4537] |
| **CrewAI** [4538][4537] | Memory stores [4538][4537] | Opt-in [4538][4537] |
| **AutoGen** [4538][4537] | Conversation history [4538][4537] | Manual [4538][4537] |

ใช้ state เพื่อ continuity [4537][4538][4533]

## เลือกอย่างไร

| สถานการณ์ | แนะนำ |
|---|---|
| Production / compliance [4538][4536] | LangGraph [4538][4536] |
| Long-running / resumable [4533][4534] | LangGraph [4533][4534] |
| Human-in-the-loop [4533][4534] | LangGraph [4533][4534] |
| Role-based prototype [4538][4533] | CrewAI [4538][4533] |
| Conversational agents [4533][4536] | AutoGen [4533][4536] |
| Research / experiment [4533][4536] | AutoGen / CrewAI [4533][4536] |

ใช้ตารางนี้เพื่อ decision [4538][4533][4536]

## Best Practices

- [ ] เริ่มจาก use case [4538][4533][4536]
- [ ] เลือกตาม control ที่ต้องการ [4538][4536][4533]
- [ ] เลือกตาม state ที่ต้องการ [4537][4538][4533]
- [ ] เลือกตาม production requirement [4538][4536][4533]
- [ ] ใช้ LangGraph เมื่อต้อง audit [4533][4534][4536]
- [ ] ใช้ CrewAI เมื่อต้องเร็ว [4538][4533][4525]
- [ ] ใช้ AutoGen เมื่อต้อง conversation [4533][4536][4538]
- [ ] ทบทวน framework เป็นรอบ [4538][4533][4536]

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| เลือกตาม hype [4538][4533] | ไม่เหมาะงาน [4538][4533] | ดู use case [4538][4533] |
| ใช้ CrewAI สำหรับ production ที่ต้อง audit [4538][4536] | ควบคุมยาก [4538][4536] | ใช้ LangGraph [4538][4536] |
| ใช้ AutoGen สำหรับ long-running [4538][4537] | Persistence ยาก [4538][4537] | ใช้ LangGraph [4538][4537] |
| ใช้ LangGraph สำหรับ prototype เร็ว [4538][4533] | ช้า [4538][4533] | ใช้ CrewAI [4538][4533] |
| ไม่ทบทวน | Stale [4538][4533] | Review [4538][4533] |

## Checklist

- [ ] รู้ use case
- [ ] รู้ control ที่ต้องการ
- [ ] รู้ state ที่ต้องการ
- [ ] รู้ production requirement
- [ ] เลือก framework
- [ ] ทบทวน stack

## Related Notes

- [[MOC - AI Engineering]]
- [[Multi-Agent Orchestration]]
- [[LLM Agents]]
- [[Tool Calling]]
- [[MOC - Platform Engineering]]
- [[MOC - Obsidian]]

การอ้างอิง:
[1] Best AI agent frameworks (2026) - Dataiku https://www.dataiku.com/blog/ai-agent-frameworks
[2] How to Choose AI Agent Frameworks in 2026? - Vercel https://vercel.com/i/ai-agent-frameworks
[3] LangGraph vs CrewAI vs AutoGen: Best AI Agent Framework 2026 https://www.spheron.network/blog/langgraph-vs-crewai-vs-autogen-2026/
[4] kurtmb/agent-orchestration-benchmark · GitHub https://github.com/kurtmb/agent-orchestration-benchmark/blob/main/docs/white_paper/Agent_Orchestration_Benchmark_White_Paper.md
[5] best-of-Agent-Harnesses/comparisons/multi-agent-orchestration ...... https://github.com/RyanAlberts/best-of-Agent-Harnesses/blob/main/comparisons/multi-agent-orchestration.md
[6] LangGraph vs CrewAI vs AutoGen: Architecture https://www.heu.ai/articles/langgraph-vs-crewai-vs-autogen
[7] LangGraph vs CrewAI vs AutoGen 2026: Full comparison https://www.n-ix.com/langgraph-vs-crewai-vs-autogen/
[8] LangGraph vs CrewAI vs AutoGen: 2026 Comparison | MarsDevs https://www.marsdevs.com/compare/langgraph-vs-crewai-vs-autogen
[9] 17 Best Agentic AI Frameworks in 2026 | Uvik Software https://uvik.net/blog/agentic-ai-frameworks/
[10] Build Vs Buy: The Honest... https://www.open.cx/blog/ai-agent-frameworks-langgraph-crewai-autogen-2026
[11] LangGraph vs CrewAI vs Claude Agent SDK: 2026 Guide https://appinventiv.com/blog/langgraph-vs-crewai/

แปลงเนื้อหานี้เป็น Obsidian Markdown note พร้อม YAML Frontmatter ให้หน่อย

```markdown
---
title: "เปรียบเทียบ LangGraph กับ CrewAI และ AutoGen"
aliases:
  - "LangGraph vs CrewAI vs AutoGen"
  - "Agent Framework Comparison"
tags:
  - ai-engineering
  - multi-agent
  - langgraph
  - crewai
  - autogen
created: 2026-10-27
status: evergreen
type: reference
---

# เปรียบเทียบ LangGraph กับ CrewAI และ AutoGen

**สรุปสั้น:** เลือก **LangGraph** เมื่อต้องการควบคุม flow, state, checkpoint และ production-grade control; เลือก **CrewAI** เมื่อต้องการ role-based workflow ที่เริ่มเร็ว; เลือก **AutoGen** เมื่อต้องการ conversational multi-agent แบบ message-driven.

## ภาพรวม

| ประเด็น | LangGraph | CrewAI | AutoGen / AG2 |
|---|---|---|---|
| **Mental model** | Directed graph | Role-based crew | Group conversation |
| **Control flow** | Explicit | Abstracted | Emergent |
| **State** | Typed + checkpoint | Memory stores | Manual |
| **Learning curve** | ชัน | ต่ำ | กลาง |
| **Prototyping** | ช้า | เร็ว | กลาง |
| **Production** | แข็งแรง | กลาง | อ่อน |

## LangGraph

```python
from langgraph.graph import StateGraph

graph = StateGraph(State)
graph.add_node("planner", planner)
graph.add_node("executor", executor)
graph.add_edge("planner", "executor")
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **StateGraph** | Typed state |
| **Node / Edge** | Flow |
| **Checkpoint** | Resume |
| **Human-in-the-loop** | Pause / approve |
| **Replay** | Debug |

ใช้ LangGraph เพื่อ control

## CrewAI

```python
from crewai import Agent, Task, Crew

researcher = Agent(role="Researcher", goal="Find facts", tools=[search])
writer = Agent(role="Writer", goal="Write report")

crew = Crew(agents=[researcher, writer], tasks=[...])
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Role** | นิยาม agent |
| **Goal** | วัตถุประสงค์ |
| **Task** | งาน |
| **Crew** | กลุ่ม |
| **Flow** | Event-driven |

ใช้ CrewAI เพื่อ speed

## AutoGen

```python
from autogen import ConversableAgent

assistant = ConversableAgent("assistant", llm_config=...)
user = ConversableAgent("user", human_input_mode="ALWAYS")
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **ConversableAgent** | Agent คุยกัน |
| **Message passing** | Coordination |
| **Group chat** | Multi-agent |
| **Human input** | HITL |

ใช้ AutoGen เพื่อ conversation

## State & Persistence

| Framework | State | Persistence |
|---|---|---|
| **LangGraph** | Typed state | Native checkpoint |
| **CrewAI** | Memory stores | Opt-in |
| **AutoGen** | Conversation history | Manual |

ใช้ state เพื่อ continuity

## เลือกอย่างไร

| สถานการณ์ | แนะนำ |
|---|---|
| Production / compliance | LangGraph |
| Long-running / resumable | LangGraph |
| Human-in-the-loop | LangGraph |
| Role-based prototype | CrewAI |
| Conversational agents | AutoGen |
| Research / experiment | AutoGen / CrewAI |

ใช้ตารางนี้เพื่อ decision

## Best Practices

- [ ] เริ่มจาก use case
- [ ] เลือกตาม control ที่ต้องการ
- [ ] เลือกตาม state ที่ต้องการ
- [ ] เลือกตาม production requirement
- [ ] ใช้ LangGraph เมื่อต้อง audit
- [ ] ใช้ CrewAI เมื่อต้องเร็ว
- [ ] ใช้ AutoGen เมื่อต้อง conversation
- [ ] ทบทวน framework เป็นรอบ

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| เลือกตาม hype | ไม่เหมาะงาน | ดู use case |
| ใช้ CrewAI สำหรับ production ที่ต้อง audit | ควบคุมยาก | ใช้ LangGraph |
| ใช้ AutoGen สำหรับ long-running | Persistence ยาก | ใช้ LangGraph |
| ใช้ LangGraph สำหรับ prototype เร็ว | ช้า | ใช้ CrewAI |
| ไม่ทบทวน | Stale | Review |

## Checklist

- [ ] รู้ use case
- [ ] รู้ control ที่ต้องการ
- [ ] รู้ state ที่ต้องการ
- [ ] รู้ production requirement
- [ ] เลือก framework
- [ ] ทบทวน stack

## Related Notes

- [[MOC - AI Engineering]]
- [[Multi-Agent Orchestration]]
- [[LLM Agents]]
- [[Tool Calling]]
- [[MOC - Platform Engineering]]
- [[MOC - Obsidian]]
```


