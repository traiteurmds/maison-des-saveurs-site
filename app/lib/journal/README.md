# Le Journal de Maison Des Saveurs

Chaque article est un fichier dans `articles/`. Pour en publier un nouveau :

1. Copier un article existant dans `articles/` et changer `slug` (adresse courte, sans accents), `rubrique`, titres, textes et `publishedAt` (date réelle de mise en ligne, format AAAA-MM-JJ).
2. L'ajouter à la liste `ARTICLES` dans `index.ts`, et retirer son titre des sujets « à paraître » de sa rubrique (`upcoming`).
3. N'utiliser que des photos réelles de Maison Des Saveurs (`public/images/realisations`), déclarées dans `images.ts` avec un texte alternatif descriptif.
4. `updatedAt` ne se renseigne que lors d'une vraie mise à jour du contenu.

Balisage possible dans les textes : `[texte du lien](/adresse)`, `*italique*`, `**gras**`.
Les espaces insécables avant `: ; ? !` sont ajoutées automatiquement.

La page `/journal`, le plan du site (`sitemap.xml`) et les données structurées se mettent à jour seuls.
