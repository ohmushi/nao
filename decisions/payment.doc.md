# Paiement
***Problématique: Quelles solution utiliser pour gérer le paiement sur nao ?***

> ⏰ 2025-01-14 : création du document

Stripe est une solution qui fonctionne très bien, qui est fiable, qui est bien documentée, qui s'intègre facilement et surtout qui a les fonctionnalités dont nous avons besoin.


Actuellement, les fonctionnalités dont nous avons besoin sont :
* stocker les informations bancaires de l'utilisateur pour le débiter s'il n'a pas pris sa décision à temps. Cela correspond à un `SetupIntent` dans Stripe. Voir [Stocker les informations bancaire du débiteur](#stocker-les-informations-bancaire-du-débiteur).
* stocker les information des bénéficiaires à qui transferer l'argent dans la continuité du point précédent. A COMPLETER
* effectuer le paiement à une date précise (avec l'autorisation préalable de l'utilisateur).

## Stocker les informations bancaire du débiteur
Concretement le formulaire se saisie des informations bancaires est un formulaire Stripe embarqué (embedded) sur la route `me/payment`.

> 💡 Documentation suivie pour la mise en place du formulaire Stripe : [Set up future payments](https://docs.stripe.com/payments/save-and-reuse?platform=web&ui=embedded-form) 

A l'arrivée de l'utilisateur sur le formulaire, nous créons une CheckoutSession côté Stripe, nous ne la stockons pas, elle sert à connecter le formulaire et notre compte Stripe. Cette création se fait via un appel http côté serveur `POST` `me/payment`.
Lors de la création de cette Session, nous renseignons une url de redirection, c'est l'url sur laquelle le navigateur est redirigé lorsque l'utilisateur a terminé ou annulé la saisie de ses informations.
Une fois que la saisie est terminée, nous somme redirigés vers la même page mais avec le querry param `session_id`. Si ce paramètre est rempli, nous envoyons une requête http `PUT` `me/payment` qui a pour but de récupérer l'id de SetupIntent qui a été créé chez Stripe, et de le stocker, c'est le SetupIntent qui permettra au final d'effectuer des paiements futurs.

Les deux requêtes http `POST/PUT` `me/payment` sont gérés dans le fichier +server.ts de la route.

Une interface `Payment` est utilisée par dessus Stripe, mais le processus est tout de même formtement polarisé par les processus Stripe (la création de la session, la redirection, recupération de la session, etc) avec une implémentation pour Stripe.

## Stocker les informations bancaire des bénéficiaires
*⏰ 2025-01-17*

Le formulaire de saisie des informations d'un nouveau bénéficiaire sur la route `me/beneficiaries/new` est un formulaire avec le nom et l'email du bénéficiaire, et son IBAN.
Le champ de saisie de l'IBAN est un `element` Stripe (iframe), qui permet la saisie et la validation de manière robuste.
Lorsque l'on valide le formulaire, depuis le client, on créer un `PaymentMethod` Stripe avec l'IBAN, puis on enregistre l'id de ce PaymentMethod.

> 💡 Documentation suivie pour la mise en place de la création du PaiementMethod: [create PaiementMethod](https://docs.stripe.com/js/payment_methods/create_payment_method)

