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

## Gift data
The gift table in `script.js` is the single source of truth. Gifts are ordered by
value ascending there, and each entry defines its title, emoji, and internal
value. Prices are **never displayed**; they are used only internally for the
offer algorithm and to determine the left/right ordering of the buttons.

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
