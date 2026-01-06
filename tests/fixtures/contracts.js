import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

async function setupContractsFixture() {
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();

  await database.query({
    text: `
      INSERT INTO contracts (
        contract_id,
        crop_id,
        contract_type,
        volume,
        unit,
        currency,
        price,
        delivery_start_date,
        delivery_end_date,
        contract_status
      )
      VALUES
        (
          'C-TEST-FIXO-001',
          gen_random_uuid(),
          'FIXO',
          100,
          'TON',
          'BRL',
          150.0,
          '2025-02-01',
          '2025-02-28',
          'ATIVO'
        ),
        (
          'C-TEST-AFIXAR-001',
          gen_random_uuid(),
          'A_FIXAR',
          200,
          'TON',
          'BRL',
          NULL,
          '2025-03-01',
          '2025-03-31',
          'ATIVO'
        ),
        (
          'C-TEST-BARTER-001',
          gen_random_uuid(),
          'BARTER',
          150,
          'TON',
          'USD',
          28.5,
          '2025-04-01',
          '2025-04-30',
          'ATIVO'
        );
    `,
  });
}

const contractsFixture = {
  setupContractsFixture,
};

export default contractsFixture;
