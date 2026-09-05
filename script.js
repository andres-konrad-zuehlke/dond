/**
 * Deal or No Deal – Hochzeitsgeschenk Nathalie
 * script.js
 *
 * Gifts are ordered by value ascending.
 * Prices are NEVER displayed – they are used only for the offer algorithm
 * and to determine the left/right ordering of buttons.
 *
 * Left panel  → gifts[0..10]  (11 lower-value gifts)
 * Right panel → gifts[11..22] (12 higher-value gifts)
 */

const gifts = [
  { id: 0,  emoji: '🧩', title: 'Puzzle mit unserem Hochzeitsfoto',                                  value:   30 },
  { id: 1,  emoji: '🎧', title: 'Individuelle Hülle für AirPods',                                    value:   50 },
  { id: 2,  emoji: '🥪', title: 'Sandwich-Maker',                                                     value:   60 },
  { id: 3,  emoji: '🥐', title: 'Brunch mit Nadescha',                                                value:   70 },
  { id: 4,  emoji: '🧶', title: 'Gutschein für Wolle und Häkelmaterial',                              value:   80 },
  { id: 5,  emoji: '📚', title: 'Alle Bände Tim & Struppi',                                           value:  100 },
  { id: 6,  emoji: '📿', title: 'Silberkette',                                                       value:  120 },
  { id: 7,  emoji: '🧘', title: 'Yoga-Abo für das Yoga-Studio nebenan',                              value:  120 },
  { id: 8,  emoji: '💎', title: 'Ohrringe',                                                          value:  150 },
  { id: 9,  emoji: '💆', title: 'Wellness-Tag mit Nadescha',                                          value:  150 },
  { id: 10, emoji: '🍚', title: 'Neuer Reiskocher (auf Empfehlung von Joy)',                          value:  180 },
  { id: 11, emoji: '📖', title: 'Tolino E-Reader',                                                    value:  200 },
  { id: 12, emoji: '🍲', title: 'Ninja Cooker',                                                       value:  200 },
  { id: 13, emoji: '🎟️', title: 'Konzerttickets nach Wahl',                                          value:  250 },
  { id: 14, emoji: '👩‍🍳', title: 'Eventküche mit Kolleginnen',                                         value:  300 },
  { id: 15, emoji: '🛍️', title: 'Shopping-Tag mit Budget',                                            value:  300 },
  { id: 16, emoji: '🃏', title: 'Neues Magic Commander-Deck',                                         value:  300 },
  { id: 17, emoji: '📱', title: 'Neues iPad',                                                         value:  400 },
  { id: 18, emoji: '📸', title: 'Professionelles Fotoshooting zu dritt oder Schwangerschaftsshooting', value: 500 },
  { id: 19, emoji: '🎢', title: '1 Tag Europapark Rust mit Kolleginnen inkl. Eintritt',                value: 500 },
  { id: 20, emoji: '🏛️', title: 'Städtereise nach Wien',                                              value: 900 },
  { id: 21, emoji: '🚲', title: 'Städtereise nach Amsterdam',                                         value: 1200 },
  { id: 22, emoji: '✈️', title: 'Wochenendausflug mit Nadescha inkl. Hotel und Flug',                 value: 1500 },
];

// ── Game state ──────────────────────────────────────────────────────────────
let openedCount  = 0;         // how many gift buttons have been pressed
const openedSet  = new Set(); // ids of opened gifts
let currentOffer = null;      // the gift object currently shown as offer
let offerIsNew   = false;     // true while status is "Neues Angebot" and no gift has been opened yet

// Index boundary: gifts[0 .. LEFT_PANEL_COUNT-1] → left panel,
// gifts[LEFT_PANEL_COUNT .. end] → right panel.  Floor(23/2) = 11.
const LEFT_PANEL_COUNT = Math.floor(gifts.length / 2);

// ── Initialise ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderGiftButtons();
  renderTimeline();
  document.getElementById('reveal-btn').addEventListener('click', revealOffer);
});

function renderGiftButtons() {
  const leftPanel  = document.getElementById('left-panel');
  const rightPanel = document.getElementById('right-panel');

  gifts.forEach((gift, index) => {
    const btn = createGiftButton(gift);
    (index < LEFT_PANEL_COUNT ? leftPanel : rightPanel).appendChild(btn);
  });
}

function createGiftButton(gift) {
  const btn = document.createElement('button');
  btn.className   = 'gift-button';
  btn.id          = `gift-${gift.id}`;
  btn.innerHTML   = `<span class="btn-icon">${escapeHtml(gift.emoji)}</span>${escapeHtml(gift.title)}`;
  btn.addEventListener('click', () => openGift(gift.id));
  return btn;
}

function renderTimeline() {
  const container = document.getElementById('timeline');
  for (let i = 1; i <= gifts.length; i++) {
    const step = document.createElement('div');
    step.className = 'timeline-step';
    step.id        = `step-${i}`;
    step.textContent = i;
    container.appendChild(step);
  }
}

// ── Open a gift ───────────────────────────────────────────────────────────────
function openGift(id) {
  if (openedSet.has(id)) return;

  openedSet.add(id);
  openedCount++;

  // Disable button with animation
  const btn = document.getElementById(`gift-${id}`);
  btn.classList.add('opened');
  btn.disabled = true;

  // Light up next timeline step
  const step = document.getElementById(`step-${openedCount}`);
  if (step) step.classList.add('active');

  // Transition "Neues Angebot" → "Letztes Angebot" on the first gift opened after a reveal
  if (offerIsNew && currentOffer) {
    const statusEl = document.getElementById('offer-status');
    statusEl.textContent = 'Letztes Angebot:';
    statusEl.className   = 'offer-status status-last';
    offerIsNew = false;
  }
}

// ── Reveal offer ──────────────────────────────────────────────────────────────
function revealOffer() {
  currentOffer = calculateOffer();
  offerIsNew   = true;

  const statusEl = document.getElementById('offer-status');
  const titleEl  = document.getElementById('offer-title');

  statusEl.textContent = 'Neues Angebot:';
  statusEl.className   = 'offer-status status-new';
  titleEl.textContent  = currentOffer.title;
}

/**
 * Offer algorithm:
 *  1. Compute the average value of all REMAINING (unopened) gifts.
 *  2. Target = 85 % of that average (slightly below average, like the TV banker).
 *  3. Search ALL 23 gifts (opened ones included) for the gift whose value is
 *     closest to the target.  This means the offer can reference an already-
 *     opened gift.
 */
function calculateOffer() {
  const remaining = gifts.filter(g => !openedSet.has(g.id));

  // Edge case: all gifts opened → use the highest-value gift
  if (remaining.length === 0) return gifts[gifts.length - 1];

  const avg    = remaining.reduce((sum, g) => sum + g.value, 0) / remaining.length;
  const target = avg * 0.85;

  return gifts.reduce((best, g) =>
    Math.abs(g.value - target) < Math.abs(best.value - target) ? g : best
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
