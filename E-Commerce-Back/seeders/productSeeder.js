const { faker, LoremModule } = require("@faker-js/faker");
const Product = require("../models/Product");

faker.locale = "es";

module.exports = async () => {
  const products = [{
    name: "Pan flauta",
    price: 2.10,
    description: "Sumérgete en la auténtica experiencia culinaria con nuestro exquisito Pan Flauta Artesanal. Elaborado con pasión y cuidado siguiendo recetas de panadería centenarias, este pan te transportará a la tradición y el sabor inigualable de la panadería de antaño.",
    category: "panaderia",
    stock: 10,
    slug: "pan-flauta",
    image: "./img/baguette.png",
    top: true
  },
  {
    name: "Espresso",
    price: 1.50,
    description: "Nuestro Espresso Premium es una obra de arte en cada taza, una invitación a un mundo de sabores profundos y aromas cautivadores. Cada sorbo de este elixir oscuro es una experiencia sensorial que te transportará a los rincones más apasionantes de la cultura del café.",
    category: "cafeteria",
    stock: 20,
    slug: "espresso",
    image: "./img/espresso.jpg",
    top: false
  },
];
  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
