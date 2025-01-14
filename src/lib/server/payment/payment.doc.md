# Paiement
***Problématique: Quelles solution utiliser pour gérer le paiement sur nao ?***

> ⏰ 2025-01-14 : création du document

Stripe est une solution qui fonctionne très bien, qui est fiable, qui est bien documentée, qui s'intègre facilement et surtout qui a les fonctionnalités dont nous avons besoin.


Actuellement, les fonctionnalités dont nous avons besoin sont :
* stocker les informations bancaires de l'utilisateur pour le débiter s'il n'a pas pris sa décision à temps. Cela correspond à un `SetupIntent` dans Stripe.
* stocker les information des bénéficiaires à qui transferer l'argent dans la continuité du point précédent. A COMPLETER

Concretement le formulaire se saisie des informations bancaires est un formulaire Stripe embarqué (embedded) sur la route `me/payment`.

> 💡 Documentation suivie pour la mise en place du formulaire Stripe : [Set up future payments](https://docs.stripe.com/payments/save-and-reuse?platform=web&ui=embedded-form) 

A l'arrivée de l'utilisateur sur le formulaire, nous créons une CheckoutSession côté Stripe, nous ne la stockons pas, elle sert à connecter le formulaire et notre compte Stripe. Cette création se fait via un appel http côté serveur `POST` `me/payment`.
Lors de la création de cette Session, nous renseignons une url de redirection, c'est l'url sur laquelle le navigateur est redirigé lorsque qu'ils ont finit ou annulé la saisie de leur informations.
Donc une fois que la saisie est terminée, nous somme redirigés vers la même page mais avec le querry param `session_id`. Si ce paramètre est rempli, nous envoyons une requête http `PUT` `me/payment` qui a pour but de récupérer l'id de SetupIntent qui a été crée chez Stripe, et de le stocker, c'est le SetupIntent qui permettra au final d'effectuer des paiements futurs.

Les deux requêtes http `POST/PUT` `me/payment` sont gérés dans le fichier +server.ts de la route.

Une interface `Payment` est utilisée par dessus Stripe, mais le processus est tout de même très dirigé par Stripe (création de la session, la redirection, recupérer la session).
