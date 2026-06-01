import { Hono } from "hono";

export const pipelineStages = [
  {
    name: "Validacion",
    tool: "Vitest",
    description: "Ejecuta pruebas automaticas antes de construir la imagen."
  },
  {
    name: "Construccion",
    tool: "Docker Buildx",
    description: "Genera una imagen Docker versionada con el commit."
  },
  {
    name: "Publicacion",
    tool: "GitHub Container Registry",
    description: "Publica la imagen en GHCR para que la VPS la pueda descargar."
  },
  {
    name: "Despliegue",
    tool: "SSH + Docker Compose",
    description: "Actualiza el contenedor en la VPS y valida el endpoint /health."
  }
] as const;

export const pipelineRoute = new Hono();

pipelineRoute.get("/", (c) => {
  return c.json({
    project: "cicd-vps-admin-ti",
    trigger: "push a main",
    stages: pipelineStages
  });
});
