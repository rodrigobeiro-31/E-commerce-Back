const Product = require("../models/Product");
const mongoose = require("mongoose");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const { createClient } = require("@supabase/supabase-js");

async function index(req, res) {
  const products = await Product.find();
  let filteredProducts = products;

  if (req.params.category === "top") {
    filteredProducts = products.filter((product) => product.top === true);
    return res.json(filteredProducts);
  }
  if (req.params.category !== "All") {
    filteredProducts = products.filter((product) => product.category === req.params.category);
    return res.json(filteredProducts);
  }
  return res.json(filteredProducts);
}

async function show(req, res) {
  try {
    const product = await Product.find({ slug: req.params.id });
    const products = await Product.find({
      category: product[0].category,
      slug: { $ne: req.params.id },
    });
    return res.json({ product, products });
  } catch (error) {
    return res.json(error);
  }
}

async function showAdmin(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.json(error);
  }
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
      auth: {
        persistSession: false,
      },
    });
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      const ext = path.extname(files.image.filepath);
      const newFileName = `image_${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from("products")
        .upload(newFileName, fs.createReadStream(files.image.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.image.mimetype,
          duplex: "half",
        });
      fields.image = newFileName;
      const resp = await Product.insertMany({ ...fields });
    });
    res.json("ok");
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const id = req.params.id;
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    auth: {
      persistSession: false,
    },
  });
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });
  try {
    form.parse(req, async (err, fields, files) => {
      if (files.image) {
        const ext = path.extname(files.image.filepath);
        const newFileName = `image_${Date.now()}${ext}`;

        const { data, error } = await supabase.storage
          .from("products")
          .upload(newFileName, fs.createReadStream(files.image.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.image.mimetype,
            duplex: "half",
          });

        fields.image = newFileName;
      }
      const resp = await Product.findByIdAndUpdate(id, { ...fields });
    });
  } catch (error) {
    console.log("error-in save image o filds for front");
    res.json({ error });
  }
  res.json("ok");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const id = req.params.id;
    const image = req.body.image;
    const dbImages = [
      "espresso.png",
      "capuccino.png",
      "hot-chocolate.png",
      "orange-chocolate-cake.png",
      "apple-pie.png",
      "carrot-cake.png",
      "pastafrola.png",
      "strawberry-cheesecake.png",
      "baguette.png",
      "croissant.png",
      "quince-pastry.png",
      "bougnat.png",
      "danish.png",
      "apple-roll.png",
      "cinnamon-roll.png",
      "wholegrain-bread.png",
      "macatia.png",
      "dark-roast-coffee.png",
      "medium-roast-coffee.png",
      "light-roast-coffee.png",
    ];

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
      auth: {
        persistSession: false,
      },
    });

    if (!dbImages.includes(image)) {
      const { data, error } = await supabase.storage.from("products").remove([`${image}`]);
    }
    const resMongo = await Product.findByIdAndDelete(id); // elimina un producto
  } catch (error) {
    return res.json(error);
  }
  return res.json("ok");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  showAdmin,
  create,
  store,
  edit,
  update,
  destroy,
};
