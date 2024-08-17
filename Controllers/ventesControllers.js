const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getVentes = async (req, res) => { 
  const ventes = await prisma.Vente.findMany();

  ventes
    ? res.status(200).json(ventes)
    : res.status(400).json({ message: "Aucun article trouvé" });
};

module.exports.addVente = async (req, res) => {
  const { montant, articleId, vendeurId, client } = req.body;

  try {
    const newVente = await prisma.Vente.create({
      data: { montant, articleId, vendeurId, client },
    });
    res.status(201).json(newVente);
  } catch (err) {
    res.status(400).json({ message: "Erreur ajout vente: " + err });
  }
};
