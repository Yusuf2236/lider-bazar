const express = require("express");
const router = express.Router();
const controller = require("../controllers/couriers.controller");

router.post("/", controller.createCourier);
router.get("/", controller.getCouriers);

module.exports = router;
