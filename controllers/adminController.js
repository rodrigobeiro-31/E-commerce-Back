const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");
const url = require("url");

async function tokens(req, res) {
  console.log("paso por crate");
  const token = req.body;
  res.json({ token });
}

async function index(req, res) {
  const data = req.params;
  const model = data.params;
  const Modelo = mongoose.model(model);
  const resp = await Modelo.find();
  res.json(resp);
}

async function create(req, res) {
  const data = req.params;
  const model = data.params;
  const Modelo = mongoose.model(model);
  const resp = await Modelo.find();

  const url1 = new URL(window.location.href);
  console.log(url);
  // Obtén los parámetros de la URL
  const paramIn = new URLSearchParams(url1.search);
  console.log(paramIn);
  const valor = paramIn.get("valor"); // Devuelve "valor1"
  res.json(valor);
}

// async function showTop(req, res) {
//   const products = await Product.find({ top: true });
//   res.json(products);
// }

// async function show(req, res) {
//   const product = await Product.find({ slug: req.params.id });
//   const products = await Product.find({
//     category: product[0].category,
//     slug: { $ne: req.params.id },
//   });

//   res.json({ product, products });
// }

// Show the form for creating a new resource

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

  tokens,
  // showTop,
  // show,
  create,
  store,
  edit,
  update,
  destroy,
};
