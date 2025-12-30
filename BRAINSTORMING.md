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

# 🎯 Projet Blablabook – Back Office Admin (Roadmap Backend)

## Résumé rapide
L’admin est désormais stabilisé : layout unifié (header/footer/sidebar), Dashboard harmonisé, CRUD Livres fonctionnel, upload des covers corrigé, relations auteurs/genres opérationnelles, upload avatar terminé, et affichage front cohérent via API_URL centralisé. Les pages admin sont propres, cohérentes et maintenables.

---

## ✔️ Ce qui est déjà fait (Backend)
- **Layout admin refactorisé** : partials EJS (header/footer/sidebar), Dashboard harmonisé.
- **CRUD Livres complet** : liste, détail, création, édition, suppression.
- **Upload images** :
  - Covers : Multer + `uploads/books/images`.
  - Avatars utilisateurs : route + Multer + stockage + affichage front OK.
  - Express sert `/uploads`.
- **Relations Sequelize** :
  - Livres ↔ Auteurs (Many-to-Many).
  - Livres ↔ Genres (Many-to-Many).
- **Fixs importants** :
  - Correction `authors[]` → `authorIds`.
  - Correction `genres[]` → `genreIds`.
  - Ajout de `upload.single("cover")` sur la route create.
  - Proxy Vite + API_URL pour affichage des images.
- **Admin Authors** :
  - Mise à jour OK.
  - Suppression OK.
- **Centralisation API_URL** :
  - `src/lib/config.js` + `.env.example`.
  - Remplacement des URLs hardcodées.

---

## 🔧 Ce qu’il reste à faire (Backend)

### 1. CRUD Genres (PRIORITÉ)
- [❎] Model Genre.
- [❎] Table pivot BookGenre.
- [❎] CRUD admin : list, create, edit, delete.
- [❎] Sélection multiple dans la création/édition d’un livre.
- [❎] Harmonisation des vues (comme auteurs).

### 2. Avis sur les livres (Reviews)
- [ ] Model Review (rating, comment, userId, bookId).
- [ ] Relations : User.hasMany, Book.hasMany.
- [ ] Formulaire utilisateur (front).
- [ ] Modération admin (delete).
- [ ] Affichage des avis sur la page livre.

### 3. Gestion des erreurs
- [ ] Middleware global d’erreurs Express.
- [ ] Pages d’erreur admin : 404, 500.
- [ ] Gestion des erreurs Multer (taille, format).

### 4. Nettoyage final
- [ ] Purger logs et `console.log`.
- [ ] Supprimer commentaires temporaires.
- [ ] Nettoyer la base (auteurs/genres orphelins).
- [ ] Vérifier cohérence des routes admin.

---

## Ce qui est repoussé (après TP)

### Changement de mot de passe
- [ ] Formulaire sécurisé (ancien + nouveau).
- [ ] Endpoint backend avec validation + hashage.

### Forum / Chat (Phase 2)
- [ ] CRUD posts/comments.
- [ ] Étude Socket.IO pour chat temps réel.
- [ ] Présenté comme **axe d’amélioration**.

---

## Priorités immédiates (ordre conseillé)
1. **CRUD Genres** (fondamental pour les livres).
2. **Avis sur les livres** (feature forte pour ton projet).
3. **Nettoyage + pages d’erreur**.
4. **Préparation dossier projet + dossier pro**.

---

## Bonnes pratiques
- Une branche par feature.
- Commits atomiques et explicites.
- Tester chaque route avec Postman avant d’intégrer au front.
- Toujours vérifier `req.body`, `req.file`, et les relations Sequelize.
- Garder l’admin simple, clair, cohérent.


# Checklist – Feature Admin Reviews (CRUD + Modération)

## 1. Validation & sécurité
- Créer un `reviewSchema` (Joi) pour valider :
  - `rating` (1–10)
  - `comment` (texte optionnel)
  - `is_published` (booléen)
- Gérer les erreurs de validation proprement (retour dans le formulaire avec message).

