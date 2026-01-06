import orchestrator from "tests/orchestrator.js";
import contractsFixture from "tests/fixtures/contracts.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await contractsFixture.setupContractsFixture();
});

describe("GET /api/v1/contracts", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/contracts");
      expect(response.status).toBe(200);
    });
  });
});
