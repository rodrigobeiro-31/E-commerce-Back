const Product = require("../models/Product");

async function index(req, res) {
  const products = await Product.find();
  const topProducts = await Product.find({ top: true });
  res.json({ products, topProducts });
}

async function show(req, res) {
  const product = await Product.find({ slug: req.params.id });
  const products = await Product.find({
    category: product[0].category,
    slug: { $ne: req.params.id },
  });

  res.json({ product, products });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

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
