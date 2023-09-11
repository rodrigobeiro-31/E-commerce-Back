const { faker, LoremModule } = require("@faker-js/faker");
const Product = require("../models/Product");

faker.locale = "es";

module.exports = async () => {
  const products = [{
    name: "Espresso",
    price: 2.10,
    description: "",
    category: "Cafe",
    stock: 10,
    slug: "espresso",
    image: "",
    top: true
  },
  {
    name: "Capuccino",
    price: 2.50,
    description: "",
    category: "Cafe",
    stock: 20,
    slug: "capuccino",
    image: "",
    top: false
  },
  {
    name: "Hot chocolate",
    price: 3.00,
    description: "",
    category: "Cafe",
    stock: 20,
    slug: "hot-chocolate",
    image: "",
    top: false
  },
  {
    name: "Hot chocolate",
    price: 3.00,
    description: "",
    category: "Cafe",
    stock: 9,
    slug: "hot-chocolate",
    image: "",
    top: false
  },
  {
    name: "Orange chocolate cake",
    price: 10.10,
    description: "",
    category: "Cakes",
    stock: 12,
    slug: "orange-chocolate-cake",
    image: "",
    top: false
  },
  {
    name: "Apple pie",
    price: 15.50,
    description: "",
    category: "Cakes",
    stock: 8,
    slug: "apple-pie",
    image: "",
    top: false
  },
  {
    name: "Carrot cake",
    price: 17.50,
    description: "",
    category: "Cakes",
    stock: 14,
    slug: "carrot-cake",
    image: "",
    top: false
  },
  {
    name: "Pastafrola",
    price: 16.10,
    description: "",
    category: "Cakes",
    stock: 37,
    slug: "pastafrola",
    image: "",
    top: false
  },
  {
    name: "Strawberry cheesecake",
    price: 20.00,
    description: "",
    category: "Cakes",
    stock: 29,
    slug: "strawberry-cheesecake",
    image: "",
    top: false
  },
  {
    name: "Lemon pie",
    price: 18.30,
    description: "",
    category: "Cakes",
    stock: 25,
    slug: "lemon-pie",
    image: "",
    top: false
  },
  {
    name: "Baguette",
    price: 3.90,
    description: "",
    category: "Bakery",
    stock: 20,
    slug: "baguette",
    image: "",
    top: false
  },
  {
    name: "Croissant",
    price: 1.60,
    description: "",
    category: "Bakery",
    stock: 27,
    slug: "croissant",
    image: "",
    top: true
  },
  {
    name: "Quince Pastry",
    price: 2.00,
    description: "",
    category: "Bakery",
    stock: 24,
    slug: "quince-pastry",
    image: "",
    top: false
  },
  {
    name: "Bougnat bread",
    price: 2.10,
    description: "",
    category: "Bakery",
    stock: 34,
    slug: "bougnat-bread",
    image: "",
    top: false
  },
  {
    name: "Danish",
    price: 3.30,
    description: "",
    category: "Bakery",
    stock: 20,
    slug: "danish",
    image: "",
    top: false
  },
  {
    name: "Apple roll",
    price: 2.50,
    description: "",
    category: "Bakery",
    stock: 50,
    slug: "apple-roll",
    image: "",
    top: true
  },
  {
    name: "Cinnamon roll",
    price: 2.50,
    description: "",
    category: "Bakery",
    stock: 45,
    slug: "cinnamon-roll",
    image: "",
    top: false
  },
  {
    name: "Wholegrain bread",
    price: 5.40,
    description: "",
    category: "Bakery",
    stock: 30,
    slug: "wholegrain-bread",
    image: "",
    top: false
  },
  {
    name: "Macatia bread",
    price: 4.80,
    description: "",
    category: "Bakery",
    stock: 30,
    slug: "macatia-bread",
    image: "",
    top: false
  },
  {
    name: "Vanilla muffin",
    price: 1.80,
    description: "",
    category: "Bakery",
    stock: 30,
    slug: "vanilla-muffin",
    image: "",
    top: true
  },
  {
    name: "Dark roast coffee beans",
    price: 8.90,
    description: "",
    category: "Coffee beans",
    stock: 30,
    slug: "dark-roast-coffee",
    image: "",
    top: false
  },
  {
    name: "Medium roast coffee beans",
    price: 8.90,
    description: "",
    category: "Coffee beans",
    stock: 30,
    slug: "medium-roast-coffee",
    image: "",
    top: true
  },
  {
    name: "Light roast coffee beans",
    price: 8.90,
    description: "",
    category: "Coffee beans",
    stock: 30,
    slug: "light-roast-coffee",
    image: "",
    top: false
  },
  
];
  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
