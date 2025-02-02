const fs=require('fs');
const xlsx=require('xlsx');
const {faker}=require('@faker-js/faker');

const vendors = ["Zepto", "Blinkit", "Big Basket", "swiggy","Amazon"];
const categories = ['Electronics','Books','Clothing','Home & Kitchen','Sports & Outdoors','Toys & Games'
    ,'Furniture','Groceries'];
const measures = ["kg", "g", "liters", "ml", "pack", "1unit"];
function generateData(count=10){
   let data=[];
   for(let i=0;i<count;i++){
    const product = {
        product_name: faker.commerce.productName(),
        unit_price: faker.number.int({ min: 10, max: 1000 }),
        quantity_in_stock: faker.number.int({ min: 1, max: 100 }),
        measure: faker.helpers.arrayElement(measures),
        category: faker.helpers.arrayElement(categories),
        vendors: faker.helpers
          .arrayElements(vendors, faker.number.int({ min: 1, max: 4 }))
          .join(", "),
      };
      data.push(product);
   }
  return data;
}

const sheet1=xlsx.utils.json_to_sheet(generateData(10000));
const sheet2=xlsx.utils.json_to_sheet(generateData(10000));
const workbook=xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook,sheet1,"sheet1");
xlsx.utils.book_append_sheet(workbook,sheet2,"sheet2");
xlsx.writeFile(workbook,'fakeData.xlsx');