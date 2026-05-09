import { readFileSync } from "node:fs"
import { resolve } from "node:path"

// astro build runs with cwd = apps/web; walk up to monorepo root (../..),
// then into packages/viewmotion/package.json.
const pkgPath = resolve(
  process.cwd(),
  "../../packages/viewmotion/package.json",
)

const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string }

/** Current published version of the viewmotion core package. */
export const VIEWMOTION_VERSION = pkg.version
