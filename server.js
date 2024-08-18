const express = require("express");
const articlesRouter = require("./Routes/articlesRoutes");
const vendeurRouter = require("./Routes/vendeursRoutes");
const venteRouter = require("./Routes/ventesRoutes");
const app = express();
const dotenv = require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const port = process.env.PORT;
 
// MIDDLEWARES:
app.use(express.json());

// CHARGER LE FICHIER YAML:  
const swaggerDocument = YAML.load("./Doc.yaml"); 

//CONFIGURER UN LIEN VERS LA DOC DE SWAGGER API:
app.use("/app-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
// ROUTES:
app.use("/articles/", articlesRouter); 
app.use("/vendeurs/", vendeurRouter);
app.use("/ventes/", venteRouter); 
 
// LANCEMENT SERVER:
app.listen(port, () => {
  console.log("Running on port: " + port); 
});   
     
/* REQUÊTES:    
   
--- CRÉER ARTICLE, VENDEUR, VENTE: create();                                    ============== FAIT.

--- AFFICHER TOUS LES ARTICLES, VENDEURS ET VENTES: findMany();          ============== FAIT. 

 
 
--- AFFICHER PAR UN: findUnique()
ARTCILE PAR ID                                                                  ============== FAIT.
VENDEUR PAR ID                                                                 ============== FAIT.
VENTES PAR DATE;                                                    ============== ENCOURS.  

--- AFFICHER TOUS LES:
ARTICLES AVEC UN PRIX <= une variable: findMany();                        ============== FAIT.
ARTICLES AVEC UN PRIX >= une variable: findMany();                        ============== FAIT.


--- METTRE A JOUR:
ARTICLE                                                                   ============== FAIT. 
VENDEUR                                                                   ============== FAIT.    
VENTE: update();                                                          ============== ENCOURS.

--- SUPPRIMER:
ARTICLE                                                                   ============== FAIT.
VENDEUR                                                                   ============== FAIT.  
VENTE: delete();                                                          ============== ENCOURS.

--- COMPTER:   count();
LE NOMBRE DE VENTE EFFECTUE PAR UN VENDEUR;                               ============== FAIT.                                
LE NOMBRE DE FOIS QU'UN ARTICLE EST VENDU,                                ============== FAIT.  
LE NOMBRE DE VENTE TOTAL                                                  ============== ENCOURS.

--- CALCULER MONTANT TOTAL: aggregate();
DE VENTE:                                                                 ============== FAIT.
D'UN VENDEUR:                                                             ============== ENCOURS.
D'UN ARTCILE:                                                             ============== ENCOURS.

*/
