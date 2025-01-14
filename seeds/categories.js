/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert(
    [
      {"category": "Electronics","description": "Devices and gadgets like smartphones and laptops."},
      { "category": "Books","description": "Printed and digital books across various genres." },
      { "category": "Clothing","description": "Apparel for men, women, and children."},
      { "category": "Home & Kitchen","description": "Products for home improvement and kitchen essentials." },
      {"category": "Sports & Outdoors","description": "Equipment and gear for outdoor activities and sports."},
      {"category": "Toys & Games","description": "Toys, games, and activities for children and adults." },
      {"category": "Furniture","description": "Furniture for living rooms, bedrooms, and offices."},
      {"category": "Groceries", "description": "Everyday food and household essentials."}
    ]
    
  );
};
