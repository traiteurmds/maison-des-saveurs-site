# Diagnostic : modifications non visibles en dev

## Ce qui a été fait

### 1. Cache supprimé
- Dossier **`.next`** supprimé (cache de build Next.js)
- Dossier **`node_modules/.cache`** supprimé s’il existait

### 2. Cause identifiée : racine Turbopack
Next.js affichait l’avertissement :
```
We detected multiple lockfiles and selected the directory of C:\Users\crypt\package-lock.json as the root directory.
```
Un **package-lock.json** dans un dossier parent (`C:\Users\crypt`) faisait que Turbopack prenait ce dossier comme racine au lieu du projet. Les changements étaient donc compilés dans le mauvais contexte.

**Correction :** dans `next.config.ts`, ajout de :
```ts
turbopack: {
  root: path.resolve(process.cwd()),
},
```
Ainsi, la racine du projet est bien celle depuis laquelle vous lancez `npm run dev`.

### 3. Vérifications effectuées
- Une seule page d’accueil : **`app/page.tsx`** (pas de `pages/index.tsx` en conflit)
- Pas de `export const dynamic = "force-static"` ni `revalidate` dans `app/`
- Imports dans `page.tsx` : VisionHero, AppleScrollStory, etc. depuis `./components/...` (correct)
- `layout.tsx` enveloppe bien le contenu avec Navbar, Footer, PageTransition

### 4. Test visuel
Un bloc **« TEST RELOAD »** (bandeau rouge) a été ajouté en haut de `app/page.tsx`.  
Si vous le voyez après avoir rechargé la page, le rechargement du code fonctionne.

**À faire après vérification :** supprimer ce bloc dans `app/page.tsx` (rechercher « TEST RELOAD »).

---

## Étapes à suivre de votre côté

1. **Arrêter le serveur de dev** (Ctrl+C dans le terminal où tourne `npm run dev`).

2. **Relancer depuis la racine du projet :**
   ```bash
   cd c:\Users\crypt\Desktop\MDS\maison-des-saveurs-site
   npm run dev
   ```

3. **Ouvrir** http://localhost:3000

4. **Vérifier** que le bandeau rouge « TEST RELOAD » s’affiche en haut.

5. **Hard refresh** si besoin : `Ctrl + Shift + R` (ou navigation privée) pour éviter le cache du navigateur.

6. **Modifier un composant** (par ex. texte dans `VisionHero.tsx`), sauvegarder : la page doit se mettre à jour (Fast Refresh).

7. **Supprimer le bloc TEST RELOAD** dans `app/page.tsx` une fois que tout est OK.

---

## Si le problème continue

- Lancer `npm run dev` **toujours depuis** `maison-des-saveurs-site` (là où se trouve `package.json`).
- Vérifier qu’aucun autre serveur (Vercel preview, build statique) ne répond sur le même port.
- Tester en navigation privée pour écarter le cache navigateur.
- Consulter le terminal après une modification : Next doit afficher une recompilation (ex. « Compiled in … »).
