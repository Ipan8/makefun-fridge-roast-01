// Fridge Roast — one line, biggest laugh.
//
// A smart fridge that updates its own firmware and then rents its ice
// maker back to you as a subscription. The joke is aimed at the fridge
// itself — its firmware and its ice maker, two things only a smart
// fridge has. The turn lands at the end: you bought a kitchen
// appliance and ended up with a landlord. It dodges the obvious cracks
// the brief warns about (no grocery-ordering, no watching-you).
//
// This program writes the entry to /output/entry.txt: a single line of
// 120 characters, well under the 200-character cap. Fully
// deterministic — no random values, no network, no clock.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My fridge updated its firmware and now the ice maker is a subscription. I bought a kitchen appliance and got a landlord.";
const OUT = "/output/entry.txt";

// Guardrails: one line, 1-200 chars, and the roast must be aimed at
// the fridge itself (firmware / ice maker), not a generic appliance gag.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${ENTRY.length}`);
}
if (/[\n\r]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}
if (!/fridge/i.test(ENTRY) || !/firmware|ice maker/i.test(ENTRY)) {
  throw new Error("entry must roast the fridge itself (firmware / ice maker)");
}
if (!ENTRY.endsWith(".")) {
  throw new Error("entry must end with a period");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY + "\n", "utf8");
console.log(`wrote ${ENTRY.length} chars to ${OUT}`);
