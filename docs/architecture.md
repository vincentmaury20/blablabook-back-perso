# Architecture du projet BlaBlaBook (Backend)

Ce projet adopte une architecture **MVC (Modèle – Vue – Contrôleur)** adaptée à une _API REST_ construite avec _Express.js_.  
Cette organisation permet de maintenir une structure **claire**, **évolutive** et **facile à faire progresser**.

La partie **administration** suit la même logique MVC.  
Elle repose entièrement sur un **rendu côté serveur** grâce à _Express_ et _EJS_, ce qui permet de gérer toutes les vues directement depuis le backend.  
Ce choix s’est imposé naturellement au fil de l’évolution du projet et garantit une séparation propre entre **la logique métier**, **les routes** et **les templates**.

Enfin, la **séparation stricte** entre l’espace _public_ et l’espace _administrateur_ était essentielle pour assurer une organisation claire, une meilleure sécurité et une gestion indépendante des fonctionnalités.

---

## Structure des dossiers

```bash
projet-blablabook-backend/
│
├── admin/
│   ├── controllers/
│   │   ├── admin.author.controller.js
│   │   ├── admin.book.controller.js
│   │   ├── admin.controller.js
│   │   ├── admin.genre.controller.js
│   │   ├── admin.review.controller.js
│   │   ├── admin.user.book.controller.js
│   │   ├── admin.user.controller.js
│   │   └── index.js
│   ├── middlewares/
│   │   ├── authenticateAdmin.middleware.js
│   │   └── isAdmin.middleware.js
│   ├── routers/
│   │   ├── admin.author.router.js
│   │   ├── admin.book.router.js
│   │   ├── admin.genre.router.js
│   │   ├── admin.review.router.js
│   │   ├── admin.router.js
│   │   ├── admin.user.book.router.js
│   │   ├── admin.user.router.js
│   │   └── index.js
│   ├── utils/
│   │   └── prototypes/
│   │       ├── authors.html
│   │       ├── books.html
│   │       ├── dashboard.html
│   │       ├── genres.html
│   │       ├── login.html
│   │       └── users.html
│   └── views/
│       ├── authors/
│       │   ├── create.ejs
│       │   ├── detail.ejs
│       │   ├── edit.ejs
│       │   └── list.ejs
│       ├── books/
│       │   ├── create.ejs
│       │   ├── detail.ejs
│       │   ├── edit.ejs
│       │   └── list.ejs
│       ├── errors/
│       │   ├── 403.ejs
│       │   └── not-found.ejs
│       ├── genres/
│       │   ├── create.ejs
│       │   ├── detail.ejs
│       │   ├── edit.ejs
│       │   └── list.ejs
│       ├── partials/
│       │   ├── footer.ejs
│       │   ├── header.ejs
│       │   └── sidebar.ejs
│       ├── review/
│       │   ├── create.ejs
│       │   ├── detail.ejs
│       │   ├── edit.ejs
│       │   └── list.ejs
│       ├── users/
│       │   ├── create.ejs
│       │   ├── detail.ejs
│       │   ├── edit.ejs
│       │   └── list.ejs
│       ├── dashboard.ejs
│       └── login.ejs
│
├── controllers/                 # Logique métier (API publique)
│   ├── authentification.controller.js
│   ├── author.controller.js
│   ├── author.controller.test.js
│   ├── book.controller.js
│   ├── book.controller.test.js
│   ├── genre.controller.js
│   ├── index.js
│   ├── user.controller.js
│   └── userbook.controller.js
│
├── docs/                        # Documentation technique
│   ├── api.md
│   ├── architecture.md
│   ├── auth.md
│   └── middlewares.md
│
├── middlewares/                 # Middlewares globaux
│   ├── authentification.middleware.js
│   ├── uploadAvatar.middleware.js
│   └── uploadCover.middleware.js
│
├── migrations/                  # Scripts de migration Sequelize
│   ├── 01.create-tables.js
│   └── 02.seed-tables.js
│
├── models/                      # Modèles Sequelize
│   ├── author.model.js
│   ├── book.model.js
│   ├── genre.model.js
│   ├── index.js
│   ├── sequelize.client.js
│   ├── user.model.js
│   └── userBook.model.js
│
├── routers/                     # Routes API publiques
│   ├── author.router.js
│   ├── book.router.js
│   ├── genre.router.js
│   ├── index.js
│   ├── user.router.js
│   └── userbook.router.js
│
├── schemas/                     # Validation (Joi ou autre)
│   ├── login.schema.js
│   ├── register.schema.js
│   └── user.schema.js
│
├── uploads/                     # Fichiers uploadés
│   ├── avatars/
│   └── books/
│
├── utils/                       # Fonctions utilitaires
│   └── http-status-code.js
│
├── .env
├── .env.example
├── .gitignore
├── BRAINSTORMING.md
├── app.js                       # Point d’entrée Express
├── jest.config.js
├── package-lock.json
├── package.json
└── README.md

```
