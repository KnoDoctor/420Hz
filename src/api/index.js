const express = require("express");

const { Router } = express;
const router = new Router();

const user = require("./user");
const session = require("./session");
const station = require("./station");

router.use("/api/users", user);
router.use("/api/sessions", session);
router.use("/api/stations", station);

module.exports = router;
