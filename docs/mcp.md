# MCP

MCP (Model Context Protocol) allows Claude Code to connect to external
tools, services, and data sources.

## Purpose

Use MCP when Claude needs access to something outside the local codebase.

Examples:

- Browser tools
- Databases
- GitHub
- Design tools
- APIs
- External services

## MCP vs Skills

```text
Skill
→ Teaches Claude how to perform a specialized task

MCP
→ Gives Claude access to external tools or data
```

They can work together.

Example:

```text
Skill
→ Frontend design expertise

MCP
→ Access to a browser or design tool
```

## When to Use MCP

Use MCP when external access provides meaningful value.

Don't add an MCP server just because it exists.

Consider:

1. What does it give Claude access to?
2. Is that access actually needed?
3. Is the source trusted?
4. What permissions does it require?
5. Does it introduce unnecessary complexity?

## Security

Be careful with MCP servers that can:

- Modify files
- Access private data
- Send messages
- Make external requests
- Execute actions

Only connect trusted MCP servers and understand their permissions.

## Principle

```text
Need external capability
→ Find trusted MCP
→ Review permissions
→ Connect
→ Test
```

Keep MCP focused on capabilities that the project actually needs.