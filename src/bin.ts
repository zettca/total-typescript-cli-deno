#!/usr/bin/env -S deno run -A

import { program } from "./command.ts";

await program.parse(Deno.args);
