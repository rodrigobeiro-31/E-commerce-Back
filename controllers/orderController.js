const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Display a listing of the resource.
async function index(req, res) {
  const orders = await Order.find();
  return res.json(orders);
}

// Display the specified resource.
async function show(req, res) {
  const orders = await Order.find({ userId: req.params.id });
  return res.json({ orders });
}

async function lastOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
    return res.json({ orders });
  } catch (err) {
    console.log(err);
  }
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const { cart, orderPrice, orderId } = req.body;
  const userId = req.auth.sub;
  const email = req.auth.email;

  for (const product of cart) {
    const productId = product._id;
    const quantity = product.quantity;
    await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
  }

  const productsSelected = [];
  for (const product of cart) {
    const newProduct = {
      name: product.name,
      quantity: product.quantity,
      price: product.totalPrice,
    };
    productsSelected.push(newProduct);
  }

  const order = await new Order({
    _id: orderId,
    userEmail: email,
    userId: userId,
    cart: productsSelected,
    status: "Pending",
    totalPrice: orderPrice,
  });
  await order.save();

  const user = await User.findById(userId);
  user.orders.push(orderId);
  await user.save();

  return res.json(order);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
  return res.json(order);
}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  lastOrders,
  create,
  store,
  edit,
  update,
  destroy,
};
