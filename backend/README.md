# API REST - Gestion des utilisateurs

API REST construite avec Express.js, architecture MVC, données en mémoire.

## Démarrage

```bash
npm install
node server.js
# Serveur sur http://localhost:3001
```

## Endpoints

| Méthode | Route | Description | Statut |
|---------|-------|-------------|--------|
| GET | `/api/users` | Lister tous les utilisateurs | 200 |
| GET | `/api/users?role=admin` | Filtrer par rôle | 200 |
| GET | `/api/users/:id` | Obtenir un utilisateur | 200 / 404 |
| POST | `/api/users` | Créer un utilisateur | 201 / 400 / 409 |
| PUT | `/api/users/:id` | Mettre à jour un utilisateur | 200 / 404 / 409 |
| DELETE | `/api/users/:id` | Supprimer un utilisateur | 204 / 404 |

## Exemples

**GET /api/users**
```json
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

**POST /api/users** — Corps requis :
```json
{
  "name": "Alice Martin",
  "email": "alice@example.com",
  "role": "user"
}
```

**PUT /api/users/:id** — Mise à jour partielle (les champs `id` et `createdAt` sont ignorés) :
```json
{ "name": "Nouveau nom" }
```

## Codes d'erreur

| Code | Raison |
|------|--------|
| 400 | Champs `name` ou `email` manquants |
| 404 | Utilisateur introuvable |
| 409 | Email déjà utilisé |

## Structure

```
backend/
├── data/users.js            # Données initiales en mémoire
├── models/userModel.js      # Accès et manipulation des données
├── controllers/             # Logique HTTP et validation
│   └── userController.js
├── routes/users.js          # Câblage des routes
├── middleware/logger.js     # Logging des requêtes
└── server.js                # Point d'entrée
```

## Logging

Chaque requête est loggée automatiquement :
```
[2024-03-01 14:32:10] GET /api/users - 200 - 4ms
```
