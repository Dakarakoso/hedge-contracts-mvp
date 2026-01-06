import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/contracts", () => {
  describe("Anonymous user", () => {
    test("creates a FIXO contract (valid payload)", async () => {
      const response = await fetch("http://localhost:3000/api/v1/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contract_id: "C-POST-FIXO-001",
          crop_id: "00000000-0000-0000-0000-000000000001",
          contract_type: "FIXO",
          volume: 100,
          unit: "TON",
          currency: "BRL",
          price: 150.0,
          delivery_start_date: "2025-02-01",
          delivery_end_date: "2025-02-28",
          contract_status: "ATIVO",
        }),
      });

      expect(response.status).toBe(201);
    });

    test("rejects FIXO without price", async () => {
      const response = await fetch("http://localhost:3000/api/v1/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contract_id: "C-POST-FIXO-002",
          crop_id: "00000000-0000-0000-0000-000000000002",
          contract_type: "FIXO",
          volume: 50,
          unit: "TON",
          currency: "USD",
          // price omitted on purpose
          delivery_start_date: "2025-03-01",
          delivery_end_date: "2025-03-15",
          contract_status: "ATIVO",
        }),
      });

      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
    });
  });
});
