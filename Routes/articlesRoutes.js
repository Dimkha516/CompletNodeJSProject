const express = require("express");
const {
  createArticle,
  getArticles,
  getArticle,
  getMinPrices,
  getMaxPrices,
  updateArticle,
  deleteArticle,
  nombreVenteArticle,
} = require("../Controllers/articlesControllers");
const articlesRouter = express.Router();

// GETS:
articlesRouter.get("/", getArticles);
articlesRouter.post("/minPrices", getMinPrices);
articlesRouter.post("/maxPrices", getMaxPrices);
articlesRouter.delete("/:id", deleteArticle);
articlesRouter.put("/:id", updateArticle);
articlesRouter.get("/ventesArticle/", nombreVenteArticle);
articlesRouter.get("/:id", getArticle);
articlesRouter.post("/", createArticle);

module.exports = articlesRouter;
