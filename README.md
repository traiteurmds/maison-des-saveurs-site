# Maison Des Saveurs — Site traiteur

Site Next.js du traiteur **Maison Des Saveurs** (MDS Traiteur), basé à Villeurbanne / Lyon.

## Démarrage

```bash
npm install
npm run dev
```

Production : déployé sur [Vercel](https://vercel.com) — HTTP/2 et HTTP/3 gérés automatiquement par la plateforme.

```bash
npm run lint
npm run build
```

## Variables d'environnement

### EmailJS (formulaire contact)

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

### Cloudflare Turnstile (anti-spam formulaire)

Obtenir les clés sur [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

- **Site key** : publique, utilisée côté client (`TurnstileField`, mode invisible).
- **Secret key** : serveur uniquement (`app/lib/turnstile.ts`, route `/api/contact`).
- Sans clés configurées, la vérification Turnstile est ignorée (dev local).
- Flux : le client obtient un token → `POST /api/contact` vérifie Turnstile + valide les champs → si OK, EmailJS envoie l'email.

### Vercel Analytics

Chargé uniquement après consentement cookies (`ConsentAwareAnalytics`).

## SEO & fichiers publics

- `public/llms.txt` — résumé pour assistants IA
- `app/sitemap.ts` — sitemap (sans `/about`)
- `app/robots.ts` — robots.txt
- Schema.org JSON-LD dans `app/layout.tsx` via `app/lib/structured-data.ts`

## Email & délivrabilité (DNS OVH)

**DMARC** : à configurer côté DNS OVH pour améliorer la délivrabilité des emails (`contact.mds.traiteur@gmail.com`). Ce réglage ne se fait pas dans le code du site.

Exemple de records à ajouter chez OVH (adapter selon votre configuration SPF/DKIM existante) :

- SPF : autoriser les serveurs d'envoi légitimes
- DKIM : signature Gmail/Google Workspace si utilisé
- DMARC : politique `p=none` puis `p=quarantine` après tests

## Backlinks — checklist (hors code)

À développer manuellement pour renforcer le SEO local :

- [ ] Fiche [Google Business Profile](https://share.google/uiBTniokmuQrw7QzH) à jour (photos, avis, horaires)
- [ ] [Instagram](https://www.instagram.com/mds.traiteur69/)
- [ ] [TikTok](https://www.tiktok.com/@mds.traiteur)
- [ ] Annuaires locaux Lyon / Villeurbanne (PagesJaunes, Yelp, etc.)
- [ ] Pages partenaires (salles, wedding planners, décorateurs)
- [ ] Associations, universités, réseaux événementiels
- [ ] LinkedIn entreprise — uniquement si la page est créée et maintenue

Ne pas lister de réseaux sociaux inexistants (Facebook, YouTube, X…) sur le site.

## Stack

- Next.js 16, React 19, Tailwind CSS v4
- EmailJS, Cloudflare Turnstile, Vercel Analytics (consent-based)
- Framer Motion, palette ivoire / noir / doré
