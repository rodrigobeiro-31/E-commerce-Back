const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/", publicRoutes);

};
