/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('vendors').del()
  await knex('vendors').insert(
    [ 
      {"vendor_name":"Zepto", "contact_name":"Rahul Sharma", "address":"12 MG Road","city":"Mumbai","postal_code":"400001","country":"India","phone":"+91-9876543210"},
      {"vendor_name":"Swiggy","contact_name":"Pooja Verma","address":"45 Church Street","city":"Bangalore","postal_code":"560001","country":"India","phone":"+91-9823456789"},
      {"vendor_name":"Big Basket","contact_name":"Sandeep Kumar","address":"89 Lajpat Nagar","city":"Delhi","postal_code":"110024","country":"India","phone":"+91-9812345678"},
      {"vendor_name":"Blinkit","contact_name":"Ankita Singh","address":"22 Salt Lake City","city":"Kolkata","postal_code":"700091","country":"India","phone":"+91-9832145678"},
      {"vendor_name":"Amazon","contact_name":"Rajesh Gupta","address":"77 Gachibowli","city":"Hyderabad","postal_code":"500032","country":"India","phone":"+91-9845123456"}
    ]
  );
};
