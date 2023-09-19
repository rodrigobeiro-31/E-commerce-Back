const Product = require("../models/Product");
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
    console.log("fields:", fields);
    console.log("files:", files);
    console.log("filepath=>", files.image.filepath);
    const ext = path.extname(files.image.filepath);
    const newFileName = `image_${Date.now()}${ext}`;
    const { data, error } = await supabase.storage
      .from("products")
      .upload(newFileName, fs.createReadStream(files.image.filepath), {
        cacheControl: "3600",
        upsert: false,
        contentType: files.image.mimetype,
      });
// const product = await Product.create({  
//   name: fields.name,
//   price:fields.price,
//   description: fields.description,
//   category: fields.category,
//   stock: fields.stock,
//   // slug: fields.slug,
//   image: fields.image,
//   top: fields.top,})
    
  });
  // const model = req.params.model;
  // const form = formidable({
  //   multiples: true,
  //   keepExt: true,
  //   directory: "",
  // });

  // form.parse(req, async (err, fields, files) => {
  //   console.log("Aca esta fields", fields);
  //   console.log("Aca esta files", files);
  //   const image = files.image;
  //   const imagePath = image.image.filepath;
  //   const ext = path.extname(files.imagePath);
  //   console.log("imagepath", imagePath);
  //   const newFileName = `image_${Date.now()}${ext}`;
  //   const { data, error } = await supabase.storage
  //     .from("products")
  //     .upload(newFileName, fs.createReadStream(files.products.filepath), {
  //       cacheControl: "3600",
  //       upsert: false,
  //       contentType: files.products.mimetype,
  //     });
  //   // ...
  // });

  // form.parse(req, (err, fields, files) => {
  //   console.log("fields:", fields);
  //   console.log("files:", files);

  //   const image = files.image;
  //   const imagePath = image.filepath;
  //   // Obtén la extensión del archivo original
  //   const fileExtension = image.originalFilename.split(".").pop();
  //   // Genera un nombre único para el archivo
  //   const uniqueFileName = `${Date.now()}.${fileExtension}`;
  //   // Construye la ruta completa del archivo en el disco
  //   const directorioDestino = path.join(__dirname, "../public/imgs/product"); // Dos niveles arriba del __dirname
  //   const archivoDestino = path.join(directorioDestino, uniqueFileName);
  //   // fs.rename(imagePath, archivoDestino, (err) => {
  //   //   if (err) {
  //   //     res.status(500).json({ error: "Error al guardar la imagen en el disco" });
  //   //     return;
  //   //   }
  //   // });
  //   fields.image = archivoDestino;
  //   console.log("afuera de la func =>", fields);

  // });
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

// Update the specified resource in storage.router.patch("/:model/:id/:patch", adminController.update

async function update(req, res) {
  const update = req.body.sendInfo;
  const data = req.params;
  const model = req.params.model;
  const id = req.params.id;
  console.log({ data, update, id });
  const Modelo = mongoose.model(model);
  const resp = await Modelo.findByIdAndUpdate(id, update);
  res.json({ resp });
}

module.exports = {
  index,
  create,
  tokens,
  store,
  edit,
  update,
  destroy,
};
