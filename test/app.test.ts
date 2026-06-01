import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("cicd-vps-admin-ti", () => {
  it("responde correctamente el healthcheck", async () => {
    const response = await app.request("/health");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.service).toBe("cicd-vps-admin-ti");
  });

  it("expone las etapas del pipeline", async () => {
    const response = await app.request("/api/pipeline");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.trigger).toBe("push a main");
    expect(body.stages).toHaveLength(4);
  });
});
