import { Hono } from "hono";
import { pipelineRoute, pipelineStages } from "./routes/pipeline.js";

const gitSha = process.env.GIT_SHA ?? "local";
const environment = process.env.NODE_ENV ?? "development";
const deployedAt = process.env.DEPLOYED_AT ?? new Date().toISOString();

export const app = new Hono();

app.get("/", (c) => {
  return c.html(`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CI/CD VPS Admin TI</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f6f7f9;
        color: #17202a;
      }
      body {
        margin: 0;
      }
      main {
        max-width: 960px;
        margin: 0 auto;
        padding: 48px 20px;
      }
      h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1;
        margin: 0 0 16px;
        letter-spacing: 0;
      }
      p {
        color: #44505c;
        font-size: 1.05rem;
        line-height: 1.6;
      }
      .status {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        margin: 32px 0;
      }
      .item {
        background: white;
        border: 1px solid #d9dee5;
        border-radius: 8px;
        padding: 16px;
      }
      .label {
        color: #65717f;
        font-size: 0.85rem;
      }
      .value {
        display: block;
        margin-top: 6px;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      ol {
        display: grid;
        gap: 10px;
        padding-left: 22px;
      }
      li {
        background: white;
        border: 1px solid #d9dee5;
        border-radius: 8px;
        padding: 14px 16px;
      }
      strong {
        display: block;
      }
      code {
        background: #e9edf2;
        border-radius: 4px;
        padding: 2px 5px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>CI/CD hacia VPS</h1>
      <p>
        Aplicacion demostrativa para Administracion de TI. Cada cambio en <code>main</code>
        puede validarse, construirse y desplegarse automaticamente en una VPS con Docker.
      </p>
      <section class="status" aria-label="Estado del despliegue">
        <div class="item"><span class="label">Estado</span><span class="value">Online</span></div>
        <div class="item"><span class="label">Ambiente</span><span class="value">${environment}</span></div>
        <div class="item"><span class="label">Commit</span><span class="value">${gitSha}</span></div>
        <div class="item"><span class="label">Desplegado</span><span class="value">${deployedAt}</span></div>
      </section>
      <h2>Pipeline implementado</h2>
      <ol>
        ${pipelineStages
          .map(
            (stage) =>
              `<li><strong>${stage.name} - ${stage.tool}</strong><span>${stage.description}</span></li>`
          )
          .join("")}
      </ol>
    </main>
  </body>
</html>`);
});

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "cicd-vps-admin-ti",
    sha: gitSha,
    environment
  });
});

app.route("/api/pipeline", pipelineRoute);
