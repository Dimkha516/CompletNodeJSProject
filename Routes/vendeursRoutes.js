const express = require("express");
const {
  getVendeurs,
  addVendeur,
  getVendeur,
  updateVendeur,
  deleteVendeur,
  ventesVendeur,
} = require("../Controllers/vendeursControllers");
const vendeurRouter = express.Router();

vendeurRouter.get("/", getVendeurs);
vendeurRouter.put("/:id", updateVendeur);
vendeurRouter.get("/ventesVendeur/", ventesVendeur);
vendeurRouter.get("/:id", getVendeur);
vendeurRouter.delete("/:id", deleteVendeur);
vendeurRouter.post("/", addVendeur); 

module.exports = vendeurRouter;
