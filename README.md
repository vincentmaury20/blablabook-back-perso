# 📘 BlaBlaBook - Backend API

Une API REST moderne construite avec Node.js et Express pour une plateforme de gestion de livres et d'avis de lecture, incluant une interface d'administration côté serveur.

## 🎯 Caractéristiques principales

- API REST complète avec authentification JWT
- Gestion complète des livres, auteurs, genres et avis
- Système d'authentification utilisateur sécurisé (Argon2)
- Interface d'administration protégée
- Upload de couvertures de livres et avatars utilisateurs
- Interface admin côté serveur (EJS)
- Base de données relationnelle PostgreSQL avec Sequelize
- Tests unitaires avec Jest
- Support Docker
- Recherche de livres avancée

## 📋 Prérequis

- **Node.js** >= 16.x
- **npm** ou **yarn**
- **PostgreSQL** >= 12.x
- Un fichier `.env` configuré (voir section Configuration)

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/O-clock-Cambridge/projet-blablabook-back.git
cd projet-blablabook-back
```

### 2. Installer les dépendances

```bash
npm install ``ou`` npm i
```

### 3. Configurer l'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Serveur
PORT=3000
NODE_ENV=development

# Base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blablabook
DB_USER=postgres
DB_PASSWORD=your_password

# Authentification
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d

# Admin
ADMIN_EMAIL=admin@blablabook.com
ADMIN_PASSWORD=admin_password

# URLs
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

### 4. Créer et initialiser la base de données

```bash
# Créer les tables
npm run db:create

# Remplir les données initiales
npm run db:seed

# Ou faire les deux en une commande
npm run db:reset
```

## Scripts disponibles

```bash
# Démarrage en mode production
npm start

# Démarrage en mode développement (avec reload automatique)
npm run dev

# Créer les tables de la base de données
npm run db:create

# Remplir les données de test
npm run db:seed

# Réinitialiser la base de données (create + seed)
npm run db:reset

