const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getVendeurs = async (req, res) => {
  const vendeurs = await prisma.vendeur.findMany();

  vendeurs
    ? res.status(200).json(vendeurs)
    : res.status(400).json({ message: "Aucun vendeur trouvé!" });
};

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
