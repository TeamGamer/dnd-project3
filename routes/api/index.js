const router = require("express").Router();
const characterRoutes = require("./characters");

router.use("/characters", characterRoutes);

module.exports = router;
