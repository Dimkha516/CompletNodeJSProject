const express = require("express");
const {
  createArticle,
  getArticles,
  getArticle,
  getMinPrices,
  getMaxPrices,
  updateArticle,
  deleteArticle,
} = require("../Controllers/articlesControllers");
const articlesRouter = express.Router();

// GETS:
articlesRouter.get("/", getArticles);
articlesRouter.get("/minPrices/", getMinPrices);
articlesRouter.get("/getMaxPrices/", getMaxPrices);
articlesRouter.delete("/:id", deleteArticle);
articlesRouter.put("/:id", updateArticle);
articlesRouter.get("/:id", getArticle);
articlesRouter.post("/", createArticle);


module.exports = articlesRouter;
