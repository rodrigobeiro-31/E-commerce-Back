const { faker, LoremModule } = require("@faker-js/faker");
const Product = require("../models/Product");

faker.locale = "es";

module.exports = async () => {
  const products = [{
    name: "Espresso",
    price: 2.10,
    description: "Our Espresso is a bold and rich coffee experience, meticulously crafted to perfection. Its intense flavor and aromatic profile make it the perfect choice for those who crave a powerful caffeine kick.",
    category: "Cafe",
    stock: 10,
    slug: "espresso",
    image: "/imgs/products/espresso.png",
    top: true
  },
  {
    name: "Capuccino",
    price: 2.50,
    description: "Experience the perfect balance of espresso, steamed milk, and velvety foam in our Cappuccino. Its smooth and creamy texture combined with a shot of espresso creates a delightful, comforting drink.",
    category: "Cafe",
    stock: 20,
    slug: "capuccino",
    image: "/imgs/products/capuccino.png",
    top: false
  },
  {
    name: "Hot chocolate",
    price: 3.00,
    description: "Indulge in the warmth and sweetness of our Hot Chocolate. Made with the finest cocoa, it's a cozy and decadent treat that will satisfy your chocolate cravings.",
    category: "Cafe",
    stock: 20,
    slug: "hot-chocolate",
    image: "/imgs/products/hot-chocolate.png",
    top: false
  },
  {
    name: "Orange chocolate cake",
    price: 10.10,
    description: "Our Orange Chocolate Cake is a harmonious blend of zesty orange and rich chocolate. Each bite is a burst of delightful flavors, making it a dessert you won't forget.",
    category: "Cakes",
    stock: 12,
    slug: "orange-chocolate-cake",
    image: "/imgs/products/orange-chocolate-cake.png",
    top: false
  },
  {
    name: "Apple pie",
    price: 15.50,
    description: "Enjoy the classic taste of home-baked goodness with our Apple Pie. Crisp, golden crust encases tender apple slices, all spiced to perfection for a timeless favorite.",
    category: "Cakes",
    stock: 8,
    slug: "apple-pie",
    image: "/imgs/products/apple-pie.png",
    top: false
  },
  {
    name: "Carrot cake",
    price: 17.50,
    description: "Moist and spiced to perfection, our Carrot Cake is a delightful combination of sweet and earthy flavors. Topped with cream cheese frosting, it's a delectable treat for any occasion.",
    category: "Cakes",
    stock: 14,
    slug: "carrot-cake",
    image: "/imgs/products/carrot-cake.png",
    top: false
  },
  {
    name: "Pastafrola",
    price: 16.10,
    description: "Our Quince Pastafrola is a traditional Argentine pastry filled with sweet quince paste. Its buttery, crumbly crust pairs perfectly with the sweet fruit filling.",
    category: "Cakes",
    stock: 37,
    slug: "pastafrola",
    image: "/imgs/products/pastafrola.png",
    top: false
  },
  {
    name: "Strawberry cheesecake",
    price: 20.00,
    description: "Indulge in the creamy richness of our Strawberry Cheesecake. With a buttery graham cracker crust and a luscious strawberry topping, it's a slice of heaven.",
    category: "Cakes",
    stock: 29,
    slug: "strawberry-cheesecake",
    image: "/imgs/products/strawberry-cheesecake.png",
    top: false
  },
  {
    name: "Baguette",
    price: 3.90,
    description: "Our Baguette is a classic French bread, known for its crisp crust and soft, airy interior. It's the ideal companion for soups, sandwiches, or a simple spread of butter.",
    category: "Bakery",
    stock: 20,
    slug: "baguette",
    image: "/imgs/products/baguette.png",
    top: false
  },
  {
    name: "Croissant",
    price: 1.60,
    description: "Experience the buttery, flaky goodness of our Croissant. Whether enjoyed plain or filled with your favorite ingredients, it's a pastry that's sure to satisfy.",
    category: "Bakery",
    stock: 27,
    slug: "croissant",
    image: "/imgs/products/croissant.png",
    top: true
  },
  {
    name: "Quince Pastry",
    price: 2.00,
    description: "Our Quince Pastry is a sweet and indulgent treat, featuring a delicate pastry filled with luscious quince jam. It's a delightful way to savor this classic fruit.",
    category: "Bakery",
    stock: 24,
    slug: "quince-pastry",
    image: "/imgs/products/quince-pastry.png",
    top: false
  },
  {
    name: "Bougnat bread",
    price: 2.10,
    description: "Bougnat Bread is a rustic, hearty loaf with a thick crust and a chewy, flavorful interior. Its robust taste is perfect for those who appreciate artisanal bread.",
    category: "Bakery",
    stock: 34,
    slug: "bougnat-bread",
    image: "/imgs/products/bougnat.png",
    top: false
  },
  {
    name: "Danish",
    price: 3.30,
    description: "Our Danish pastries are a delicate blend of flaky layers and sweet fillings. Each bite is a delectable experience that pairs perfectly with your morning coffee.",
    category: "Bakery",
    stock: 20,
    slug: "danish",
    image: "/imgs/products/danish.png",
    top: false
  },
  {
    name: "Apple roll",
    price: 2.50,
    description: "Satisfy your sweet tooth with our Apple Roll, a swirl of cinnamon-spiced apples wrapped in a tender pastry. It's a comforting dessert or snack option.",
    category: "Bakery",
    stock: 50,
    slug: "apple-roll",
    image: "/imgs/products/apple-roll.png",
    top: true
  },
  {
    name: "Cinnamon roll",
    price: 2.50,
    description: "Our Cinnamon Roll is a gooey, cinnamon-infused delight, generously drizzled with icing. Warm it up for a heavenly treat that's perfect any time of day.",
    category: "Bakery",
    stock: 45,
    slug: "cinnamon-roll",
    image: "/imgs/products/cinnamon-roll.png",
    top: false
  },
  {
    name: "Wholegrain bread",
    price: 5.40,
    description: "Our Wholegrain Bread is a healthy choice, packed with wholesome grains and seeds. It's a hearty and nutritious option for those seeking a balanced diet.",
    category: "Bakery",
    stock: 30,
    slug: "wholegrain-bread",
    image: "/imgs/products/wholegrain-bread.png",
    top: false
  },
  {
    name: "Macatia bread",
    price: 4.80,
    description: "Macatia Bread is a unique and flavorful bread featuring coconut and vanilla notes. It's a delicious choice for a tropical twist on your daily bread.",
    category: "Bakery",
    stock: 30,
    slug: "macatia-bread",
    image: "/imgs/products/macatia.png",
    top: false
  },
  {
    name: "Dark roast coffee beans",
    price: 8.90,
    description: "Our Dark Roast Coffee Beans offer an intense, bold flavor with rich, smoky undertones. Perfect for those who prefer a robust coffee experience.",
    category: "Coffee beans",
    stock: 30,
    slug: "dark-roast-coffee",
    image: "/imgs/products/dark-roast-coffee.png",
    top: false
  },
  {
    name: "Medium roast coffee beans",
    price: 8.90,
    description: "Enjoy the perfect balance of flavor and aroma with our Medium Roast Coffee Beans. They deliver a well-rounded, satisfying cup of coffee.",
    category: "Coffee beans",
    stock: 30,
    slug: "medium-roast-coffee",
    image: "/imgs/products/medium-roast-coffee.png",
    top: true
  },
  {
    name: "Light roast coffee beans",
    price: 8.90,
    description: "Our Light Roast Coffee Beans provide a bright and lively coffee experience, showcasing the beans' natural flavors. A great choice for those who appreciate subtlety in their brew.",
    category: "Coffee beans",
    stock: 30,
    slug: "light-roast-coffee",
    image: "/imgs/products/light-roast-coffee.png",
    top: false
  },
  
];
  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
