const express = require("express");
const router = express.Router();
const controller = require("../controllers/orders.controller");

router.post("/", controller.createOrder);
router.get("/", controller.getOrders);
router.put("/:id/assign", controller.assignCourier);
router.put("/:id/status", controller.updateStatus);

module.exports = router;
