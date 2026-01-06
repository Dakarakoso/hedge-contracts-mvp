exports.up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("contracts", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    contract_id: { type: "text", notNull: true, unique: true },
    crop_id: { type: "uuid", notNull: true },
    contract_type: { type: "text", notNull: true }, // FIXO, A_FIXAR, BARTER
    volume: { type: "numeric", notNull: true },
    unit: { type: "text", notNull: true },
    currency: { type: "text", notNull: true }, // BRL, USD
    price: { type: "numeric" }, // required if type FIXO
    delivery_start_date: { type: "date", notNull: true },
    delivery_end_date: { type: "date", notNull: true },
    contract_status: {
      type: "text",
      notNull: true,
      default: "ATIVO",
    }, // ATIVO, CANCELADO, ENTREGUE
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  pgm.addConstraint(
    "contracts",
    "contracts_contract_type_check",
    "CHECK (\"contract_type\" in ('FIXO', 'A_FIXAR', 'BARTER'))",
  );

  pgm.addConstraint(
    "contracts",
    "contracts_currency_check",
    "CHECK (\"currency\" in ('BRL', 'USD'))",
  );

  pgm.addConstraint(
    "contracts",
    "contracts_contract_status_check",
    "CHECK (\"contract_status\" in ('ATIVO', 'CANCELADO', 'ENTREGUE'))",
  );

  pgm.addConstraint(
    "contracts",
    "contracts_delivery_dates_check",
    'CHECK ("delivery_start_date" <= "delivery_end_date")',
  );

  pgm.addConstraint(
    "contracts",
    "contracts_price_required_if_fixo",
    'CHECK ("contract_type" <> \'FIXO\' OR "price" IS NOT NULL)',
  );
};

exports.down = false;
