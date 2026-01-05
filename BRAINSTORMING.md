# Carnet de notes / Brainstorming / KoiKonFait ? 😉😉 "clin d'œil, clin d'œil"

## ⭕ Sprint 0

### 23/09/2025
Aujourd’hui, nous avons rédigé la présentation générale du projet, comportant la définition des besoins fonctionnels (MVP) ainsi que les objectifs du projet et ses évolutions potentielles.  
Nous avons défini les contraintes techniques du projet, sa cible et la liste des navigateurs compatibles.  
Nous avons réalisé l’arborescence du site ainsi que ses routes et rédigé les user stories.

### 24/09/2025
Élaboration des modèles MCD et MLD du projet, ainsi que du dictionnaire des données.  
Développement des user stories et description des choix technologiques.  
Début de la charte graphique (palette de couleurs, polices).  
Conception des wireframes (page d’accueil en mobile first).

### 25/09/2025
Poursuite des wireframes en détail (connexion, inscription, bibliothèque perso, recherche, catalogue, détails livre, mon compte, mentions légales) en mobile et desktop.  
Préparation de la charte graphique.

### 26/09/2025
Réalisation des maquettes du site Blablabook (mobile et desktop).  
Finalisation de la charte graphique.  
Définition des routes de l’API côté back.  
Attribution des rôles dans l’équipe.  
Organisation du Trello pour démarrer le sprint 1.

---

## 🚀 Sprint 1

### 29/09/2025
- Initialisation front et back / problème de versions SvelteKit  
- Création des branches  
- Début dev front : prise en main SvelteKit, tests des premières pages  
- Début dev back : architecture API REST, import des modules, mise en place du serveur  
- Installation de l’extension Git Graph dans VSCode

### 30/09/2025  
- Front : problème de suppression de branche Git “initialization SvelteKit”  
- Création des composants header et footer  
- Création des pages d’accueil, booklist et catalogue  

Back :  
- 🎯 Initialisation de la BDD  
- Création et mise en place des tables et des tables de liaison  
- Mise en place des migrations et test dbb réussi  
- Réflexion sur les clés primaires : Sequelize gère les `id`, pas d’usage d’ISBN  
- Ajout du champ `cover` (STRING(255)) pour les URL d’images de livres  
- Pas de gestion d’upload côté back pour les couvertures, appel direct via `{book.cover}` côté front  
- Ajout du prénom dans la table des auteurs 😉  
- Rôle par défaut : "user", pas d’admin pour l’instant  
- Décision d’ajouter des livres appréciés individuellement dans la BDD

### 01/10/2025  
- 🎯 Import des couvertures dans la BDD  
- 🎯 Routes basiques de l’API faites (users, authors, genres, liaisons)  
- Réorganisation de `index.js` avec les middlewares JSON  
- Création du schéma `user`  

🥸🤓🧐 Tâches à faire :  
- ❎ Traiter les Pull Requests  
- ❎ Ajouter les biographies des auteurs  
- ❎ Routes de suppression/ajout de livres dans les bibliothèques des users  
- ❎ Finaliser l’upload des avatars  
- ❎ Renommer la route `book/home` → `book/random` par exemple  
- ❎ Tests de connexion front/back  
- ❎ Authentification :  
  -❎ POST /register  
  -❎ POST /login  
  -❎ Middleware JWT  
  -❎ PUT /user/avatar  
  -❎ PUT /user/:id/book/:id  
  -❎ DELETE /user (à voir pour v2)  


🤯 Difficultés :  
- Test de création de user compliqué → problème de positionnement des middlewares  
- Prise en main de Postman laborieuse (peut-être avec la fatigue aussi 😉)

### 02/10/2025  
- 🎯 Import de Multer pour les uploads (couvertures + avatars)  
- 🎯 Changement du type de champ `cover` dans la BDD  
- 🎯 Connexion front/back enfin fonctionnelle malgré les caprices de SvelteKit  

🥸🤓🧐 Tâches à faire :  
- ❎ Gestion des authentifications : Argon2 + JWT  
- ❎ Sécuriser contre les injections XML  
- ❎Finaliser les avatars et les images de bouquins  
- ❎ Compléter la liste des routes et des tests

🤯 Difficultés :  
- La fatigue ......

