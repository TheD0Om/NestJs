ReadMe fait avec ChatGPT après lui avoir donné presque tout mon code :)

Projet NestJS - Système de Réservation de Films
Ce projet est une application de gestion de réservations de films, développée avec NestJS et utilisant MongoDB pour la gestion des données.

Table des matières
Description
Technologies
Prérequis
Installation
Configuration de l'application
Endpoints
Tests
Contribuer
Licence
Description
L'application permet à un utilisateur de créer un compte, de se connecter, puis de faire des réservations pour des films à des créneaux horaires précis. Chaque utilisateur peut consulter ses réservations et les annuler si nécessaire.

L'application repose sur NestJS, un framework de développement backend, et utilise MongoDB comme base de données pour stocker les utilisateurs, les films et les réservations.

Technologies
NestJS : Framework backend pour construire des applications serveur efficaces et scalables.
MongoDB : Base de données NoSQL utilisée pour stocker les informations des utilisateurs, films, et réservations.
Mongoose : ODM pour MongoDB, permettant de travailler avec des objets au lieu de documents JSON.
JWT : Utilisé pour l'authentification et la gestion des tokens d'accès des utilisateurs.
Swagger : Utilisé pour la documentation automatique des API.
Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

Node.js (version 14.x ou supérieure)
MongoDB (ou utilisez un service cloud comme MongoDB Atlas)
Git
Installation
Clonez ce projet sur votre machine locale.

git clone https://github.com/TheD0Om/NestJs.git

Accédez au répertoire du projet.

cd mon-projet

Installez les dépendances.

npm install

Assurez-vous que MongoDB est en cours d'exécution sur votre machine ou que vous utilisez une base de données distante comme MongoDB Atlas. Mettez à jour la configuration de connexion à MongoDB dans app.module.ts.

Lancez l'application.

npm start

Cela lancera l'application sur le port 3000 par défaut.

Configuration de l'application
L'application nécessite quelques configurations de base pour fonctionner :

Variables d'environnement
Le projet utilise un fichier .env pour gérer les variables d'environnement. Créez ce fichier à la racine de votre projet et ajoutez-y les variables suivantes :

MONGO_URI=mongodb://localhost:27017/film_reservation
JWT_SECRET=votre_secret_pour_jwt

MONGO_URI : L'URL de votre base de données MongoDB.
JWT_SECRET : Clé secrète utilisée pour signer les tokens JWT.
Endpoints
Authentification
POST /auth/login : Connecte un utilisateur et renvoie un token JWT.
POST /auth/register : Enregistre un nouvel utilisateur.
Réservations
POST /reservations : Crée une nouvelle réservation pour un film.
GET /reservations : Récupère toutes les réservations de l'utilisateur connecté.
DELETE /reservations/:id : Annule une réservation.


Exemples de requêtes
Créer une réservation

POST /reservations
Content-Type: application/json
Authorization: Bearer <token_jwt>

{
  "filmId": "605c72ef153207d72f9aebff",
  "startTime": "2025-02-08T18:00:00Z"
}

Récupérer les réservations

GET /reservations
Authorization: Bearer <token_jwt>

Annuler une réservation

DELETE /reservations/:id
Authorization: Bearer <token_jwt>

Tests
L'application est testée via des tests unitaires et d'intégration pour garantir son bon fonctionnement.

Exécuter les tests

npm run test

Pour les tests d'intégration avec Swagger, vous pouvez tester les endpoints via l'interface Swagger disponible à l'adresse suivante :

http://localhost:3000/api
