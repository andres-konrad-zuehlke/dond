# Deal or No Deal – Hochzeitsgeschenk Nathalie

## Overview
A static, single-page web game inspired by the TV show "Deal or No Deal", customised
as a wedding gift experience for Nathalie.  No server, no build step – open `index.html`
in any modern browser.

---

## File structure
| File | Purpose |
|------|---------|
| `index.html` | Page shell: three-column layout + timeline |
| `style.css`  | TV-show aesthetics: dark background, gold buttons, Anton font |
| `script.js`  | Game logic: gift data, open/disable, offer algorithm |
| `instructions.md` | This file – reference for future prompting |

---

## How to play
1. **Open a gift** – click any gold button on the left or right side of the screen.  
   The button is disabled and dims after clicking (opening the gift).
2. **Check the timeline** – the numbered circles at the bottom fill in gold as each
   gift is opened (1 → 23).
3. **Reveal an offer** – click **"Angebot aufdecken"** in the centre at any time to
   ask the banker for an offer.  
   - The offer label changes from _Noch kein Angebot_ → **Neues Angebot:** + gift title.  
   - After the next gift button is pressed, it switches to **Letztes Angebot:** (same
     offer title).  
   - Clicking "Angebot aufdecken" again shows a fresh **Neues Angebot**.
4. There is no explicit win/lose condition – the game ends when all 23 gifts are opened
   or the player decides to "take the deal".

---

## Gift list (23 gifts, ordered by value ascending)
Prices are **never displayed**; they are used only internally for the offer algorithm
and to determine the left/right ordering of the buttons.

| # | Title | Value (CHF) |
|---|-------|-------------|
| 1  | Postkarte mit persönlichem Glückwunsch          | 10   |
| 2  | Schokoladenbox Lindt Premium                    | 15   |
| 3  | Überraschungspaket                              | 20   |
| 4  | Neues Buch                                      | 30   |
| 5  | Kinogutscheine für 2                            | 40   |
| 6  | Buchclub-Mitgliedschaft Jahresabo               | 60   |
| 7  | Schönheitsbehandlung Körperpflege               | 75   |
| 8  | Yoga-Kurs                                       | 85   |
| 9  | Netflix-Jahresabo                               | 90   |
| 10 | Alle Bände Tim & Struppi                        | 100  |
| 11 | Sportausrüstung nach Wahl                       | 120  |
| 12 | Kochkurs Migros Klubschule – Thema Sushi        | 140  |
| 13 | Wellness-Tag mit Nadescha                       | 150  |
| 14 | Abendessen im Sternerestaurant                  | 180  |
| 15 | Ninja Cooker                                    | 200  |
| 16 | Konzerttickets nach Wahl                        | 250  |
| 17 | Neues Magic Commander-Deck                      | 300  |
| 18 | Neues iPad                                      | 400  |
| 19 | 1 Tag Europapark Rust mit Kolleginnen inkl. Eintritt | 500 |
| 20 | SPA Wochenende im Tessin                        | 700  |
| 21 | Städtereise nach Wien                           | 900  |
| 22 | Städtereise nach Amsterdam                      | 1200 |
| 23 | Wochenendausflug mit Nadescha inkl. Hotel und Flug | 1500 |

**Left panel** (displayed): gifts 1–11 (lower-value half)  
**Right panel** (displayed): gifts 12–23 (higher-value half)

---

## Offer algorithm
```
remaining = gifts that have NOT been opened yet
avg       = sum(remaining.value) / count(remaining)
target    = avg × 0.85          # slightly below average, like the TV banker
offer     = gift with value closest to `target`, searched across ALL 23 gifts
             (opened gifts can be offered too)
```

---

## Design specifications
| Property | Value |
|----------|-------|
| Background | `radial-gradient` deep navy/purple → black, multi-layer |
| Button (normal) | Gold gradient `#f5c830 → #ffd700 → #b87800`, dark border |
| Button (opened) | Dark grey gradient, 65 % opacity, pop animation |
| Status "Neues Angebot" | Green `#22dd77` with glow |
| Status "Letztes Angebot" | Orange `#ff7700` with glow |
| Reveal button | Red gradient, rounded pill, `box-shadow` red glow |
| Typography | **Anton** (Google Fonts) → fallback `Arial Black` |
| Layout | Desktop-first 3-column flex; collapses to single column ≤ 900 px |
| Timeline | Row of 34 px gold circles, pop animation on activation |

---

## Prompting instructions (use this section to regenerate or extend the project)

> "Build a static single-page 'Deal or No Deal' wedding-gift game in HTML + CSS + JS.
> 
> **Layout (desktop-first):**  
> Three columns: left gifts panel | centre panel | right gifts panel.  
> Below: full-width timeline of 23 numbered circles.  
> On tablet (≤900 px) stack vertically, centre panel on top.  
> On mobile (≤600 px) use 3-column gift grid; ≤400 px use 2-column gift grid.
> 
> **Gifts:**  
> 23 gifts ordered by value ascending (see table above).  
> Left panel = gifts 1–11, right panel = gifts 12–23.  
> **Never show prices.**  
> Each button shows a 🎁 icon and the gift title in uppercase.
> 
> **Game mechanics:**  
> - Clicking a gift button disables it (class `opened`, animate with scale pop).  
> - A counter increments and lights up the matching circle on the timeline.  
> - "Angebot aufdecken" button → calls `calculateOffer()` → shows "Neues Angebot:" + title.  
> - Next gift click → changes status to "Letztes Angebot:" (same title).  
> - Another "Angebot aufdecken" → new "Neues Angebot:".
> 
> **Offer algorithm:**  
> `target = average(remaining_gifts.value) × 0.85` then find closest gift from all 23.
> 
> **Style:**  
> Dark multi-layer radial/linear gradient background (navy → black).  
> Gold metallic buttons (`#ffd700` family), red pill reveal button.  
> Anton font (Google Fonts), fallback Arial Black.  
> Gold glow on hover/active timeline steps."
