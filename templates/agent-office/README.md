# Agent Office (Pixel Agents)

Isang pixel-art na opisina sa browser kung saan ang bawat Claude Code agent mo ay isang maliit na karakter. Makikita mo kung sino ang nagtatrabaho, naghihintay, o tapos na. Kasama ang subagents bilang hiwalay na karakter.

> Third-party tool ito (package: `pixel-agents`), hindi galing sa Anthropic. Display lang ito. **Hindi nito binabawasan ang gastos sa quota ng Pro plan mo.**

---

## Ano ang laman ng folder na ito

| File | Gamit |
|---|---|
| `README.md` | Ang gabay na ito |
| `start-pixel-agents.bat` | Double-click para patakbuhin ang office (Windows) |

---

## Kung ibang PC ang gamit mo

Walang kasamang package sa folder na ito. Ang `npx` ang kumukuha nito sa internet sa unang takbo, kaya kailangan lang ng tamang tools sa bagong PC.

**Checklist bago gamitin:**

| Kailangan | Paano i-check | Kung wala |
|---|---|---|
| Node.js (kasama ang `npx`) | `node -v` at `npx -v` | I-install ang **Node.js LTS** mula sa nodejs.org, isara at buksan ulit ang terminal |
| Claude Code | `claude --version` | I-install ang Claude Code at mag-login |
| Internet (unang takbo lang) | | Kailangan para ma-download ang `pixel-agents` |

**Paano dalhin sa ibang PC:**
- Kung nasa GitHub ang repo: `git clone` ito, tapos buksan ang `templates/agent-office/`.
- O kopyahin lang ang dalawang file (`README.md` at `start-pixel-agents.bat`) sa kahit anong folder.

**Mga error at ayos:**

| Error | Ayos |
|---|---|
| `'npx' is not recognized` | Wala o hindi pa nare-recognize ang Node.js. I-install ito, tapos isara at buksan ulit ang terminal. |
| Hindi gumagana ang `.bat` | Subukan mula sa terminal: `npx pixel-agents` |
| Naka-block ang download (company o school PC) | Maaaring hinaharang ng network ang npm. Subukan sa ibang network. |

---

## Setup (isang beses lang)

1. Siguraduhing may Node.js ka:
   ```cmd
   node -v
   ```
2. Kopyahin ang `start-pixel-agents.bat` sa **project folder** na gusto mong bantayan (o patakbuhin ito mula rito at gamitin ang parehong folder sa Claude Code).
3. I-double-click ang `start-pixel-agents.bat`.
4. Sa unang takbo, lalabas ang `Ok to proceed? (y)`. I-type ang `y` at Enter. Dina-download nito ang package sa **npm cache**, hindi sa `node_modules` ng project mo.
5. Buksan sa browser ang link na lalabas (`http://127.0.0.1:<port>/?token=...`).

> Huwag i-share ang link na may `token`. Local lang ito sa computer mo.

---

## Araw-araw na gamit

1. Patakbuhin ang `start-pixel-agents.bat`. **Huwag isara ang bintanang iyon**, ito ang server.
2. Sa **hiwalay na terminal**, sa parehong project folder, patakbuhin ang:
   ```cmd
   claude
   ```
   Hindi sinisimulan ng Pixel Agents ang Claude para sa iyo.
3. Dapat lumabas ang karakter sa opisina. Kapag gumamit si Claude ng subagents, magkakaroon ng dagdag na karakter.

---

## Mga natutunan (troubleshooting)

| Problema | Paliwanag at ayos |
|---|---|
| Walang karakter sa opisina, pero lumalabas ang session sa kaliwang listahan | Nababasa ng app ang transcript ng Claude Code. Subukan: i-click ang session, pindutin ang `+`, o magpadala ng bagong mensahe para magkaroon ng aktibidad. |
| Ang session ko ay nasa chat panel ng VS Code, hindi sa terminal | Maaaring hindi ito mahuli bilang karakter. Magbukas ng terminal sa VS Code at patakbuhin ang `claude`. |
| Tahimik ang agent habang nagre-render | Normal. Ang `ffmpeg` o ibang background process ang gumagana, hindi ang agent. |
| May "Watch All Sessions" sa Settings | I-on ito para isama ang mga session mula sa ibang workspace (kung available sa bersyon mo). |
| Takot na may na-install sa project | Wala. Hindi ito napupunta sa `node_modules`, `package.json`, o `package-lock.json`. |

---

## Mga dapat tandaan

- **Quota:** ang bawat agent at subagent ay gumagastos pa rin ng tokens sa iisang Pro pool (5-hour at weekly limit). Ang office ay pang-tingin lang.
- **Memory:** kung malaki ang ginagawa mo (halimbawa video render), iwasan ang sobrang daming bukas na app.
- **Windows:** gumagana ito. Hindi kailangan ng cmux, na Mac lang.

---

## Paano tanggalin

- Burahin ang `start-pixel-agents.bat` sa project mo.
- Opsyonal: `npm cache clean --force` para burahin ang naka-cache na package (tatanggalin nito ang lahat ng naka-cache na package, hindi lang ito).

---

## Mga source

- Pixel Agents: https://github.com/pablodelucca/pixel-agents
- npm: https://www.npmjs.com/package/pixel-agents