### 03/10/2025  
- Front : poursuite des liens entre front et back pour affichage des livres et navigation  
- Back : mise en place du JWT, hachage des mots de passe  
- Groupe : connexion utilisateur → redirection vers la page “mon compte”

🥸🤓🧐 Tâches à faire :  
- Finaliser les tests d’authentification  
- Vérifier la sécurité des routes  
- Ajouter les validations côté back  
- Préparer les tests unitaires  
- Compléter la documentation technique  
- Vérifier la cohérence des schémas Sequelize  
- Préparer les routes pour la V2 (suppression de compte, gestion avancée des rôles)

---

## 📌 À ne pas oublier

```js
bookRouter.get('/home', bookController.getRandomBooks);
// cette route est à renommer, je le (re)note en gros ici pour ne pas oublier ^^
```

# 🎯 Projet Blablabook – Back Office Admin  
## Roadmap Backend (version mise à jour)

---

# 🟦 1. Résumé global

Le back-office admin de Blablabook est désormais **quasi complet**.  
Les CRUD principaux sont terminés (Livres, Auteurs, Genres, Avis), les uploads fonctionnent, les relations Sequelize sont en place, et l’admin est visuellement harmonisé grâce aux partials EJS.

Il me reste maintenant à **renforcer la gestion des erreurs**, **finaliser les templates EJS**, et **nettoyer le code** avant de préparer mon dossier professionnel pour le Titre Pro DWWM.

---

# 🟩 2. Ce qui est déjà fait (Backend)

## 🧱 Structure & Layout
- Layout admin refactorisé (header, footer, sidebar).
- Dashboard harmonisé.
- Navigation cohérente sur toutes les pages admin.

## 📚 CRUD Livres
- Liste, création, édition, suppression.
- Upload de cover (Multer) fonctionnel.
- Relations Many-to-Many avec auteurs et genres.

## 🖼️ Uploads
- Covers → `uploads/books/images`
- Avatars utilisateurs → upload + stockage + affichage front OK
- Express sert `/uploads` proprement.

## 🔗 Relations Sequelize
- Book ↔ Author (N-N)
- Book ↔ Genre (N-N)
- Book ↔ Review (1-N)
- User ↔ Review (1-N)

## 🛠️ Fixs importants
- `authors[]` → `authorIds`
- `genres[]` → `genreIds`
- Ajout de `upload.single("cover")` sur la route create
- Proxy Vite + API_URL pour affichage des images
- Centralisation API_URL (`src/lib/config.js` + `.env.example`)

## 👤 Admin Authors
- Mise à jour OK
- Suppression OK

## 🟪 Admin Genres
- CRUD complet terminé
- Sélection multiple dans les livres OK
- Templates harmonisés

## ⭐ Admin Reviews (Avis)
- CRUD complet terminé
- Formulaire de création ajouté
- Formulaire d’édition avec modale de confirmation
- Toggle publish OK
- Suppression OK
- Affichage User / Book corrigé
- Notes /10 OK
- Liste harmonisée

---

# 🟧 3. Ce qu’il reste à faire (Backend)

## 🔥 1. Gestion des erreurs (PRIORITÉ)
- [ ] Middleware global d’erreurs Express  
- [ ] Pages d’erreur admin (404, 500)  
- [ ] Gestion des erreurs Multer (taille, format)  
- [ ] Messages d’erreur dans les formulaires (EJS)

## 🧹 2. Nettoyage final
- [ ] Purger logs et `console.log`  
- [ ] Supprimer commentaires temporaires  
- [ ] Nettoyer la base (auteurs/genres orphelins)  
- [ ] Vérifier cohérence des routes admin  
- [ ] Vérifier cohérence des partials EJS

## 🖼️ 3. Templates EJS à finaliser
- [ ] Harmoniser tous les formulaires (boutons, modales, labels)
- [ ] Ajouter des messages de succès / erreur (Bootstrap alerts)
- [ ] Vérifier responsive du layout admin

---

# 🟦 4. Ce qui est repoussé (après TP)

## 🔐 Changement de mot de passe
- [ ] Formulaire sécurisé  
- [ ] Endpoint backend + validation + hashage  

## 💬 Forum / Chat (Phase 2)
- [ ] CRUD posts/comments  
- [ ] Étude Socket.IO  
- [ ] Présenté comme axe d’amélioration  

