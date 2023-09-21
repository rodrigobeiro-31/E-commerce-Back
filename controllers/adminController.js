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
  console.log("paso por crate");
  const token = req.body;
  res.json({ token });
}

async function indexAdmin(req, res) {
  const admins = await Admin.find();
  const filteredAdmins = admins.filter((admin) => admin.email !== "admin@doppios.com");
  console.log(filteredAdmins);
  return res.json(filteredAdmins);
}
async function index(req, res) {
  const data = req.params;
  const model = data.params;
  const Modelo = mongoose.model(model);
  const resp = await Modelo.find();
  res.json(resp);
}

async function destroy(req, res) {
  console.log(req.params);
  const model = req.params.model;
  const id = req.params.id;
  console.log(model, id);
  const Model = mongoose.model(model);
  const resp = await Model.findByIdAndUpdate(id, { $inc: { stock: -1 } }, { new: true }); // Utiliza $inc para decrementar en 1
  res.json({ resp });
}

async function create(req, res) {
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
  // const update = req.body.sendInfo;
  // const data = req.params;
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
    const resp = await Modelo.findByIdAndUpdate(id, { ...fields });

    console.log(resp);
  });
  res.json("ok");
}
// Update the specified resource in storage.router.patch("/:model/:id/:patch", adminController.update

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
