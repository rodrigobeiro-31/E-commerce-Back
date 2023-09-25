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
const Mail = require("../accessories/mailsender");

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
  try {
    console.log(req.params);
    const model = req.params.model;
    const id = req.params.id;
    const image = req.params.image;

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { data, error } = await supabase.storage.from("products").remove([`${image}`]);
    const Model = mongoose.model(model);
    const resMongo = await Model.findByIdAndDelete(id); // elimina un producto

    console.log(resMongo, data);
  } catch (error) {
    return res.json(error);
  }
  return res.json("ok");
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
async function contact(req, res) {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const direction = req.body.direction;
  const affaire = req.body.affaire;
  const options = req.body.options;

  const email = "info.doppios@gmail.com";
  const clave = "";
  const subjet = "de Contact-Page";
  const html = `<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <link rel="icon" type="image/svg+xml" href="/vite.svg" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <link
         href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
         rel="stylesheet"
         integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
         crossorigin="anonymous"
       />
     </head> 
   <body>
     <h1> Client: ${firstname} ${lastname} </h1>
     <h2>${affaire}</h2>
     <h2 >${phone} </h2>
     <h4>${direction}  </h4>
     <h4> ${options}</h4>

    
     <h3>Thank you, we are waiting for you at Doppio's!!!</h3>
     </body>
 </html>`;

  Mail(email, clave, subjet, html);
  res.json("ok");
}
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
      if (files.image) {
        console.log({ files });
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
  contact,
  tokens,
  store,
  edit,
  update,
  destroy,
};
