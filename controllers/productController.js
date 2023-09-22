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
  const product = await Product.find({ slug: req.params.id });
  const products = await Product.find({
    category: product[0].category,
    slug: { $ne: req.params.id },
  });

  return res.json({ product, products });
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
      } else {
        console.log("No image from front");
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

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
      auth: {
        persistSession: false,
      },
    });
    const { data, error } = await supabase.storage.from("products").remove([`${image}`]);
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
  create,
  store,
  edit,
  update,
  destroy,
};
