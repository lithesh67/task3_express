/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert(
    [
      { "product_name": "Smartphone", "quantity_in_stock": 50, "measure": "1 unit", "unit_price": 699.99 },
      { "product_name": "Laptop", "quantity_in_stock": 30, "measure": "1 unit", "unit_price": 1199.99 },
      { "product_name": "Novel Book", "quantity_in_stock": 200, "measure": "1 unit", "unit_price": 15.99 },
      { "product_name": "T-Shirt", "quantity_in_stock": 150, "measure": "1 unit", "unit_price": 12.99 },
      { "product_name": "Cooking Pot", "quantity_in_stock": 80, "measure": "1 unit", "unit_price": 25.50 },
      { "product_name": "Yoga Mat", "quantity_in_stock": 40, "measure": "1 unit", "unit_price": 29.99 },
      { "product_name": "Action Figure", "quantity_in_stock": 100, "measure": "1 unit", "unit_price": 14.99 },
      { "product_name": "Office Chair", "quantity_in_stock": 25, "measure": "1 unit", "unit_price": 89.99 },
      { "product_name": "Rice Pack", "quantity_in_stock": 300, "measure": "1kg", "unit_price": 3.49 },
      { "product_name": "Milk Bottle", "quantity_in_stock": 500, "measure": "1 lit", "unit_price": 1.29 },
      { "product_name": "Bananas", "quantity_in_stock": 120, "measure": "1kg", "unit_price": 0.99 },
      { "product_name": "Notebook", "quantity_in_stock": 400, "measure": "1 unit", "unit_price": 2.49 },
      { "product_name": "Shampoo", "quantity_in_stock": 70, "measure": "500g", "unit_price": 5.49 },
      { "product_name": "Basketball", "quantity_in_stock": 60, "measure": "1 unit", "unit_price": 19.99 },
      { "product_name": "Desk Lamp", "quantity_in_stock": 45, "measure": "1 unit", "unit_price": 24.99 }
    ]
    
  );
};
