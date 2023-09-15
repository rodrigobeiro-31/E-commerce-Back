const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
// const privateRoutes = require("./privateRoutes");
const authRoutes = require("./authRoutes");
const orderRoutes = require("./orderRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  // app.use("/usuarios", userRoutes);
  app.use("/products", productRoutes);
  app.use("/order", orderRoutes);
  app.use("/", publicRoutes);
};
