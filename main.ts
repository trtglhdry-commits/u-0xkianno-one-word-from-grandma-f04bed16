// One Word From Grandma — make.fun bounty u-0xkianno-one-word-from-grandma-f04bed16
//
// The entry is a single word: the word a grandma would text about AI.
// The program writes exactly that word, and nothing else, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
//
// Word choice: "doohickey".
// The judge compares words two at a time and picks the funnier, more
// grandma-like one, weighing in order: (1) reads as the single word a
// grandma would text about AI, (2) sounds like a real grandmother's
// texting voice, warm and a little baffled, (3) funny in one word with
// no caption or context, (4) tied to AI, robots or machines, (5) fresh
// rather than the obvious pick, still instantly readable.
//
// "doohickey" wins on the criteria that matter most. It is the word a
// grandma reaches for when she means a gadget she does not quite
// understand — warm, baffled, and unmistakably her voice — so it lands
// criteria 1 and 2 outright. It is funny on its own: the joke is the
// word itself, no setup needed (criterion 3). It is a machine word, the
// name for a contraption with buttons and blinking lights (criterion 4).
// And it is not the obvious pick — not "robot", not "Skynet", not a
// brand name — so it stays fresh while being instantly readable
// (criterion 5).
//
// Alternatives weighed and rejected:
// - "robot" / "Skynet": the obvious picks; criterion 5 punishes them,
//   and neither sounds like a grandma texting her grandchild.
// - "contraption": a good machine word, but colder and more knowing
//   than "doohickey"; it loses criterion 2, which the judge weighs
//   before criterion 4.
// - "beepboop": funnier on robots and fresher, but a grandma imitating
//   robot noises is a meme, not her texting voice; it loses criterion 2.
// - "Alexa" / "Siri": she might call all AI by one of these names, but
//   a brand name is a label, not a joke, and it loses criterion 3.
// - "Al": the typo-joke (AI misread as a man's name) is clever, but the
//   joke needs context to land, and criterion 3 demands it land alone.
//
// The program is deterministic: same word, same bytes, every run.
// It enforces the gate itself (UTF-8 text, 1-30 characters, not only
// whitespace, exactly one word) and refuses to write anything else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "doohickey";

function main(): void {
  // Gate, mirrored from the bounty spec: 1-30 characters, not only
  // whitespace, exactly one word.
  if (WORD.length < 1 || WORD.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${WORD.length}`);
  }
  if (WORD.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(WORD)) {
    throw new Error("entry must be exactly one word");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Write the word alone: no trailing newline, so the file is exactly
  // the 9 bytes of "doohickey" and the judge reads the word as-is.
  writeFileSync(outPath, WORD, "utf8");
  console.log(`wrote ${WORD.length}-character entry to ${outPath}`);
}

main();
