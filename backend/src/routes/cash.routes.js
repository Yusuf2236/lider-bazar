const express = require("express");
const router = express.Router();
const controller = require("../controllers/cash.controller");

router.post("/close", controller.closeCash);
router.get("/", controller.getDailyStats);

module.exports = router;
