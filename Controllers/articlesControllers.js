const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.createArticle = async (req, res) => {
  const { libelle, prix, stock } = req.body;
  try {
    const newArticle = await prisma.Article.create({
      data: { libelle, prix, stock },
    });
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: "Erreur création article " + err });
  }
};

module.exports.getArticles = async (req, res) => {
  const articles = await prisma.Article.findMany();

  articles
    ? res.status(200).json(articles)
    : res.status(400).json({ message: "Aucun article trouvé" });
};

module.exports.getArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);
  if (!articleId) {
    return res.status(401).json({ message: "Id Article invalide" });
  }

  const article = await prisma.Article.findUnique({
    where: { id: articleId },
  });
  article
    ? res.status(200).json(article)
    : res.status(400).json({ message: "Article non trouvé" });
};

module.exports.updateArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);
  if (!articleId) {
    return res.status(400).json({ message: "Id article invalide" });
  }

  try {
    const articleToUpdate = await prisma.Article.update({
      where: { id: articleId },
      data: { libelle: req.body.libelle },
    });
    res.status(200).json({ message: "Article mis à jour avec succès !" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur modification libellé article " + err });
  }
};

module.exports.deleteArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);
  if (!articleId) {
    return res.status(400).json({ message: "Id article invalide" });
  }

  const articleToDelete = await prisma.Article.delete({
    where: { id: articleId },
  });
  res.status(200).json({ message: "Article supprimé avec succès !" });
};

module.exports.getMinPrices = async (req, res) => {
  const { intervalValue } = req.body;
  if (intervalValue <= 0) {
    return res.status(400).json({ message: "Interval de prix invalide !" });
  }

  try {
    const correspondArticles = await prisma.Article.findMany({
      where: {
        prix: {
          lte: intervalValue,
        },
      },
    });
    if (correspondArticles.length > 0) {
      res.status(200).json(correspondArticles);
    } else {
      res
        .status(202)
        .json({ message: "Aucun produit n'est dans cette intervalle de prix" });
    }
  } catch (err) {
    res.status(400).json({ message: "erreur interval de prix: " + err });
  }
};

module.exports.getMaxPrices = async (req, res) => {
  const { intervalValue } = req.body;
  if (intervalValue <= 0) {
    return res.status(400).json({ message: "Interval de prix invalide !" });
  }

  try {
    const correspondArticles = await prisma.Article.findMany({
      where: {
        prix: {
          gte: intervalValue,
        },
      },
    });
    if (correspondArticles.length > 0) {
      res.status(200).json(correspondArticles);
    } else {
      res
        .status(202)
        .json({ message: "Aucun produit n'est dans cette intervalle de prix" });
    }
  } catch (err) {
    res.status(400).json({ message: "erreur interval de prix: " + err });
  }
};

module.exports.nombreVenteArticle = async (req, res) => {
  const { articleId } = req.body;
  if (!articleId) {
    return res.status(400).json({ message: "Id article invalide" });
  }

  const nombreVenteArticle = await prisma.Vente.count({
    where: { articleId: articleId },
  });
  if (nombreVenteArticle.length <= 0) {
    res.status(200).json({ message: "Cet article n'est pas encore vendu" });
  } else {
    res.status(200).json({
      message: "Cet article est vendu au total: " + nombreVenteArticle,
    });
  }
};
