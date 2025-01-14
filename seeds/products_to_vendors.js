/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products_to_vendors').del()
  await knex('products_to_vendors').insert(
    [
      {"vendor_id": 1, "product_id": 31},
      {"vendor_id": 2, "product_id": 31},
      {"vendor_id": 3, "product_id": 31},
      {"vendor_id": 1, "product_id": 32},
      {"vendor_id": 4, "product_id": 32},
      {"vendor_id": 5, "product_id": 32},
      {"vendor_id": 2, "product_id": 33},
      {"vendor_id": 3, "product_id": 33},
      {"vendor_id": 4, "product_id": 33},
      {"vendor_id": 1, "product_id": 34},
      {"vendor_id": 2, "product_id": 34},
      {"vendor_id": 5, "product_id": 34},
      {"vendor_id": 1, "product_id": 35},
      {"vendor_id": 3, "product_id": 35},
      {"vendor_id": 4, "product_id": 35},
      {"vendor_id": 2, "product_id": 36},
      {"vendor_id": 4, "product_id": 36},
      {"vendor_id": 5, "product_id": 36},
      {"vendor_id": 2, "product_id": 39},
      {"vendor_id": 3, "product_id": 39},
      {"vendor_id": 5, "product_id": 39},
      {"vendor_id": 1, "product_id": 40},
      {"vendor_id": 4, "product_id": 40},
      {"vendor_id": 2, "product_id": 40},
      {"vendor_id": 3, "product_id": 40},
      {"vendor_id": 5, "product_id": 40},
      {"vendor_id": 1, "product_id": 41},
      {"vendor_id": 2, "product_id": 41},
      {"vendor_id": 3, "product_id": 41},
      {"vendor_id": 4, "product_id": 41},
      {"vendor_id": 1, "product_id": 42},
      {"vendor_id": 2, "product_id": 42}
    ]
    
  );
};
