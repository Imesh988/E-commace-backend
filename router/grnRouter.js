const express = require("express");
const router = express.Router();

const grnController = require("../controller/grnController");

router.post("/create",grnController.grnCreate);
router.get("/all",grnController.getAllGrn);
router.get("/text/:text",grnController.getGrnText);
router.put("/update/:grnId",grnController.grnUpdate);
router.delete("/delete/:grnId",grnController.grnDelete);

module.exports = router;