---

# 🟩 5. Priorités immédiates 

1. **Gestion des erreurs (Express + EJS)**  
2. **Finalisation des templates EJS**  
3. **Nettoyage du code**  
4. **Préparation dossier projet + dossier pro (Titre Pro DWWM)**  

---

# 🟦 6. Bonnes pratiques adoptées

- Une branche Git par feature  
- Commits atomiques et explicites  
- Tests Postman avant intégration front  
- Vérification systématique de `req.body`, `req.file`, relations Sequelize  
- Admin simple, clair, cohérent  

---

# 🟨 7. Feature Admin Reviews – Checklist complète (100% OK)

## ✔️ Validation & sécurité
- `reviewSchema` (Joi) : rating, comment, is_published  
- Validation + conversion des types (`convert: true`)  
- Gestion correcte des booleans  

## ✔️ Contrôleur admin (CRUD complet)
- `getReviews`  
- `createReviewForm`  
- `createReview`  
- `editReviewForm`  
- `updateReview`  
- `togglePublish`  
- `deleteReview`  

## ✔️ Routes admin
- GET `/admin/reviews`  
- GET `/admin/review/create`  
- POST `/admin/review`  
- GET `/admin/review/:id/edit`  
- PUT `/admin/review/:id`  
- DELETE `/admin/review/:id`  
- POST `/admin/review/:id/toggle`  

## ✔️ Templates EJS
- `list.ejs`  
- `edit.ejs`  
- `create.ejs`  

## ✔️ Bugs corrigés
- Affichage User.firstname / User.name  
- Affichage Book.title  
- Système de note (étoiles + badge)  

---

# 🟩 8. Prochaines étapes

# 🗓️ Planning de finalisation du projet (1 semaine)

## 🎨 Lundi — Finitions EJS (1h–1h30)
- Harmonisation des boutons (Bootstrap)
- Ajout des tooltips
- Remplacement des emojis par des icônes Bootstrap
- Nettoyage des templates (indentation, classes, cohérence)
- Vérification du responsive léger

---

## ⚠️ Mardi — Gestion des erreurs globales (1h–2h)
- Création de `404.ejs`
- Création de `500.ejs`
- Mise en place d’un middleware global Express
- Tests d’erreurs contrôlées (routes inexistantes, erreurs serveur)

---

## 🧱 Mercredi — Gestion des erreurs Multer + messages EJS (1h–1h30)
- Gestion des erreurs de taille/format d’image
- Ajout d’alertes Bootstrap dans les formulaires
- Redirections propres en cas d’erreur
- Vérification des messages d’erreur côté admin

---

## 🧹 Jeudi — Review + nettoyage du code backend (1h–1h30)
- Suppression des logs inutiles
- Suppression des commentaires temporaires
- Vérification des includes Sequelize
- Vérification des routes admin
- Vérification des try/catch et des status codes
- Harmonisation des noms de variables

---

## 🐳 Vendredi — Dockerisation backend + base de données (1h–2h)
- Création du `Dockerfile` backend
- Création du `docker-compose.yml` (backend + DB)
- Tests en local
- Vérification du fonctionnement des migrations/seed

---

## 🖥️ Samedi — Dockerisation front + tests (1h–1h30)
- Création du `Dockerfile` front
- Ajout du front dans `docker-compose.yml`
- Tests front + back + DB ensemble
- Vérification des variables d’environnement

---

## 🚀 Dimanche — Déploiement (1h–2h)
- Déploiement backend (Render ou VPS Docker)
- Déploiement front (Vercel ou VPS)
- Tests en production (CRUD, images, avis, erreurs)
- Vérification du fonctionnement global

---

# 🗂️ Planning dossiers (2 semaines)

## 📁 Semaine 1 — Dossier Projet
- Contexte et objectifs
- Architecture technique
- Choix techniques
- Fonctionnalités détaillées
- Sécurité
- Déploiement
- Captures d’écran
- Conclusion

## 🧑‍💼 Semaine 2 — Dossier Professionnel ( déjà fait mais à revoir tout de même )
- Parcours
- Compétences
- Expériences
- Projet principal (Blablabook)
- Mise en situation professionnelle
- Auto-évaluation