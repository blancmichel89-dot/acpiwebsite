# Nicobat — site vitrine + espace devis/factures

Application Next.js, hébergée sur **Netlify** (gratuit, usage commercial
autorisé, aucune carte bancaire requise), avec base de données **Firestore**
sur le plan **Spark** de Firebase (gratuit, aucune carte bancaire non plus).

> Changement par rapport à une version précédente : Google Cloud Run exige un
> compte de facturation (donc une carte bancaire) même pour un usage gratuit.
> Ce projet l'évite entièrement en séparant hébergement (Netlify) et base de
> données (Firebase Firestore, plan Spark).

## Ce qui est fonctionnel dès maintenant

- Site vitrine (`/`, `/realisations`, `/contact`)
- Espace pro (`/pro`) : clients, devis, factures — stockés dans Firestore
- Numérotation séquentielle reprenant la série papier existante (configurable dans `/pro/settings`, ex : reprendre à 192 après le "Devis 191")
- Paramètres entreprise (`/pro/settings`) : adresse, téléphone, email, SIRET, TVA
- Page d'impression (`/pro/documents/[id]/print`) fidèle au modèle réel de Nicolas
- Correcteur orthographique du navigateur (français) sur les champs texte
- Gestion des lignes, TVA, acompte (% ou montant fixe) avec solde restant dû
- Conversion devis → facture

## Mode opératoire — dans l'ordre

### 1. Créer le projet Firebase (base de données, gratuit)
1. Aller sur **console.firebase.google.com** → "Ajouter un projet" → nommer (ex: `nicobat`)
2. Rester sur le plan **Spark** (proposé par défaut, aucune carte demandée)
3. Dans le menu du projet : **Build > Firestore Database** → Créer une base → mode **Natif** → région **eur3 (Europe)**
4. Déployer les règles de sécurité fournies (`firestore.rules`) : dans l'onglet "Règles" de Firestore, coller le contenu du fichier et publier

### 2. Générer la clé d'accès à Firestore
1. Icône ⚙️ (Paramètres du projet) → onglet **Comptes de service**
2. Cliquer **Générer une nouvelle clé privée** → télécharge un fichier `.json`
3. L'encoder en base64 (voir `.env.example` pour la commande) — cette valeur ira dans Netlify à l'étape 4

### 3. Créer un compte Netlify (hébergement, gratuit)
1. Aller sur **netlify.com** → créer un compte (email ou GitHub, pas de CB)
2. Installer la CLI Netlify pour déployer directement depuis ce dossier, sans passer par GitHub :
   ```bash
   npm install
   npx netlify-cli login
   npx netlify-cli init        # crée le site sur Netlify
   npx netlify-cli deploy --prod
   ```
   (Si tu préfères, je peux te guider commande par commande, ou tu peux ouvrir ce dossier dans Claude Code et lui demander de lancer ces commandes.)

### 4. Configurer les variables d'environnement sur Netlify
Dans le tableau de bord Netlify du site → **Site configuration > Environment variables**, ajouter :
- `FIREBASE_SERVICE_ACCOUNT_KEY` = la valeur base64 générée à l'étape 2
- Les variables Gmail restent vides pour l'instant (phase 2)

Puis redéployer (`npx netlify-cli deploy --prod`) pour que les variables soient prises en compte.

### 5. Remplir les paramètres entreprise
Ouvrir l'URL du site (ex: `https://nicobat.netlify.app`) → `/pro/settings` → renseigner
adresse, téléphone, email, SIRET, TVA, et mettre le compteur de devis à **192**
pour reprendre la série existante de Nicolas.

### 6. Tester
Créer un client, un devis, vérifier le rendu via "Imprimer / PDF". L'envoi
automatique par email n'est pas encore actif — c'est normal, voir phase 2.

## Phase 2 — Gmail (envoi automatique des devis/factures)

Le code est prêt (`lib/gmail.js`, `app/api/send-email/route.js`), il manque
la configuration côté Google Cloud (aucune carte bancaire requise pour ces
étapes, contrairement à Cloud Run) :

1. Dans la console Google Cloud, le projet lié à Firebase existe déjà
   (même nom) — pas besoin d'en créer un nouveau
2. **APIs & Services > Bibliothèque** → activer "Gmail API"
3. **APIs & Services > Écran de consentement OAuth** → nom "Nicobat", scope `gmail.send`
4. **APIs & Services > Identifiants** → créer un identifiant OAuth "Application Web" → récupérer `client_id` / `client_secret`
5. Faire une fois le flux d'autorisation avec le compte Gmail de Nicolas pour obtenir un `refresh_token`
6. Renseigner les 4 variables Gmail dans Netlify (étape 4 ci-dessus) et redéployer

## Structure du projet

```
app/
  page.js                 Accueil vitrine
  realisations/page.js
  contact/page.js
  pro/                     Espace pro (non protégé pour l'instant)
    documents/page.js       Liste devis/factures
    documents/[id]/page.js  Éditeur
    documents/[id]/print/page.js  Version imprimable / PDF
    clients/page.js
    settings/page.js        Paramètres entreprise
  api/
    clients/route.js
    documents/route.js
    documents/[id]/route.js
    settings/route.js
    send-email/route.js     Squelette Gmail (phase 2)
lib/
  firebaseAdmin.js         Connexion Firestore via clé de compte de service
  gmail.js                 Squelette envoi Gmail (phase 2)
  models.js                Modèle de données + statuts
  totals.js                Calculs (HT/TVA/TTC/acompte)
firestore.rules
netlify.toml               Config de déploiement Netlify
.env.example                 Variables à renseigner
```
