const Product = require("../models/Product");
const Admin = require("../models/Admin");
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const { createClient } = require("@supabase/supabase-js");

async function tokens(req, res) {
  try {
    console.log("paso por crate");
    const token = req.body;
    res.json({ token });
  } catch (error) {
    res.json(error);
  }
}

async function indexAdmin(req, res) {
  try {
    const admins = await Admin.find();
    const filteredAdmins = admins.filter((admin) => admin.email !== "admin@doppios.com");
    console.log(filteredAdmins);
    return res.json(filteredAdmins);
  } catch (error) {
    res.json(error);
  }
}

async function index(req, res) {
  try {
    const data = req.params;
    const model = data.params;
    const Modelo = mongoose.model(model);
    const resp = await Modelo.find();
    res.json(resp);
  } catch (error) {
    res.json(error);
  }
}

async function destroy(req, res) {
  console.log("entre a destroy");
  try {
    console.log(req.params);
    const model = req.params.model;
    const id = req.params.id;
    const image = req.params.image;

    console.log(model, id);
    const { data, error } = await supabase.storage.from("products").remove([`${image}`]);
    const Model = mongoose.model(model);
    const resMongo = await Model.findByIdAndDelete({ id }); // elimina un producto

    console.log(resMongo, data);
  } catch (error) {
    res.json(error);
  }
  res.json("ok");
}

async function create(req, res) {
  try {
    const model = req.params.model;

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
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
        });
      fields.image = newFileName;
      const Modelo = mongoose.model(model);
      const resp = await Modelo.insertMany({ ...fields });

      console.log(resp);
    });

    res.json("ok");
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

async function store(req, res) {
  console.log(req.params);
  const model = req.params.model;
  const id = req.params.id;
  console.log(model, id);
  const Model = mongoose.model(model);
  const resp = await Model.findByIdAndUpdate(id, { $inc: { stock: +1 } }, { new: true }); // Utiliza $inc para sumar en 1
  res.json({ resp });
}
//store guarda nuevos productos y create crea a nuevos usuarios.

// Show the form for editing the specified resource.
async function edit(req, res) {}

async function update(req, res) {
  const model = req.params.model;
  const id = req.params.id;

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });
  try {
    form.parse(req, async (err, fields, files) => {
      if (files.image.size > 0) {
        console.log({ files });
        const ext = path.extname(files.image.filepath);
        const newFileName = `image_${Date.now()}${ext}`;

        const { data, error } = await supabase.storage
          .from("products")
          .upload(newFileName, fs.createReadStream(files.image.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.image.mimetype,
          });

        fields.image = newFileName;
      } else {
        console.log("No image from front");
      }

      const Modelo = mongoose.model(model);
      const resp = await Modelo.findByIdAndUpdate(id, { ...fields });
      console.log(resp);
    });
  } catch (error) {
    console.log("error-in save image o filds for front");
    res.json({ error });
  }
  res.json("ok");
}

module.exports = {
  indexAdmin,
  index,
  create,
  tokens,
  store,
  edit,
  update,
  destroy,
};
