# Stockage

***Problématique: Comment stocker les données sur Nao ?***

> ⏰ 2025-01-17 : création du document

## Json
Dans un premier temps pour la première phase de développement, pour ne pas à avoir à mettre en place de base de données, nous stockons les données dans des fichiers JSON.
Pour accéder aux données, nous passons par des interfaces repositories, avec des implémentations pour le json.

## Sécurité
La solution Json est très peu sécurisée, car nous stockons des données de paiement, même si nous ne les stockons pas directement et que ce ne sont que des références à des éléments Stripe.
