const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Display a listing of the resource.
async function index(req, res) { }

// Display the specified resource.
async function show(req, res) { }

// Show the form for creating a new resource
async function create(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) {
  const { cart, orderPrice, orderId } = req.body;
  const userId = req.auth.sub;
  const email = req.auth.email;
  const products = [];

  for (const product of cart) {
    const newProduct = {
      name: product.name,
      quantity: product.quantity,
      price: product.totalPrice,
    };
    products.push(newProduct);
  };

  const order = await new Order({
    _id: orderId,
    user: { userId, email },
    cart: products,
    status: "Received",
    totalPrice: orderPrice,
  });
  await order.save();

  const user = await User.findById(userId);
  user.orders.push(orderId);
  await user.save();

  return res.json(order);
}

// Show the form for editing the specified resource.
async function edit(req, res) { }

// Update the specified resource in storage.
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) { }

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
