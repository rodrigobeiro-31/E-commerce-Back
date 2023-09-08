const publicRoutes = require("./publicRoutes");
// const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  // app.use("/usuarios", userRoutes);
  app.use("/", publicRoutes);
};
