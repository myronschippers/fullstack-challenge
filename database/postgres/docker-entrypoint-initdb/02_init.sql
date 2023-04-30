-- DATABASE initialization of table structure

CREATE TABLE "customers" (
  "id" UUID NOT NULL PRIMARY KEY,
  "first_name" VARCHAR(150) NOT NULL,
  "last_name" VARCHAR(150) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  UNIQUE(id)
);

-- ADDITIONAL TABLES:
-- products
-- protection_plans
CREATE TABLE "purchases" (
  "id" UUID NOT NULL PRIMARY KEY,
  "invoice" VARCHAR(20),
  "total_sale_amount" MONEY NOT NULL,
  "invoice_date" TIMESTAMP NOT NULL,
  "delivery_date" TIMESTAMP,
  "name" VARCHAR(150) NOT NULL,
  "description" TEXT NOT NULL,
  "sku" VARCHAR(10) NOT NULL,
  "protection_plan_name" VARCHAR(150),
  "protection_plan_duration" INTEGER,
  "protection_plan_price" MONEY,
  "protection_plan_sku" VARCHAR(20),
  "protection_plan_period" VARCHAR(10),
  "customer_id" UUID REFERENCES customers (id) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  UNIQUE(id)
);

-- ADDITIONAL TABLES:
-- status_options
-- solution_options
-- product_condition_codes
CREATE TABLE "claims" (
  "id" UUID NOT NULL PRIMARY KEY,
  "status" VARCHAR(50) NOT NULL,
  "solution" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  "customer_id" UUID REFERENCES customers (id) NOT NULL,
  "product_purchase_id" UUID REFERENCES purchases (id) NOT NULL,
  "product_condition" VARCHAR(2) NOT NULL,
  "damage_description" TEXT,
  "damage_date" DATE NOT NULL,
  UNIQUE(id, product_purchase_id)
);
