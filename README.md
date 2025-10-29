# App Labrute

## Contexte

### Description
Ce projet a été réaliser durant mon alternance dans le cadre d'un devoir maison.\
L’objectif initial était de développer une application permettant de **simuler des combats de robots**.  
Faute de temps, la partie "combat" n’a pas pu être implémentée, mais plusieurs fonctionnalités essentielles sont présentes :  

- Système **d’inscription / connexion** des utilisateurs  
- Interface pour **équiper son robot** (arme, bouclier, tenue)  
- Interface pour consulter la **liste des robots** créés par d’autres utilisateurs  
- Interface listant **tous les équipements disponibles**  

L’application repose sur :  
- **Node.js / Express.js** pour le serveur  
- **TypeScript** pour la logique côté serveur  
- **EJS** comme moteur de templates (interfaces HTML dynamiques)

---

## Prérequis

- Node.js et npm installés

---

## Installation & Lancement

### 1. Cloner le projet
```bash
    git clone <url-du-repo>
    cd <nom-du-dossier>
```

### 2. Installer les dépendances
```bash
    npm install
```

### 3. Configuration
- Configurer le fichier **src\database\access-bdd.ts** avec les informations de la base de données.
- Exécuter le fichier app_brute_bdd.sql pour créer la base de données, les tables et les données.

### 4. Lancer l’application
Exécuter la commande :
```bash
    npm start
```

---

## Fonctionnalités
- Inscription / Connexion\
Les utilisateurs peuvent créer un compte et se connecter.

- Gestion d’équipement\
Un robot peut être équipé d’une arme, d’un bouclier et d’une tenue.

- Liste des robots\
Chaque utilisateur peut consulter les robots créés par les autres.

- Liste des équipements\
Tous les équipements existants sont affichés dans une interface dédiée.
