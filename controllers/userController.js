const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.find();
  res.json(users);
}

// Display the specified resource.
async function show(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  await user.save();
  return res.json(user);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const id = { _id: req.params.id };
  const update = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  const user = await User.findOneAndUpdate(id, update, { returnOriginal: false });

  if (req.body.password.length > 0) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatePass = await User.findOneAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { returnOriginal: false },
    );
  }

  return res.json("Usuario actualizado");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  console.log(req.params);
  await User.findByIdAndRemove(req.params.id);
  res.json("Usuario eliminado!");
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
