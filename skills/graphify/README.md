# Graphify

Ginagawang **knowledge graph** ng Graphify ang project folder mo (code, docs, configs). Ang graph ay parang **mapa**: makikita kung aling file, function o doc ang konektado sa alin. Sa halip na basahin ni Claude ang bawat file, mapa ang babasahin niya.

Official repo: https://github.com/Graphify-Labs/graphify

> Tested sa **Mkeni Spec** practice app (Windows, PowerShell, Claude Code sa editor). Resulta: 194 nodes, 277 edges, 11 communities mula sa 42 files.

---

## Kailan ito gagamitin?

| Project | Gamitin ba? |
|---|---|
| Malaki o matandang codebase, maraming files | **Oo.** Mapa na ang binabasa ni Claude, hindi lahat ng file. |
| Maraming docs + code (Spec Kit: spec, plan, tasks) | **Oo.** Ikinakabit nito ang tasks sa mga function na gumagawa nito. |
| Maliit na app (ilang files lang) | Optional. Okay pang-aral, pero maliit lang ang matitipid. |
| Itsura lang ang babaguhin (CSS, colors, fonts) | Laktawan. Pang-**basa** ng code ang graph, hindi pang-sulat. |

**Tungkol sa tokens:** makakabawas ito sa tokens na ginagastos ni Claude sa **paghahanap at pagbabasa** sa malaking project. Hindi nito pinapamura ang **pagsusulat** ng code. May gastos din ang paggawa ng graph (ang mga markdown docs ay binabasa ng subagent), kaya sa maliit na app, huwag umasa ng malaking tipid.

---

# PART 1: Isang beses lang bawat computer

### 1. I-check ang Python (3.10 pataas)

```powershell
python --version
```

### 2. I-install ang Graphify

```powershell
pip install graphifyy
```

> ⚠️ **Dalawang "y"** ang pangalan sa PyPI: `graphifyy`. Pero ang command na tatakbuhin mo ay `graphify` pa rin (isang "y").

### 3. Ayusin ang PATH (Windows)

**"'graphify' is not recognized"?** Normal ito sa Windows. Inilagay ng pip ang `graphify` sa folder na wala sa PATH ng computer mo, kaya hindi ito makita ng terminal.

Tingnan ang warning na lumabas pagkatapos ng `pip install`. Nagtatapos ito sa `\Python312\Scripts`. Iyon ang folder na gagamitin mo.

Pang-**isang terminal lang** (mawawala kapag isinara mo):

```powershell
$env:Path += ";<ang Scripts folder mula sa warning>"
```

**Permanente** (tatakbuhin nang isang beses, tapos isara at buksan ulit ang terminal):

```powershell
$p = "<ang Scripts folder mula sa warning>"
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";" + $p, "User")
```

I-check kung gumagana na:

```powershell
graphify --version
```

### 4. I-register ang skill sa Claude Code

```powershell
graphify install
```

Pagkatapos, buksan ang Claude Code at i-type ang `/`. Dapat lumabas ang `/graphify`.

> 💡 Gusto mo bang nasa loob lang ng isang project ang skill (para ma-commit)? Gamitin ang `graphify install --project` mula sa project root.

> 💡 Kapag may tinanong na "which agents do you want to install to?", piliin ang **Claude Code** lang.

---

# PART 2: Isang beses lang bawat project

### 1. Pumunta sa project root at gumawa ng branch

```powershell
cd C:\dev\my-app
git switch -c graphify
```

**Bakit branch?** Safety net. Kapag may nasira, babalik ka lang sa `main`.

### 2. Kopyahin ang ignore file

Kopyahin ang `skills/graphify/.graphifyignore.template` papunta sa project root, at palitan ang pangalan ng **`.graphifyignore`**.

**Bakit kailangan?** Kung wala ito, babasahin din ng Graphify ang `node_modules` at ang mga naka-install na skills (sa Mkeni, mga 3,100 skill files). Mabagal iyon, gumagastos ng tokens, at pinupuno ang graph ng ingay.

### 3. Gawin ang graph (sa Claude Code)

```text
/graphify .
```

Gagawa ito ng folder na `graphify-out/`:

| File | Ano ito |
|---|---|
| `graph.html` | Ang interactive na mapa. **Ito ang bubuksan mo.** |
| `GRAPH_REPORT.md` | Written summary: pinaka-konektado, mga grupo, kakaibang koneksyon. |
| `graph.json` | Raw data. Pwede mong balewalain. |

### 4. I-ignore ang output sa git

Idagdag sa `.gitignore`:

```text
# graphify
graphify-out/
```

Tapos i-commit ang ignore files:

