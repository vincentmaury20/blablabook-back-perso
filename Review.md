# 🔍 Code Review — Backend Blablabook

Ce document sert de support temporaire pour la review complète du backend.  
Il sera supprimé une fois la review terminée.

---

# 1. Structure générale du projet

## ✔️ Points vérifiés
- Organisation claire des dossiers (`admin`, `controllers`, `models`, `routes`, `middlewares`, `public`)
- Architecture MVC respectée
- `index.js` propre et minimal
- Séparation correcte entre logique métier, routes et vues

## 🔧 Améliorations possibles
- Vérifier que tous les noms de fichiers suivent une convention homogène
- Supprimer les fichiers inutilisés ou obsolètes

donc mon projet est organisé ainsi :

### Projet BlaBlaBook back le nom du repo
Dossier admin qui comprend ses propres controllers, middlewares, routes, utils et vues EJS
ensuite à la racine (même endroit que le dossier admin) nous retrouvons les dossiers d'une architecture MVC classique mise à dispo pour le côté front (repo différent mais indisociable du projet) avec models, controllers, routes, middlewares, public (assets) et views (EJS pour le front) les migrations les schemas, uploads un peu de doc (peut-être à revoir)l'index.js entréé de l'app 


---

# 2. Middlewares

## ✔️ Points vérifiés
- `authenticateAdmin` : gestion correcte du token, redirections cohérentes
- `isAdmin` : vérification du rôle, gestion des erreurs
- Middlewares d’erreurs EJS (`403.ejs`, `not-found.ejs`) fonctionnels
- Import/export Multer corrigé

## 🔧 Améliorations possibles
- Ajouter une gestion d’erreurs plus fine pour Multer (après le Titre Pro)
- Centraliser les messages d’erreur pour plus de cohérence

---

# 3. Routes & Controllers

## ✔️ Points vérifiés
- Routes cohérentes et bien organisées
- CRUD complets pour : users, books, authors, genres, reviews
- Utilisation correcte des middlewares d’authentification
- Status codes globalement cohérents

## 🔧 Améliorations possibles
- Harmoniser les noms des handlers (ex : `createOne`, `updateOne`, etc.)
- Ajouter des validations plus strictes sur les inputs
- Ajouter des tests unitaires (optionnel)

---

# 4. Vues EJS (Admin)

## ✔️ Points vérifiés
- Titres corrigés (plus d’erreur “title is not defined”)
- Templates harmonisés
- Boutons et icônes Bootstrap cohérents
- Pages d’erreurs ajoutées (`403`, `not-found`)
- Nettoyage général du code EJS

## 🔧 Améliorations possibles
- Ajouter des messages d’erreur dans les formulaires
- Ajouter des tooltips ou aides contextuelles
- Améliorer le responsive (léger)

---

# 5. Sécurité

## ✔️ Points vérifiés
- JWT correctement géré
- Vérification du rôle admin
- Redirections cohérentes en cas d’accès interdit
- Pas de données sensibles dans les logs

## 🔧 Améliorations possibles
- Ajouter une validation serveur plus stricte (ex : Joi, Zod)
- Ajouter un rate limiting (optionnel)
- Gérer les erreurs Multer de manière plus robuste

---

# 6. Qualité du code

## ✔️ Points vérifiés
- Code globalement lisible
- Indentation correcte
- Peu ou pas de code mort
- Pas de `console.log` inutiles

## 🔧 Améliorations possibles
- Ajouter plus de commentaires dans les zones complexes
- Documenter les routes (README ou Swagger)

---

# 7. Dockerisation (à venir)

## À vérifier lors de la prochaine étape :
- Dockerfile backend
- Dockerfile front
- docker-compose (backend + DB + front)
- Variables d’environnement
- Tests en local

---

# 8. Conclusion

Le backend est globalement propre, cohérent et fonctionnel.  
Les middlewares ont été stabilisés, les vues corrigées, et la structure est saine.

Les améliorations restantes sont mineures et pourront être faites après le Titre Pro.

Ce fichier sera supprimé une fois la review terminée.