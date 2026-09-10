import { main, prettify } from "./generateDigits.ts";
import { loadDictionaries } from "./loadDictionaries.ts";

const OUT_DIR = "src/converters/digits";
const DOC_PATH = "docs/digits.md";

process.exit(
  await main({
    argv: process.argv.slice(2),
    outDir: OUT_DIR,
    docPath: DOC_PATH,
    load: loadDictionaries,
    formatSource: prettify,
    log: console.log,
    error: console.error,
  })
);
