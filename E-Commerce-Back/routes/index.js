const publicRoutes = require("./publicRoutes");
const productRoutes = require("./productRoutes");
// const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  // app.use("/usuarios", userRoutes);
  app.use("/products", productRoutes);
  app.use("/", publicRoutes);
};
