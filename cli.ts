#!/usr/bin/env -S deno run -A

import { program } from "./program.ts";

await program.parse(Deno.args);
