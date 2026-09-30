import { buildText } from "./lorem.js";

const COLS = 6;
const ROWS = 5;

const grid = document.getElementById("grid");
const label = document.getElementById("label");
const cells = [];

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
  label.textContent = `${plural(rows, "paragraph")} × ${plural(cols, "sentence")}`;
});

grid.addEventListener("mouseleave", () => {
  highlight(0, 0);
  label.classList.remove("error");
  label.textContent = "—";
});

grid.addEventListener("click", async (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;
  const text = buildText(Number(cell.dataset.row), Number(cell.dataset.col));
  try {
    await navigator.clipboard.writeText(text);
    window.close();
  } catch (err) {
    label.classList.add("error");
    label.textContent = `Copy failed: ${err.message}`;
  }
});
