const express = require("express");
const {
  getVentes,
  addVente,
  getVenteByDate,
  totalVente,
} = require("../Controllers/ventesControllers");
const venteRouter = express.Router();

venteRouter.get("/", getVentes);
// venteRouter.get("/venteDate", getVenteByDate);
venteRouter.get("/totalVente", totalVente);
venteRouter.post("/", addVente);

module.exports = venteRouter;