# Lancer les tests
npm test
```

## Structure du projet

```
projet-blablabook-back/
│
├── admin/                       # Interface d'administration
│   ├── controllers/             # Logique métier (admin)
│   ├── middlewares/             # Auth admin, validation
│   ├── routers/                 # Routes admin
│   ├── views/                   # Templates EJS
│   └── utils/                   # Prototypes et utilitaires
│
├── controllers/                 # Logique métier (API publique)
│   ├── authentification.controller.js
│   ├── author.controller.js
│   ├── book.controller.js
│   ├── genre.controller.js
│   ├── review.controller.js
│   ├── user.controller.js
│   └── userbook.controller.js
│
├── models/                      # Modèles Sequelize
│   ├── author.model.js
│   ├── book.model.js
│   ├── genre.model.js
│   ├── review.model.js
│   ├── user.model.js
│   ├── userBook.model.js
│   └── sequelize.client.js
│
├── routers/                     # Routes API publiques
│   ├── author.router.js
│   ├── book.router.js
│   ├── genre.router.js
│   ├── review.router.js
│   ├── user.router.js
│   └── userbook.router.js
│
├── middlewares/                 # Middlewares globaux
│   ├── authentification.middleware.js
│   ├── uploadAvatar.middleware.js
│   └── uploadCover.middleware.js
│
├── schemas/                     # Validation Joi
│   ├── author.schema.js
│   ├── login.schema.js
│   ├── registerUser.schema.js
│   ├── review.schema.js
│   ├── updateUser.schema.js
│   └── user.schema.js
│
├── migrations/                  # Gestion de la base de données
│   ├── 01.create-tables.js
│   └── 02.seed-tables.js
│
├── docs/                        # Documentation technique
│   ├── api.md
│   ├── architecture.md
│   ├── auth.md
│   └── middlewares.md
│
├── public/                      # Fichiers statiques
├── uploads/                     # Fichiers uploadés
│
├── index.js                     # Point d'entrée
├── jest.config.js               # Configuration tests
├── Dockerfile                   # Configuration Docker
└── package.json                 # Dépendances
```

## Architecture

Le projet suit une architecture **MVC (Modèle – Vue – Contrôleur)** :

- **Modèles** : Définissent la structure des données avec Sequelize
- **Controllers** : Contiennent la logique métier
- **Routers** : Définissent les endpoints API et les routes admin
- **Middlewares** : Authentification, validation, upload de fichiers
- **Views** : Templates EJS pour l'interface admin (rendu côté serveur)

## API Endpoints principales

### Libres d'accès

| Méthode | Endpoint      | Description               |
| ------- | ------------- | ------------------------- |
| GET     | `/authors`    | Récupère tous les auteurs |
| GET     | `/author/:id` | Récupère un auteur par ID |
| GET     | `/catalog`    | Récupère tous les livres  |
| GET     | `/book/:id`   | Récupère un livre par ID  |
| GET     | `/search`     | Recherche de livres       |
| GET     | `/genres`     | Récupère tous les genres  |
| GET     | `/genre/:id`  | Récupère un genre par ID  |

### Authentification

| Méthode | Endpoint         | Description                          |
| ------- | ---------------- | ------------------------------------ |
| POST    | `/user/register` | Inscription (avec avatar)            |
| POST    | `/user/login`    | Connexion                            |
| GET     | `/auth/me`       | Infos utilisateur connecté (protégé) |

### Livres utilisateur

| Méthode | Endpoint                            | Description                       |
| ------- | ----------------------------------- | --------------------------------- |
| GET     | `/userbooks`                        | Livres de l'utilisateur (protégé) |
| POST    | `/user/:userId/book/:bookId`        | Ajouter un livre à ma liste       |
| GET     | `/user/:userId/book/:bookId/status` | Vérifier le statut de lecture     |
| PUT     | `/user/:userId/book/:bookId`        | Mettre à jour le statut           |
| DELETE  | `/admin/user/:userId/book/:bookId`  | Supprimer un livre                |

### Admin

| Méthode             | Endpoint     | Description                     |
| ------------------- | ------------ | ------------------------------- |
| GET                 | `/admin`     | Tableau de bord admin           |
| POST/GET/PUT/DELETE | `/admin/...` | Gestion complète des ressources |

Pour la liste complète des routes, voir [docs/api.md](docs/api.md).

## Authentification

L'application utilise **JWT (JSON Web Tokens)** avec les dépendances suivantes :

- **jsonwebtoken** : Génération et vérification des tokens
- **argon2** : Hash sécurisé des mots de passe

### Flow d'authentification

1. **Inscription** (`POST /user/register`)
   - Validation des données
   - Hash du mot de passe (Argon2)
   - Création de l'utilisateur
   - Upload de l'avatar (optionnel)

2. **Connexion** (`POST /user/login`)
   - Vérification des identifiants
   - Génération d'un JWT
   - Retour du token au client

3. **Routes protégées**
   - Le JWT est envoyé dans le header `Authorization: Bearer <token>`
   - Le middleware `authenticate` valide le token
   - Accès autorisé à la ressource

Pour plus de détails, voir [docs/auth.md](docs/auth.md).

## Tests

Les tests sont écrits avec **Jest** et utilisés pour valider la logique métier des controllers.

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch
npm test -- --watch

# Lancer les tests avec rapport de couverture
npm test -- --coverage
```

Les tests se trouvent dans les fichiers `*.test.js` aux côtés des controllers.

## Docker

### Build de l'image

```bash
docker build -t blablabook-backend .
```

### Lancer le conteneur

```bash
docker run -p 3000:3000 --env-file .env blablabook-backend
```

## Documentation un peu plus approfondie

- [Architecture détaillée](docs/architecture.md)
- [Routes API détaillées](docs/api.md)
- [Système d'authentification](docs/auth.md)
- [Middlewares](docs/middlewares.md)
- [Script SQL](docs/script_sql.sql)

## Dépendances principales

- **express** (v5.1.0) - Framework web
- **sequelize** (v6.37.7) - ORM PostgreSQL
- **pg** (v8.16.3) - Driver PostgreSQL
- **jsonwebtoken** (v9.0.2) - Authentification JWT
- **argon2** (v0.44.0) - Hash de mots de passe
- **multer** (v2.0.2) - Upload de fichiers
- **joi** (v18.0.1) - Validation de données
- **ejs** (v3.1.10) - Templates côté serveur
- **cors** (v2.8.5) - CORS
- **cookie-parser** (v1.4.7) - Gestion des cookies

### Développement

- **jest** (v30.2.0) - Framework de test
- **cross-env** (v10.1.0) - Variables d'environnement cross-platform
