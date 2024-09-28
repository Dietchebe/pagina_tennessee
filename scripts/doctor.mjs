import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const cwd = process.cwd();
const require = createRequire(import.meta.url);
const nodeVersion = process.versions.node;
const [major, minor] = nodeVersion.split(".").map(Number);
const packageJsonPath = path.join(cwd, "package.json");
const expectedName = "tennessee";

function readPackageJson() {
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
}

function checkNodeVersion() {
  if (major >= 25) {
    return {
      ok: false,
      message: `Node ${nodeVersion} no es seguro para este proyecto. Usa Node 22 LTS o 20.9.x.`,
    };
  }

  if (major === 20 && minor < 9) {
    return {
      ok: false,
      message: `Node ${nodeVersion} es demasiado viejo. Next requiere al menos 20.9.`,
    };
  }

  return { ok: true, message: `Node ${nodeVersion} OK` };
}

function checkTailwind() {
  try {
    require.resolve("tailwindcss/package.json");
    require.resolve("@tailwindcss/postcss");
    return { ok: true, message: "Tailwind OK" };
  } catch {
    return {
      ok: false,
      message: "Tailwind no se puede resolver desde este proyecto",
    };
  }
}

function checkRoot(pkg) {
  if (!pkg) {
    return {
      ok: false,
      message: `No hay package.json en ${cwd}`,
    };
  }

  if (pkg.name !== expectedName) {
    return {
      ok: false,
      message: `Estás en ${cwd}, pero este proyecto espera "${expectedName}"`,
    };
  }

  return { ok: true, message: `Raíz del proyecto OK (${pkg.name})` };
}

const pkg = readPackageJson();
const checks = [checkRoot(pkg), checkNodeVersion(), checkTailwind()];
const failed = checks.filter((check) => !check.ok);

console.log(`[tennessee] Doctor para ${cwd}`);
for (const check of checks) {
  console.log(`${check.ok ? "OK" : "FAIL"} - ${check.message}`);
}

if (failed.length > 0) {
  process.exit(1);
}
