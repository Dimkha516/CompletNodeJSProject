const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.addVendeur = async (req, res) => {
  const { nomComplet, email, password } = req.body;

  try {
    const newVendeur = await prisma.vendeur.create({
      data: { nomComplet, email, password },
    });
    res.status(201).json(newVendeur);
  } catch (err) {
    res.status(400).json({ message: "Erreur ajout vendeur: " + err });
  }
};

module.exports.getVendeurs = async (req, res) => {
  const vendeurs = await prisma.vendeur.findMany();

  vendeurs
    ? res.status(200).json(vendeurs)
    : res.status(400).json({ message: "Aucun vendeur trouvé!" });
};

module.exports.getVendeur = async (req, res) => {
  const vendeurId = parseInt(req.params.id);
  if (!vendeurId) {
    return res.status(401).json({ message: "Id Vendeur invalide" });
  }

  const article = await prisma.Vendeur.findUnique({
    where: { id: vendeurId },
  });
  article
    ? res.status(200).json(article)
    : res.status(400).json({ message: "Vendeur non trouvé" });
};

module.exports.updateVendeur = async (req, res) => {
  const vendeurId = parseInt(req.params.id);
  if (!vendeurId) {
    return res.status(400).json({ message: "Id vendeur invalide" });
  }

  try {
    const vendeurToUpdate = await prisma.Vendeur.update({
      where: { id: vendeurId },
      data: { password: req.body.newPassword },
    });
    res
      .status(200)
      .json({ message: "Données vendeur mises à jour avec succès !" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur modification mot de passe " + err });
  }
};

module.exports.deleteVendeur = async (req, res) => {
  const vendeurId = parseInt(req.params.id);
  if (!vendeurId) {
    return res.status(400).json({ message: "Id article invalide" });
  }

  const vendeurToDelete = await prisma.Vendeur.delete({
    where: { id: vendeurId },
  });
  res.status(200).json({ message: "Vendeur supprimé avec succès !" });
};

module.exports.ventesVendeur = async (req, res) => {
  const { vendeurId } = (req.body);
  if (!vendeurId) {
    return res.status(403).json({ message: "Id vendeur invalide" });
  }
  const nombreVente = await prisma.Vente.count({
    where: { vendeurId: vendeurId },
  });
  if (nombreVente.length <= 0) {
    res
      .status(200)
      .json({ message: "Ce vendeur n'a pas encore effectué de vente" });
  } else {
    res
      .status(200)
      .json({ message: "Ce vendeur vendu au total: " + nombreVente });
  }
};
