const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
// const privateRoutes = require("./privateRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  // app.use("/usuarios", userRoutes);
  app.use("/products", productRoutes);
  app.use("/users", userRoutes);
  app.use("/", publicRoutes);
};
