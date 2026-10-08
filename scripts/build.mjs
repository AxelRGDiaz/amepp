// Compila el sitio para producción.
// - Con TINA_CLIENT_ID y TINA_TOKEN (Tina Cloud): el editor en /admin queda activo y guarda en GitHub.
// - Sin ellas: compila igual el sitio público con el contenido del repo (el editor en línea no funcionará).
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit", env: process.env });
const hasCloud = Boolean(process.env.TINA_CLIENT_ID && process.env.TINA_TOKEN);

if (hasCloud) {
  run("tinacms build --noTelemetry");
  run("astro build");
} else {
  console.warn("⚠️  Sin TINA_CLIENT_ID/TINA_TOKEN: compilando con contenido local (editor en línea desactivado).");
  run('tinacms build --local --skip-cloud-checks --noTelemetry -c "astro build"');
}
