-- DATABASE initialization of table structure

CREATE TABLE "customers" (
  "id" UUID NOT NULL PRIMARY KEY,
  "firstName" VARCHAR(150) NOT NULL,
  "lastName" VARCHAR(150) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  UNIQUE(id)
);

-- ADDITIONAL TABLES:
-- products
-- protection_plans
CREATE TABLE "purchases" (
  "id" UUID NOT NULL PRIMARY KEY,
  "invoice" VARCHAR(20),
  "totalSaleAmount" MONEY NOT NULL,
  "invoiceDate" TIMESTAMP NOT NULL,
  "deliveryDate" TIMESTAMP,
  "name" VARCHAR(150) NOT NULL,
  "description" TEXT NOT NULL,
  "sku" VARCHAR(10) NOT NULL,
  "protectionPlanName" VARCHAR(150),
  "protectionPlanDuration" INTEGER,
  "protectionPlanPrice" MONEY,
  "protectionPlanSku" VARCHAR(20),
  "protectionPlanPeriod" VARCHAR(10),
  "customerId" UUID REFERENCES customers (id) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
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
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  "customerId" UUID REFERENCES customers (id) NOT NULL,
  "productPurchaseId" UUID REFERENCES purchases (id) NOT NULL,
  "productCondition" VARCHAR(2) NOT NULL,
  "damageDescription" TEXT,
  "damageDate" DATE NOT NULL,
  UNIQUE(id, productPurchaseId)
);
