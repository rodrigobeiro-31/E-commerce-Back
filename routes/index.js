const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
// const privateRoutes = require("./privateRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  // app.use("/usuarios", userRoutes);
  app.use("/products", productRoutes);
  app.use("/users", userRoutes);
  app.use("/admin", adminRoutes);
  app.use("/", publicRoutes);
};
