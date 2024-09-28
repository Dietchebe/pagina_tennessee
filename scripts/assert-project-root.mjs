import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const cwd = process.cwd();
const require = createRequire(import.meta.url);

const packageJsonPath = path.join(cwd, "package.json");
const expectedName = "tennessee";
const nodeVersion = process.versions.node;
const [major, minor] = nodeVersion.split(".").map(Number);

function fail(message) {
  console.error(`\n[tennessee] ${message}\n`);
  process.exit(1);
}

if (major >= 25) {
  fail(
    `Estás usando Node ${nodeVersion}.\nEste proyecto se está bloqueando para Node 20.9+ y <25 porque con Node 25 ya vimos fallos de resolución en Next/Tailwind.\nCambia a Node 22 LTS o 20.9.x antes de correr npm run dev.`,
  );
}

if (major === 20 && minor < 9) {
  fail(
    `Estás usando Node ${nodeVersion}, pero Next requiere al menos Node 20.9.\nActualiza Node antes de correr npm run dev.`,
  );
}

if (!fs.existsSync(packageJsonPath)) {
  fail(
    `No se encontró package.json en ${cwd}.\nEjecuta el comando dentro de /Users/benjaminclaps/Desktop/programando/tennessee.`,
  );
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
if (pkg.name !== expectedName) {
  fail(
    `Estás en ${cwd}, pero este script espera el proyecto "${expectedName}".\nAbre la carpeta correcta antes de correr npm run dev.`,
  );
}

try {
  require.resolve("tailwindcss/package.json");
  require.resolve("@tailwindcss/postcss");
} catch (error) {
  fail(
    `No se pueden resolver las dependencias de Tailwind desde ${cwd}.\nSi ves esto después de mover carpetas o de un bug de Node, borra .next y reinstala node_modules.`,
  );
}

console.log(`[tennessee] Entorno OK en ${cwd}`);
