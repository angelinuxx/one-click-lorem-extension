// Classic "Lorem ipsum" text (the five standard paragraphs).
const TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " +
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. " +
  "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. " +
  "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. " +
  "Donec lobortis risus a elit. Etiam tempor. " +
  "Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. " +
  "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. " +
  "Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. " +
  "Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. " +
  "Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. " +
  "Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. " +
  "Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. " +
  "Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus. " +
  "In convallis tellus a mauris. Curabitur non elit ut libero tristique sodales. Mauris a lacus. " +
  "Donec mattis semper leo. In hac habitasse platea dictumst. Vivamus facilisis diam at odio. " +
  "Mauris dictum, nisi eget consequat elementum, lacus ligula molestie metus, non feugiat orci magna ac sem. " +
  "Donec turpis. Donec vitae metus. " +
  "Morbi tristique, orci ac convallis aliquam, lectus turpis varius lorem, eu posuere nunc justo tempus leo. " +
  "Donec mattis, purus nec placerat bibendum, dui pede condimentum odio, ac blandit ante orci ut diam. " +
  "Cras fringilla, nisi eget bibendum tincidunt, ligula magna consequat arcu, non pulvinar lectus lorem sed dui.";

// Short fragments, split at periods, commas, "ut" and "et". Each fragment
// carries its own leading separator, so fragments concatenate as-is. The
// final period of the text is moved to the front so the cycle wraps cleanly.
export const FRAGMENTS = (". " + TEXT.slice(0, -1)).split(/(?=, |\. | ut | et )/);

const SEPARATOR = /^[,.]? ?/;

function startParagraph(fragment) {
  const text = fragment.replace(SEPARATOR, "");
  return text[0].toUpperCase() + text.slice(1);
}

// Builds `rows` paragraphs of `cols` fragments each, taking fragments in a
// continuous cycle. Every paragraph ends with a period, except for the single
// fragment produced by a 1x1 selection.
export function buildText(rows, cols) {
  const paragraphs = [];
  let index = 0;
  for (let r = 0; r < rows; r++) {
    let paragraph = startParagraph(FRAGMENTS[index++ % FRAGMENTS.length]);
    for (let c = 1; c < cols; c++) {
      paragraph += FRAGMENTS[index++ % FRAGMENTS.length];
    }
    paragraphs.push(paragraph);
  }
  const text = paragraphs.join(".\n\n");
  return rows === 1 && cols === 1 ? text : text + ".";
}
