# Configuration
***Problématique: Comment configurer l'application ?***

> ⏰ 2025-01-29 : création du document

Quand je parle de configuration, cela signifie principalement de :
* Variables sensibles (clés API, mots de passe, ...)
* IoC configuration (Injection de Dépendance)

Dans une première version du projet, pour aller à l'essentiel nous nous sommes concentré sur deux types de configurations :
* [`.env`](#dotenv) pour les variables sensibles
* [`bootstrap`](#bootstrap) pour les services

