const router = require("express").Router();
const routes = require("./routes");

// Routes
router.use("/routes", routes);

module.exports = router;
