# Lorem Ipsum Picker

A minimal Chrome/Brave extension that copies lorem ipsum text to the clipboard.
Click the toolbar icon, hover a 6x5 grid to pick how much text you want, click to copy.

- Each **row** is a paragraph, each **column** is a sentence.
- Hovering cell (r, c) highlights the rectangle from the top-left corner and
  produces `r` paragraphs of `c` sentences each (up to 5 paragraphs x 6 sentences).
- Clicking copies the text and closes the popup.

## Install

The extension is not published on a store; load it as an unpacked extension.

1. Clone or download this repository.
2. Open `chrome://extensions` (or `brave://extensions`).
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the repository folder.
5. Pin the "Lorem Ipsum Picker" icon from the extensions menu, if you like.

After editing the source, click the reload icon on the extension card to apply changes.

## Development

No build step and no dependencies. Tests run on Node 18+ with the built-in test runner:

```sh
npm test
```

## Files

- `manifest.json`: Manifest V3, popup action, no permissions.
- `popup.html`, `popup.css`, `popup.js`: the grid UI.
- `lorem.js`: sentence source and the `buildText(rows, cols)` function.
- `lorem.test.js`: tests for `buildText`.
- `icons/`: toolbar icons.
