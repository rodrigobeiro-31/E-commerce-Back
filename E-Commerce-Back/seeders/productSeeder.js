const { faker, LoremModule } = require("@faker-js/faker");
const Product = require("../models/Product");

faker.locale = "es";

module.exports = async () => {
  const products = []
  const bread = new Product({
    name: "pan",
    price: 2.10,
    description: "dofhaodfhaofh",
    category: "panaderia",
    stock: 10,
    slug: "pan",
    image: "https://www.recetasderechupete.com/wp-content/uploads/2018/01/Pan-casero-f%C3%A1cil.jpg",
    top: true
  });
  const coffee = new Product({
    name: "café",
    price: 1.50,
    description: "dofhaodfhaofdfsadfsah",
    category: "cafeteria",
    stock: 20,
    slug: "cafe",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
    top: false
  });
  products.push(bread, coffee);
  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
