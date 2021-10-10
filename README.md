# Hot Takes - OpenClassrooms
Hot Takes est une application web de critique des sauces piquantes appelée « Hot Takes ».

## Projet
Le but étant de créer le backend du frontend donné par OpenClassrooms [accéder aux ressources](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)

## Cours appliqués
- [Passez au Full stack avec Node.js, Express et MongoDB](https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb)
- [Sécurisez vos applications web avec l'OWASP](https://openclassrooms.com/fr/courses/6179306-securisez-vos-applications-web-avec-lowasp)
- [Adoptez les API REST pour vos projets web](https://openclassrooms.com/fr/courses/6573181-adoptez-les-api-rest-pour-vos-projets-web)

## Outils nécessaires
- Un éditeur de code
- NodeJS

## Packages utilisés
- **bcrypt :** Bcrypt permet le hachage de mot de passe sécurisé.
- **express :** Express.js est un framework pour construire des applications web basées sur NodeJS.
- **jsonwebtoken :** Permet de générer un token pour l’authentification.
- **mongoose-unique-validator :** Permet de rendre un champ unique (dans notre projet les adresses e-mail).
- **multer :** Multer est middleware pour la gestion de téléchargement de fichiers.
- **mongoose :** MongoDB est une base de données qui stocke les données sous forme de documents, les données ressemblent à une structure de type JSON. Mongoose est un mappeur de document object, il nous permet de définir des objects avec un schéma typé.
- **body-parser :** Permet d'analyser les corps des requêtes entrantes dans un middleware.
- **dotenv :** Permet de charger des variables d’environnement grâce à un fichier nommé “.env”. Il permet de créer des configurations.
- **express-mongo-sanitize :** Permet de supprimer tous les caractères interdit, empêche l’injection d’opérateur MongoDB.
- **helmet :** Permet de protéger l’application web de certaines vulnérabilités bien connues du web en configurant les en-tête HTTP.
- **xss-clean :** Nettoie les données envoyés par l’utilisateur afin d’éviter les tentatives d’intrusion par le billet de bout de code.
- **nodemon :** Permet un redémarrage du processus à chaque sauvegarde du fichier automatiquement afin d'éviter de faire le redémarrage manuellement.
- **path :** Permet de travailler avec les répertoires (ou chemin de fichiers).
- **fs :** Système de fichiers, permet de gérer, créer et supprimer des fichiers.

## Commandes
```cmd
npm install
```
```cmd
node app.js || nodemon app.js
```

## Fichier de configuration (.env)
```cmd
PORT=3000
TOKEN_SECRET=''

# -- DB INFO
DB_USER=''
DB_PASSWORD=''
DB_COLLECTION=''
```

## Images
```cmd
N'oubliez pas de créer le dossier 'images' dans le backend.
```

## Compétences évaluées
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

## Définitions
**Middleware :** 
> Un middleware agit comme une passerelle entre les autres applications, outils et bases de données pour offrir aux utilisateurs des services unifiés. Il permet de définir une pile d’actions que l’on doit parcourir.

**Contrôleurs :** 
> Un contrôleur permet la gestion des données par le billet de fonction, il nous permet de créer plusieurs fonctions qui nous permettraient de récupérer, modifier, supprimer des données.

**Routes :** 
> Une route est une section de code Express qui associe un verbe HTTP (Get, Post, Put, Delete, etc), c’est un chemin/modèle d’URL et une fonction appelée pour gérer ce modèle.

**Models :** 
> Un modèle permet d'interagir avec les sources de données, effectuer la validation des données et représenter les relations entre les données.
