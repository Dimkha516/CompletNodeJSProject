const express = require("express");
const articlesRouter = require("./Routes/articlesRoutes");
const vendeurRouter = require("./Routes/vendeursRoutes");
const venteRouter = require("./Routes/ventesRoutes");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;

// MIDDLEWARES:
app.use(express.json());

// ROUTES:
app.use("/api/articles/", articlesRouter);
app.use("/api/vendeurs/", vendeurRouter);
app.use("/api/ventes/", venteRouter);

// LANCEMENT SERVER:
app.listen(port, () => {
  console.log("Running on port: " + port);
});


/* REQUÊTES:

--- CRÉER ARTICLE, VENDEUR, VENTE: create();                             ============== FAIT.

--- AFFICHER TOUS LES ARTICLES, VENDEURS ET VENTES: findMany();          ============== FAIT. 


--- AFFICHER PAR UN: ARTCILE, VENDEUR, VENTES: findUnique();              ============== ENCOURS.

--- AFFICHER TOUS LES ARTICLES AVEC UN PRIX <= une variable: findMany();  ============== FAIT.
--- AFFICHER TOUS LES ARTICLES AVEC UN PRIX >= une variable: findMany();  ============== FAIT.

--- METTRE A JOUR ARTICLE, VENDEUR, VENTE: update();                      ============== ENCOURS.

--- SUPPRIMER ARTICLE, VENDEUR, VENTE: delete();                          ============== ENCOURS.

--- COMPTER LE NOMBRE DE VENTE EFFECTUE PAR UN VENDEUR;
LE NOMBRE DE FOIS QU'UN ARTICLE EST VENDU,
LE NOMBRE DE VENTE TOTAL: count();                                        ============== ENCOURS.

--- CALCULER TOTAL VENTE D'UN VENDEUR ET D'UN ARTCILE: aggregate();       ============== ENCOURS.

--- VOIR COMMENT UTILISER groupBy();                                      ============== ENCOURS.
*/