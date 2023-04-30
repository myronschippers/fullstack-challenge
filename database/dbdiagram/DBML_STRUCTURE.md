# ERD for Customers, Purchases, & Claims

The ERDs were created using [dbdiagram](https://dbdiagram.io/). The scripts below are [DBML](https://dbml.dbdiagram.io/docs/) (database markup language) that is used on [dbdiagram](https://dbdiagram.io/) in order to render the ERDs. The below scripts can be copied and pasted into the [dbdiagram](https://dbdiagram.io/) app to render the ERDs that are depicted below.

## Basic Structure

A more basic data structure following strictly the Customer, Purchases, and Claims table structure from the challenge instructions.

![Basic ERD](./data-structure-basic.png)

*[DBML](https://dbml.dbdiagram.io/docs/) script for [dbdiagram](https://dbdiagram.io/):*
```sql
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table customers {
  id uuid [primary key]
  first_name varchar
  last_name number
  created_at timestamp
  updated_at timestamp
}

Table purchases {
  id uuid [primary key]
  invoice varchar
  total_sale_amount money
  invoice_date timestamp
  delivery_date timestamp
  name varchar
  description text
  sku varchar
  protection_plan_name varchar
  protection_plan_duration integer
  protection_plan_price money
  protection_plan_sku varchar
  protection_plan_period varchar
  customer_id uuid
  created_at timestamp
  updated_at timestamp
}

Table claims {
  id uuid [primary key]
  status varchar
  solution varchar
  created_at timestamp
  updated_at timestamp
  customer_id uuid
  product_purchase_id uuid
  product_condition varchar
  damage_description text
  damage_date timestamp
}


Ref: "customers"."id" < "claims"."customer_id"

Ref: "purchases"."id" < "claims"."product_purchase_id"

Ref: "customers"."id" < "purchases"."customer_id"
```

## More Complex Structure

![Complex ERD](./data-structure-complex.png)

*[DBML](https://dbml.dbdiagram.io/docs/) script for [dbdiagram](https://dbdiagram.io/):*
```sql
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table customers {
  id uuid [primary key]
  first_name varchar
  last_name number
  created_at timestamp
  updated_at timestamp
}

Table purchases {
  id uuid [primary key]
  invoice varchar
  total_sale_amount money
  invoice_date timestamp
  delivery_date timestamp
  product_id uuid
  protection_plan_id uuid
  customer_id uuid
  created_at timestamp
  updated_at timestamp
}

Table claims {
  id uuid [primary key]
  status_id integer
  solution_id integer
  created_at timestamp
  updated_at timestamp
  customer_id uuid
  product_purchase_id uuid
  product_condition_id integer
  damage_description text
  damage_date timestamp
}

Table products {
  id uuid [primary key]
  name varchar
  description varchar
  sku varchar
  created_at timestamp
  updated_at timestamp
}

Table protection_plans {
  id uuid [primary key]
  protection_plan_name varchar
  protection_plan_duration integer
  protection_plan_price money
  protection_plan_sku varchar
  protection_plan_period varchar
  created_at timestamp
  updated_at timestamp
}

Table status_options {
  id integer [primary key]
  status_name varchar
  created_at timestamp
  updated_at timestamp
}

Table solution_options {
  id integer [primary key]
  solution_name varchar
  created_at timestamp
  updated_at timestamp
}

Table product_condition_codes {
  id integer [primary key]
  code varchar
  created_at timestamp
  updated_at timestamp
}

Ref: "product_condition_codes"."id" < "claims"."product_condition_id"

Ref: "solution_options"."id" < "claims"."solution_id"

Ref: "status_options"."id" < "claims"."status_id"

Ref: "customers"."id" < "claims"."customer_id"

Ref: "purchases"."id" < "claims"."product_purchase_id"

Ref: "customers"."id" < "purchases"."customer_id"

Ref: "protection_plans"."id" < "purchases"."protection_plan_id"

Ref: "products"."id" < "purchases"."product_id"
```
