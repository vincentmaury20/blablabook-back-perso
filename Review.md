# 🔍 Code Review — Backend BlaBlaBook (Mise à jour finale)

Ce document sert de support temporaire pour la review complète du backend.  
Il sera supprimé une fois la review terminée.

---

# 1. Structure générale du projet

## ✔️ Points vérifiés

- Organisation claire des dossiers (`admin`, `controllers`, `models`, `routes`, `middlewares`, `public`)
- Architecture MVC respectée
- `index.js` propre et minimal
- Séparation correcte entre logique métier, routes et vues
- Dossier `admin` isolé et cohérent (MVC complet côté serveur)

## 🔧 Améliorations possibles

- Vérifier que tous les noms de fichiers suivent une convention homogène (`camelCase` ou `kebab-case`)
- Supprimer les fichiers inutilisés ou obsolètes
- Vérifier la cohérence des dossiers `uploads/` (avatars, books, images)
- Harmoniser la structure entre `admin/` et le reste du backend (si nécessaire)

---

# 2. Middlewares

## ✔️ Points vérifiés

- `authenticateAdmin` : gestion correcte du token, redirections cohérentes
- `isAdmin` : vérification du rôle, gestion des erreurs
- Middlewares d’erreurs EJS (`403.ejs`, `not-found.ejs`) fonctionnels
- Multer : import/export corrigé, fonctionnement stable

## 🔧 Améliorations possibles

- Ajouter une gestion d’erreurs Multer plus fine (taille max, messages personnalisés)
- Centraliser les messages d’erreur dans un fichier dédié (`utils/errors.js`)
- Ajouter des commentaires dans les middlewares complexes (JWT, Multer)

---

# 3. Routes & Controllers

## ✔️ Points vérifiés

- Routes cohérentes et bien organisées
- CRUD complets pour : users, books, authors, genres, reviews
- Utilisation correcte des middlewares d’authentification
- Status codes globalement cohérents
- Séparation claire entre admin et API publique

## 🔧 Améliorations possibles

- Harmoniser les noms des handlers (`createOne`, `updateOne`, `deleteOne`, etc.)
- Ajouter des validations plus strictes (Joi, Zod)
- Ajouter des tests unitaires (optionnel)
- Vérifier les messages d’erreur renvoyés par les controllers

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
- Améliorer légèrement le responsive
- Vérifier les inclusions (`partials`) pour éviter les répétitions

---

# 5. Sécurité

## ✔️ Points vérifiés

- JWT correctement géré (public + admin)
- Vérification du rôle admin
- Redirections cohérentes en cas d’accès interdit
- Pas de données sensibles dans les logs

## 🔧 Améliorations possibles

- Ajouter une validation serveur plus stricte (Joi, Zod)
- Ajouter un rate limiting (optionnel)
- Gérer les erreurs Multer de manière plus robuste
- Vérifier la durée de vie des tokens (expiration cohérente)

---

# 6. Qualité du code

## ✔️ Points vérifiés

- Code globalement lisible
- Indentation correcte
- Peu ou pas de code mort
- Pas de `console.log` inutiles

## 🔧 Améliorations possibles

- Ajouter plus de commentaires dans les zones complexes (JWT, Multer, Sequelize)
- Documenter les routes avec Swagger (fortement recommandé)
- Vérifier si `utils/http-status-code.js` est encore utile  
  → si peu utilisé, envisager de le supprimer ou de le centraliser

---

# 7. Modèles & Base de données

## ✔️ Points vérifiés

- Modèles Sequelize fonctionnels
- Relations cohérentes (`hasMany`, `belongsToMany`, etc.)
- Migrations propres

## 🔧 Améliorations possibles

- Vérifier les champs des modèles (types, contraintes, validations)
- Ajouter des validations Sequelize (`allowNull`, `validate`, `unique`)
- Vérifier la cohérence entre migrations et modèles
- Ajouter un schéma visuel (Mermaid) pour la DB

---

# 8. Documentation

## ✔️ Points vérifiés

- Documentation existante (`docs/`)

## 🔧 Améliorations possibles

- Ajouter une documentation Swagger pour l’API publique
- Ajouter un schéma d’architecture (Mermaid)
- Compléter ou réorganiser les fichiers dans `docs/`

---

# 9. Dockerisation (à venir)

## À vérifier lors de la prochaine étape

- Dockerfile backend
- Dockerfile front
- docker-compose (backend + DB + front)
- Variables d’environnement
- Tests en local

---

# 10. Conclusion

Le backend est globalement propre, cohérent et fonctionnel.  
Les middlewares ont été stabilisés, les vues corrigées, et la structure est saine.

Les améliorations restantes sont mineures et pourront être faites après le Titre Pro.

Ce fichier sera supprimé une fois la review terminée.
