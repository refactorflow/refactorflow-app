# Architecture Core

## 1. Domain Layer (`/core/domain`)

### Objectif
Contient les entités métier et la logique métier pure, indépendante de toute infrastructure.

### Structure
- `/entities`: Classes représentant les objets métier
  - Pas de dépendances externes
  - Logique métier pure
  - Validation des règles métier

## 2. Application Layer (`/core/application`)

### Objectif
Orchestration des cas d'utilisation et logique applicative.

### Structure
- `/dtos`: Data Transfer Objects pour la validation et transformation
  - Validation avec Zod
  - Séparation entre DTO d'entrée et de sortie

- `/errors`: Gestion centralisée des erreurs
  - Hiérarchie d'erreurs personnalisées
  - Messages d'erreur standardisés

- `/ports`: Interfaces pour l'infrastructure
  - Définition des contrats pour les repositories
  - Abstraction de l'infrastructure

- `/services`: Services applicatifs
  - Orchestration des opérations CRUD
  - Validation des données
  - Gestion des erreurs

- `/use-cases`: Cas d'utilisation métier complexes
  - Orchestration de plusieurs services
  - Logique métier spécifique
  - Gestion des transactions

## 3. Infrastructure Layer (`/core/infrastructure`)

### Objectif
Implémentation concrète des interfaces définies dans les ports.

### Structure
- `/repositories`: Implémentations des repositories
  - Interaction avec la base de données
  - Mapping entre entités Prisma et domaine
  - Gestion des transactions

### Principes Clés

1. **Dependency Rule**
   - Les couches internes ne dépendent pas des couches externes
   - Les dépendances pointent vers l'intérieur

2. **Separation of Concerns**
   - Chaque couche a une responsabilité unique
   - Découplage fort entre les couches

3. **Dependency Injection**
   - Inversion des dépendances
   - Facilite les tests unitaires

4. **Error Handling**
   - Gestion centralisée des erreurs
   - Transformation des erreurs techniques en erreurs métier

### Flow des Données

1. Request → Controller
2. Controller → Use Case/Service
3. Service → Repository (via Port)
4. Repository → Database
5. Database → Domain Entity
6. Domain Entity → DTO
7. DTO → Response

### Bonnes Pratiques

1. **Validation**
   - DTOs pour la validation d'entrée
   - Zod pour le typage et la validation

2. **Error Handling**
   - Try/catch dans les services
   - Erreurs personnalisées pour chaque cas

3. **Testing**
   - Tests unitaires pour chaque couche
   - Mocks pour les dépendances

4. **Documentation**
   - Documentation des interfaces
   - Documentation des cas d'utilisation