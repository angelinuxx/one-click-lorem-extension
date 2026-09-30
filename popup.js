import { buildText } from "./lorem.js";

const COLS = 6;
const ROWS = 5;

const grid = document.getElementById("grid");
const label = document.getElementById("label");
const pasteToggle = document.getElementById("paste");
const cells = [];

chrome.storage.local.get({ paste: false }, ({ paste }) => {
  pasteToggle.checked = paste;
});

pasteToggle.addEventListener("change", () => {
  chrome.storage.local.set({ paste: pasteToggle.checked });
});

for (let r = 1; r <= ROWS; r++) {
  for (let c = 1; c <= COLS; c++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.row = r;
    cell.dataset.col = c;
    grid.appendChild(cell);
    cells.push(cell);
  }
}

function highlight(rows, cols) {
  for (const cell of cells) {
    const inside = Number(cell.dataset.row) <= rows && Number(cell.dataset.col) <= cols;
    cell.classList.toggle("hl", inside);
  }
}

function plural(n, word) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

grid.addEventListener("mouseover", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;
  const rows = Number(cell.dataset.row);
  const cols = Number(cell.dataset.col);
  highlight(rows, cols);
  label.classList.remove("error");
  label.textContent = `${plural(rows, "paragraph")} × ${plural(cols, "fragment")}`;
});

grid.addEventListener("mouseleave", () => {
  highlight(0, 0);
  label.classList.remove("error");
  label.textContent = "—";
});

// Runs inside the page (every frame). Inserts `text` at the caret of the
// focused editable element, if any. Returns whether something was inserted.
function insertIntoFocusedElement(text) {
  let el = document.activeElement;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) {
    el = el.shadowRoot.activeElement;
  }
  if (!el) return false;
  const isField = el instanceof HTMLTextAreaElement ||
    (el instanceof HTMLInputElement && /^(text|search|url|email|tel|password)?$/.test(el.type));
  if (!isField && !el.isContentEditable) return false;
  el.focus();
  if (document.execCommand("insertText", false, text)) return true;
  if (!isField) return false;
  el.setRangeText(text, el.selectionStart, el.selectionEnd, "end");
  el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
  return true;
}

async function pasteIntoActiveTab(text) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: insertIntoFocusedElement,
    args: [text],
  });
}

grid.addEventListener("click", async (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;
  const text = buildText(Number(cell.dataset.row), Number(cell.dataset.col));
  let step = "Copy";
  try {
    await navigator.clipboard.writeText(text);
    step = "Paste";
    if (pasteToggle.checked) await pasteIntoActiveTab(text);
    window.close();
  } catch (err) {
    label.classList.add("error");
    label.textContent = `${step} failed: ${err.message}`;
  }
});
