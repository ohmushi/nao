# Configuration
***Problématique: Comment configurer l'application ?***

> ⏰ 2025-01-29 : création du document

Quand je parle de configuration, cela signifie principalement de :
* Variables sensibles (clés API, mots de passe, ...)
* IoC configuration (Injection de Dépendance)

Dans une première version du projet, pour aller à l'essentiel nous nous sommes concentré sur deux types de configurations :
* [`.env`](#dotenv) pour les variables sensibles
* [`bootstrap`](#bootstrap) pour les services

## Dotenv
Le dotenv (fichier `.env`) très pratique et  nativement prit en charge par vite et sveltekit. Cela permet un developpement rapide et efficace, tout en restant sécurisé.
Le fichier doit rester hors de git (.gitignore) et s'il est passé entre développeur, doit être fait de manière sécurisée.

En production, les variables d'environnement doivent être passées au conteneur lors du démarrage de celui ci. Cela peut s'opérer de différentes manières, avec des secrets si l'on a un orchestrateur (k8s, swarm, ...), ou directement par argument (docker run -e API_KEY='abcd'), ou par un intermédiaire comme docker compose.

### Vite
En front avec Vite sous la forme de 
`const public_api_key = import.meta.env.VITE_PUBLIC_API_KEY`.

> NB : pour des raisons de sécurité, seules les variables d'environnement préfixées par VITE_ sont accessibles en front. Voir la [documentation](https://vite.dev/guide/env-and-mode#env-files)

### Sveltkit
Et côté serveur avec Sveltekit sous la forme de :
```ts
import { env } from '$env/dynamic/private';

const secret_api_key = env.STRIPE_SECRET_API_KEY
```
> NB : ici on utilise les varibles d'environnement de manière [dynamique privée](https://svelte.dev/tutorial/kit/env-static-private) mais elles peuvent être dynamique ou statique et privée ou publique. Voir les [tutoriaux](https://svelte.dev/tutorial/kit/env-static-public).

## Bootstrap
