# Agents

Agents are specialized Claude workflows designed to handle a specific
type of task or responsibility.

## Purpose

Use agents when a task is complex enough to benefit from separating
responsibilities.

Examples:

- Code review
- Research
- Testing
- Debugging
- Security review
- Documentation

## Agent vs Skill

```text
Skill
→ Provides specialized knowledge or instructions

Agent
→ Performs a specialized workflow or role
```

They can work together.

Example:

```text
Frontend Design Skill
→ Provides design expertise

Frontend Review Agent
→ Reviews the implementation using that expertise
```

## When to Use Agents

Use an agent when:

- The task has multiple distinct steps.
- A specialized role improves the result.
- The work can be isolated from the main workflow.
- Parallel work provides a real benefit.

Don't create an agent for every small task.

## Simple Workflow

```text
Main Task
   ↓
Identify specialized work
   ↓
Assign an appropriate agent
   ↓
Agent completes its responsibility
   ↓
Review result
   ↓
Continue main workflow
```

## Principle

Agents should reduce complexity, not create more of it.

Start with simple workflows and introduce specialized agents only
when they provide a clear advantage.