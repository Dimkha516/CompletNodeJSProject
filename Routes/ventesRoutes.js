const express = require("express");
const { getVentes, addVente } = require("../Controllers/ventesControllers");
const venteRouter = express.Router();

venteRouter.get("/", getVentes);
venteRouter.post("/", addVente);

module.exports = venteRouter;