OK CETTE TACHE EST FAITE ❎❎❎❎❎

## 2. Contrôleur admin (CRUD complet)
Créer dans `adminReviewController` :

- `getReviews` → afficher tous les avis (avec User + Book)
- `createReview (GET)` → afficher le formulaire de création
- `createReview (POST)` → valider + créer un avis
- `editReview (GET)` → afficher le formulaire d’édition
- `editReview (POST)` → valider + mettre à jour un avis
- `togglePublish` → publier / dépublier un avis
- `deleteReview` → supprimer un avis

OK CETTE TACHE EST FAITE ❎❎❎❎❎

## 3. Routes admin
Créer ou compléter les routes :

- `GET /admin/reviews`
- `POST /admin/review/create`
- `GET /admin/reviews/:id/edit`
- `PUT /admin/reviews/:id/edit`
- `DELETE /admin/reviews/:id/delete`
- `POST /admin/reviews/:id/toggle`

OK CETTE TACHE EST FAITE ❎❎❎❎❎

Toutes protégées par :
- middleware `isAuthenticated`
- middleware `isAdmin`

## 4. Templates EJS (avec Bootstrap Icons)
Créer dans `views/admin/reviews/` :

- `list.ejs` → tableau des avis (User, Book, note, commentaire, statut, actions)
- `edit.ejs` → formulaire d’édition
<!-- - `detail.ejs` → détails d'un avis... je dirai que ce n'est pas forcément nécessaire -->
<!-- - `create.ejs` → à voir si je le mets en place ou non , il faut voir -->

Les templates sont en cours de réalisation, j'ai dû simplement gérer au niveau du front pour 'affichage d'un texte si l'admin n'a selectionné aucun avis à publish ou non.
Peut-être serait il pertinant de ne faire que deux templates pour ce list et edit, mais je me pose la question  de savoir si éventuellement un admin voudrait créer un avis manuellement 

##  🔴 BUGS À CORRIGER - Admin Reviews
- ❌ **Nom utilisateur non visible** → affichage de `review.user.name` + `review.user.firstname` ne marche pas, effectivement il fallait utiliser User.name et User.firstname dans le controller admin.review.controller.js peut-être à corriger par la suite pour avoir une meilleure lisibilité et pouvoir mettre user.firstname et user.name dans le template ejs
  pour le moment c'est fonctionnel comme ça.
- ❌ **Livre non visible** → affichage de `review.book.title` ne marche pas  et c'est le même problème que pour l'utilisateur, il faut utiliser Book.title dans le template ejs.
- ❌ **Système de note cassé** → le rendu des étoiles et du badge /5 ne fonctionne pas corrigé simplement en mettant les notes /10 par contre voir si je peux faire mieux par la suite nottamment affichage de jauge ou étoiles... et.
donc on peut considére que la résolution de ces "bugs" c'est : OK CETTE TACHE EST FAITE ❎❎❎❎❎

Utiliser :
- layout admin existant
- icônes Bootstrap (`bi bi-trash`, `bi bi-pencil`, `bi bi-eye`, `bi bi-eye-slash`)




# ↓↓↓↓↓ Voilà les questionnements au niveau de l'admin reviews, le 30/12/2025 en résumé ↓↓↓↓↓
- je me pose des questions sur l'utilité d'un template detail... est ce vraiment pertinent ?
- et finalement est ce que je ne mettrai pas un formulaire de création d'avis côté admin, en justifiant que l'admin pourrait vouloir créer des avis manuellement pour lancer le site avec des avis déjà présents ?
- et aussi enfin, surement améliorer mon controller pour pouvoir afficher les prénoms et noms des utilisateurs dans le front convenablement.









##  Tests rapides à faire après l’implémentation
- Créer un avis via l’admin
- Modifier un avis
- Publier/dépublier un avis
- Vérifier que le front n’affiche que les avis publiés
- Vérifier que tout apparaît correctement dans la base