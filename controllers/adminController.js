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

async function index(req, res) {
  try {
    const admins = await Admin.find();
    const filteredAdmins = admins.filter((admin) => admin.email !== "admin@doppios.com");
    return res.json(filteredAdmins);
  } catch (error) {
    res.json(error);
  }
}
async function show(req, res) {
  const admin = await Admin.findById(req.params.id);
  return res.json(admin);
}

async function destroy(req, res) {
  try {
    await Admin.findByIdAndRemove(req.params.id);
    return res.json("Admin deleted");
  } catch (error) {
    return res.json(error);
  }
}

async function create(req, res) {}

async function store(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    admin: true,
  });
  await admin.save();
  return res.json(admin);
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

  const email = process.env.MAIL;
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
  try {
    const id = { _id: req.params.id };
    const update = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };
    const admin = await Admin.findOneAndUpdate(id, update, { returnOriginal: false });

    if (req.body.password.length > 0) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updatePass = await Admin.findOneAndUpdate(
        id,
        {
          password: hashedPassword,
        },
        { returnOriginal: false },
      );
    }

    return res.json("Usuario actualizado");
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

module.exports = {
  index,
  show,
  create,
  contact,
  store,
  edit,
  update,
  destroy,
};
