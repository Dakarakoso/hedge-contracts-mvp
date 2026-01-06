import database from "infra/database.js";
import { NotFoundError, ValidationError } from "infra/errors.js";

async function findManyAll() {
  const results = await database.query({
    text: `
      SELECT
        id,
        contract_id,
        crop_id,
        contract_type,
        volume,
        unit,
        currency,
        price,
        delivery_start_date,
        delivery_end_date,
        contract_status,
        created_at
      FROM
        contracts
      ORDER BY
        created_at DESC
      ;
    `,
  });

  return results.rows;
}

async function findOneById(id) {
  const results = await database.query({
    text: `
      SELECT
        id,
        contract_id,
        crop_id,
        contract_type,
        volume,
        unit,
        currency,
        price,
        delivery_start_date,
        delivery_end_date,
        contract_status,
        created_at
      FROM
        contracts
      WHERE
        id = $1
      LIMIT 1
      ;
    `,
    values: [id],
  });

  if (results.rowCount === 0) {
    throw new NotFoundError({
      message: "Contract ID not found",
      action: "check if the contract id is correct",
    });
  }

  return results.rows[0];
}

async function create(contractInput) {
  validateContractInput(contractInput);

  const results = await database.query({
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
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING
        id,
        contract_id,
        crop_id,
        contract_type,
        volume,
        unit,
        currency,
        price,
        delivery_start_date,
        delivery_end_date,
        contract_status,
        created_at
      ;
    `,
    values: [
      contractInput.contract_id,
      contractInput.crop_id,
      contractInput.contract_type,
      contractInput.volume,
      contractInput.unit,
      contractInput.currency,
      contractInput.price ?? null,
      contractInput.delivery_start_date,
      contractInput.delivery_end_date,
      contractInput.contract_status,
    ],
  });

  return results.rows[0];
}

function validateContractInput(contractInput) {
  if (contractInput.contract_type === "FIXO" && contractInput.price == null) {
    throw new ValidationError({
      message: "price is required when contract_type is FIXO",
      action: "include price for FIXO contracts",
    });
  }
}

const contracts = {
  findManyAll,
  findOneById,
  create,
};

export default contracts;
