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
  - POST /register  
  - POST /login  
  - Middleware JWT  
  - PUT /user/avatar  
  - PUT /user/:id/book/:id  
  - DELETE /user (à voir pour v2)  


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
-  Finaliser les avatars et les images de bouquins  
-  Compléter la liste des routes et des tests

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

# 🎯 Projet Blablabook – Focus Admin (Back Office dédié)

---

## 📁 Organisation des dossiers
- Création d’un dossier `admin/` pour centraliser :
  - `controllers/` → logique métier admin
  - `routers/` → routes protégées `/admin/...`
  - `middlewares/` → `isAdmin.js`, `authenticate.js`
  - `views/` → templates EJS pour l’interface admin
  - `utils/prototypes/` → maquettes HTML brutes

---

## 📅 Objectifs à tenir jusqu’à dimanche
- [x] Créer l’arborescence complète du dossier `admin/`
- [x] Poser les fichiers vides avec `// TODO` dans `controllers`, `routers`, `middlewares`
- [x] Créer les maquettes HTML statiques : `dashboard.html`, `users.html`, `books.html`
- [ ] Préparer les routes Express admin (`/admin/dashboard`, `/admin/users`, etc.)
- [x] Mettre en place les middlewares `authenticate` et `isAdmin`
- [x] Tester une route simple qui rend une vue EJS (ex: `dashboard.ejs`)

---

## 📅 Objectifs semaine suivante
- [ ] Convertir les maquettes HTML en templates EJS
- [ ] Créer `layout.ejs` + `partials` (`header`, `footer`)
- [ ] Injecter les données dynamiques dans les vues admin
- [ ] Définir l’URL officielle du back office (ex: `/admin`)

---

## 📅 Objectifs semaine suivante (documentation)
- [ ] Rédiger la documentation des routes admin
- [ ] Ajouter des exemples Postman
- [ ] Documenter la logique MVC et la séparation FO/BO
- [ ] Tester des outils de génération automatique de doc (Swagger, apidoc)

---

## 🎨 Maquettes et vues
- Maquettes HTML pour valider l’interface admin
- Conversion en EJS avec injection dynamique
- Factorisation avec `layout.ejs` et `partials`

---

## 🔐 Sécurité et middlewares
- Middleware `authenticate` pour vérifier l’identité
- Middleware `isAdmin` pour restreindre l’accès
- Vérification des inputs
- Optionnel : logs/audit des actions admin

---

## ⚙️ Fonctionnalités admin à développer
- **Gestion des utilisateurs** :
  - CRUD complet
  - Visualisation des bibliothèques perso
- **Gestion des bibliothèques perso** :
  - Ajout/suppression de livres
  - Modification du statut
- **Gestion du catalogue global** :
  - Injection de livres en BDD
  - Suppression/modification
- **Dashboard admin** :
  - Statistiques clés

---

## 📚 Documentation
- Routes admin
- Schémas de données
- Logique MVC
- Mise à jour du `BRAINSTORMING.md`

---

## 🎤 Démo pour le jury
- Maquette HTML statique → interface admin
- Version EJS dynamique → données injectées
- Route Express → vue rendue
- Séparation claire FO (SvelteKit) / BO (admin)


## 🔐 Gestion par Cookie (sécurité renforcée)

### Objectifs
- Remplacer l’usage du JWT en query string par un **cookie HTTPOnly** pour l’espace admin.
- Éviter que le token soit visible dans l’URL.
- Séparer la logique front (SvelteKit) et back office (EJS/Express).

### Étapes
1. **Installer et configurer `cookie-parser`** dans le backend Express.
   ```bash
   npm install cookie-parser
