# Le site ne se met pas à jour en dev — quoi faire

## Ce qui a été fait dans le projet

1. **Racine du projet en dur** dans `next.config.ts` : le chemin absolu de ton projet est écrit en dur pour que Next.js surveille le bon dossier (et pas `C:\Users\crypt` à cause du `package-lock.json` du parent).
2. **Bannière de test** en haut de la page d’accueil : un bandeau rouge **« TEST RELOAD WORKING »**. Si tu le vois, c’est que la bonne app est servie.
3. **Script alternatif** : `npm run dev:webpack` lance le dev sans Turbopack (avec Webpack). À tester si le problème continue.

---

## À faire dans l’ordre (une seule fois)

### Étape 1 : Tout arrêter
- Ferme le serveur de dev (Ctrl+C dans le terminal).
- Ferme l’onglet du site (localhost:3000) dans le navigateur.

### Étape 2 : Supprimer le cache Next
Dans le terminal, dans le dossier du projet :

```bash
cd C:\Users\crypt\Desktop\MDS\maison-des-saveurs-site
Remove-Item -Recurse -Force .next
```

(Si la commande ne marche pas, supprime à la main le dossier `.next` dans le projet.)

### Étape 3 : Lancer le dev depuis le bon dossier
Toujours dans le même dossier :

```bash
npm run dev
```

Attends le message du type « Ready in … » et « Local: http://localhost:3000 ».

### Étape 4 : Ouvrir le site sans cache navigateur
- Ouvre une **fenêtre de navigation privée** (Ctrl+Shift+N dans Chrome).
- Va sur : **http://localhost:3000**

### Étape 5 : Vérifier que ça charge la bonne version
- Tu dois voir en haut de la page un **bandeau rouge** avec le texte **« TEST RELOAD WORKING »**.
- Si tu ne le vois pas : tu regardes peut-être une ancienne version (autre onglet, autre port, ou cache). Refais les étapes 1 à 4.

### Étape 6 : Tester une modification
- Ouvre par exemple `app/components/VisionHero.tsx`.
- Change un mot dans le titre (ex. « Maison des Saveurs » → « Maison des Saveurs TEST »).
- Sauvegarde (Ctrl+S).
- Regarde la fenêtre de navigation privée : la page doit se mettre à jour toute seule (sans F5) en quelques secondes.

Si ça se met à jour : le dev fonctionne. Tu pourras enlever plus tard le bandeau « TEST RELOAD WORKING » dans `app/page.tsx`.

---

## Si ça ne se met toujours pas à jour

### Option A : Essayer sans Turbopack (Webpack)
Arrête le serveur (Ctrl+C), puis lance :

```bash
npm run dev:webpack
```

Ouvre à nouveau http://localhost:3000 en navigation privée et refais un test de modification. Si avec `dev:webpack` les changements apparaissent, le souci vient de Turbopack.

### Option B : Enlever le lockfile du dossier parent
Un autre `package-lock.json` dans `C:\Users\crypt` peut faire que Next choisisse le mauvais dossier. Tu peux le renommer pour tester :

- Va dans `C:\Users\crypt`
- Renomme `package-lock.json` en `package-lock.json.old`
- Relance `npm run dev` depuis le projet et refais le test.

### Option C : Vérifier que tu es bien sur le bon site
- L’URL doit être exactement **http://localhost:3000** (pas 3001, pas un autre domaine).
- Si tu as déjà déployé sur Vercel/Netlify, ne regarde pas l’URL de prod en pensant que c’est le dev.

---

## En résumé

- Le problème venait du fait que Next.js (Turbopack) prenait comme racine le dossier **parent** (`C:\Users\crypt`) à cause d’un autre `package-lock.json`, donc il ne surveillait pas ton projet et ne recompilait pas quand tu modifiais les composants.
- La config a été modifiée pour forcer la racine sur le chemin absolu de ton projet.
- En suivant les étapes ci-dessus (surtout : lancer le dev depuis le bon dossier, ouvrir en navigation privée, vérifier le bandeau « TEST RELOAD WORKING »), les modifications devraient maintenant s’afficher correctement.
