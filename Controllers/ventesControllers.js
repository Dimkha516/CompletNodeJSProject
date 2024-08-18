const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function convertDateFormat(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

module.exports.addVente = async (req, res) => {
  const { montant, articleId, vendeurId, client } = req.body;
  // const date = new Date();
  // const venteDate = convertDateFormat(dt);

  try {
    const newVente = await prisma.Vente.create({
      data: { montant, articleId, vendeurId, client },
    });
    res.status(201).json(newVente);
  } catch (err) {
    res.status(400).json({ message: "Erreur ajout vente: " + err });
  }
};

module.exports.getVentes = async (req, res) => {
  const ventes = await prisma.Vente.findMany();

  ventes
    ? res.status(200).json(ventes)
    : res.status(400).json({ message: "Aucun article trouvé" });
};

// module.exports.getVenteByDate = async (req, res) => {
//   const { searchedDate } = convertDateFormat (req.body);

//   try {
//     const correspondVentes = await prisma.Vente.findUnique({
//       where: { date: searchedDate },
//     });
//     if (correspondVentes.length < 0) {
//       res.status(400).json({ message: "Aucune vente pour cette période" });
//     } else {
//       res.status(200).json(correspondVentes);
//     }
//   } catch (err) {
//     res.status(400).json({ message: "Erreur recherche date: " + err });
//   }
// };

module.exports.totalVente = async (req, res) => {
  const totalVente = await prisma.Vente.aggregate({
    _sum: {
      montant: true,
    },
  });
  res.status(200).json({ message: "Montant total des ventes : " + totalVente._sum.montant });
};
