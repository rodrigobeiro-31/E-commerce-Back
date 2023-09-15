const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/order", orderRoutes);
  app.use("/users", userRoutes);
  app.use("/admin", adminRoutes);
  app.use("/", publicRoutes);
};
