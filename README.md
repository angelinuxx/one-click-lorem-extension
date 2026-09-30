# One-Click Lorem

A minimal Chrome/Brave extension that copies lorem ipsum text to the clipboard.
Click the toolbar icon, hover a 6x5 grid to pick how much text you want, click to copy.

- Each **row** is a paragraph, each **column** is a short fragment (the classic text split at periods, commas, "ut" and "et").
- Hovering cell (r, c) highlights the rectangle from the top-left corner and
  produces `r` paragraphs of `c` fragments each (up to 5 paragraphs x 6 fragments).
- Clicking copies the text and closes the popup.
- With **Paste into page** enabled (the toggle under the grid, remembered across
  sessions), the text is also inserted at the caret of the focused input,
  textarea or contenteditable element of the current tab. If nothing editable
  has the focus, only the clipboard copy happens.

## Install

The extension is not published on a store; load it as an unpacked extension.

1. Clone or download this repository.
2. Open `chrome://extensions` (or `brave://extensions`).
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the repository folder.
5. Pin the "One-Click Lorem" icon from the extensions menu, if you like.

After editing the source, click the reload icon on the extension card to apply changes.

## Development

No build step and no dependencies. Tests run on Node 18+ with the built-in test runner:

```sh
npm test
```

## Files

- `manifest.json`: Manifest V3, popup action. Permissions: `activeTab` and
  `scripting` (to paste into the current tab, only when the icon is clicked)
  and `storage` (to remember the toggle).
- `popup.html`, `popup.css`, `popup.js`: the grid UI.
- `lorem.js`: text source, fragment list and the `buildText(rows, cols)` function.
- `lorem.test.js`: tests for `buildText`.
- `icons/`: toolbar icons.
