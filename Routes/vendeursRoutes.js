const express = require("express");
const {
  getVendeurs,
  addVendeur,
} = require("../Controllers/vendeursControllers");
const vendeurRouter = express.Router();

vendeurRouter.get("/", getVendeurs);
vendeurRouter.post("/", addVendeur);

module.exports = vendeurRouter;