```powershell
git add .gitignore .graphifyignore
git commit -m "chore: add graphify ignore rules"
```

**Bakit hindi i-commit ang `graphify-out/`?** Generated file ito. Pwede mo itong gawing muli anumang oras, at nagbabago ito sa bawat pagbabago ng code.

### 5. Gawing automatic ang paggamit ni Claude sa graph

```powershell
graphify claude install
```

Nagdaragdag ito ng hook sa `.claude/settings.json`. Tumatakbo ang hook **bago ang bawat Glob at Grep** ni Claude. Kapag may graph, sasabihan si Claude na basahin muna ang `GRAPH_REPORT.md` bago maghanap sa mga raw files.

> ⚠️ **I-check ang `.claude/settings.json` pagkatapos.** Kung may hooks ka na (halimbawa `protect-secrets`), tiyaking nandoon pa rin. Gamitin ang `git diff` para makita ang binago.

Mas mahigpit na bersyon (obligado si Claude na gamitin ang graph):

```powershell
graphify install --project --strict
```

Magsimula muna sa normal na `graphify claude install`.

---

# PART 3: Araw-araw na paggamit

### Tingnan ang interactive graph

```powershell
start graphify-out\graph.html
```

Bubukas ito sa browser. Pwede mong i-drag, i-zoom, at i-click ang bilog para makita kung ano ang konektado rito. Ang mga kulay ay mga **grupo** (communities). Magsimula sa pinakamalalaking bilog.

### Magtanong tungkol sa istruktura

Itanong kay Claude sa normal na chat:

```text
Using the graph, which functions do tasks T004 to T008 map to?
```

```text
What breaks if I change findDate()?
```

```text
Which spec and plan decisions led to app/notes.ts?
```

Kung putol ang sagot, humingi ng mas malaking budget (halimbawa `--budget 2638`).

### Panatilihing bago ang graph

**Snapshot** lang ang graph. Pagkatapos ng malalaking pagbabago sa code, tumakbo ulit:

```text
/graphify .
```

Naaalala nito ang mga file na hindi nagbago, kaya mabilis ang re-run.

### Ilagay sa prompt (manual na paraan)

```text
Check graphify-out/GRAPH_REPORT.md first, then answer.
```

---

# Paano basahin ang report

- **Pinaka-konektadong nodes** ay madalas boring. Sa Mkeni, ang numero uno ay `compilerOptions` (`tsconfig.json` lang pala). Hanapin ang totoong functions at docs.
- **Surprising connections** ang pinakamagandang parte. Sa Mkeni, ang `tasks.md` T004, T007 at T008 ay direktang konektado sa `parseNotes()`, `findDate()` at `addNote()` sa `app/notes.ts`.
- **Maaaring 0 ang cost number** sa report. Hindi nare-record ang tokens ng subagent. Huwag mo itong paniwalaan.
- Ang mga link mula sa markdown docs ay gawa ng **AI subagent**, hindi ng parser. Mag-spot-check ng ilan sa `graph.html` bago magtiwala.

---

# Mga limitasyon

- **Hindi suportado:** PowerShell scripts (lalabas lang silang file nodes na walang laman) at ang stock SVGs sa `public/`.
- Hindi nakakatulong sa **pagsusulat** ng code. Pang-basa at pang-hanap lang.
- **Luma na ang graph** kapag nagbago ang code. Tumakbo ulit ng `/graphify .`.

---

# Troubleshooting

| Problema | Ayos |
|---|---|
| `graphify` not recognized | Ayusin ang PATH (Part 1, step 3). Isara at buksan ulit ang terminal. |
| Walang `/graphify` sa Claude Code | Patakbuhin ang `graphify install`, tapos i-restart ang Claude Code. |
| Sobrang laki o bagal ng graph | I-check kung may `.graphifyignore` sa project root. |
| Lumang code ang lumalabas | Tumakbo ulit ng `/graphify .`. |
| Nagtanong kung anong agent | Piliin ang **Claude Code**. |
| Nawala ang hooks pagkatapos ng `graphify claude install` | Buksan ang `.claude/settings.json` at `git diff`. Ibalik ang mga hooks mo. |

---

# Quick reference

| Gagawin | Command |
|---|---|
| Install | `pip install graphifyy` |
| I-register ang skill | `graphify install` |
| Skill sa isang project lang | `graphify install --project` |
| Gumawa / mag-refresh ng graph | `/graphify .` |
| Automatic na gamitin ang graph | `graphify claude install` |
| Buksan ang graph | `start graphify-out\graph.html` |
| I-ignore ang output | idagdag ang `graphify-out/` sa `.gitignore` |
