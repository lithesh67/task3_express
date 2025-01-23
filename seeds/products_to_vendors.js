/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products_to_vendors').del()
  await knex('products_to_vendors').insert(
    [
      {"vendor_id": 1, "product_id": 100},
      {"vendor_id": 2, "product_id": 100},
      {"vendor_id": 3, "product_id": 100},
      {"vendor_id": 1, "product_id": 101},
      {"vendor_id": 4, "product_id": 101},
      {"vendor_id": 5, "product_id": 101},
      {"vendor_id": 2, "product_id": 102},
      {"vendor_id": 3, "product_id": 102},
      {"vendor_id": 4, "product_id": 102},
      {"vendor_id": 1, "product_id": 103},
      {"vendor_id": 2, "product_id": 103},
      {"vendor_id": 5, "product_id": 103},
      {"vendor_id": 1, "product_id": 104},
      {"vendor_id": 3, "product_id": 104},
      {"vendor_id": 4, "product_id": 104},
      {"vendor_id": 2, "product_id": 105},
      {"vendor_id": 4, "product_id": 105},
      {"vendor_id": 5, "product_id": 105},
      {"vendor_id": 2, "product_id": 106},
      {"vendor_id": 3, "product_id": 106},
      {"vendor_id": 5, "product_id": 106},
      {"vendor_id": 1, "product_id": 107},
      {"vendor_id": 4, "product_id": 108},
      {"vendor_id": 2, "product_id": 108},
      {"vendor_id": 3, "product_id": 108},
      {"vendor_id": 5, "product_id": 108},
      {"vendor_id": 1, "product_id": 109},
      {"vendor_id": 2, "product_id": 109},
      {"vendor_id": 3, "product_id": 109},
      {"vendor_id": 4, "product_id": 109},
      {"vendor_id": 1, "product_id": 110},
      {"vendor_id": 2, "product_id": 110},
      {"vendor_id": 3, "product_id": 111},
      {"vendor_id": 4, "product_id": 111},
      {"vendor_id": 5, "product_id": 111},
      {"vendor_id": 1, "product_id": 112},
      {"vendor_id": 2, "product_id": 112},
      {"vendor_id": 4, "product_id": 113},
      {"vendor_id": 3, "product_id": 114},
      {"vendor_id": 5, "product_id": 114}
    ]
    
    
  );
};
