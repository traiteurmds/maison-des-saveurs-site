# Why the dev server was not updating

## Root cause

**Next.js (Turbopack) was using the wrong project root.**

1. Your real project is:
   ```
   C:\Users\crypt\Desktop\MDS\maison-des-saveurs-site
   ```
   This folder has its own `package-lock.json` and `app/` with `page.tsx`, components, etc.

2. There is **another** `package-lock.json` in the parent folder:
   ```
   C:\Users\crypt\package-lock.json
   ```

3. When Turbopack starts, it looks for lockfiles to infer the project root. It found **two** lockfiles and chose the **parent** directory (`C:\Users\crypt`) as the root.

4. With the root set to `C:\Users\crypt`:
   - The **watched folder** was the parent, not `maison-des-saveurs-site`.
   - Build and module resolution could use the wrong tree.
   - Changes inside `maison-des-saveurs-site` were **not** in the watched root, so **no recompile** and **no Fast Refresh** when you edited components.

So the site did not update because **the dev server was not watching your project folder**; it was using the parent as root.

---

## What was changed

### 1. `next.config.ts`

- **`turbopack.root`** is now set to the directory that contains `next.config.ts` (i.e. your project root), using **`__dirname`**.
- That path is **independent** of where you run `npm run dev` from and **overrides** Turbopack’s lockfile-based root.
- Result: Turbopack watches and builds from `maison-des-saveurs-site` only.

### 2. Test banner in `app/page.tsx`

- A red banner with the text **"TEST RELOAD WORKING"** was added at the top of the home page.
- If you see it after starting the dev server and opening http://localhost:3000, the app being served is the one from this project and the config is in use.
- You can remove this block once you’ve confirmed Fast Refresh works.

### 3. Single `package-lock.json` in the project

- There is **one** `package-lock.json` **inside** the project:  
  `maison-des-saveurs-site\package-lock.json`.
- The extra one in `C:\Users\crypt` is what triggered the wrong root; we don’t rely on lockfile detection anymore because `turbopack.root` is set explicitly.

---

## What you should do

1. **Stop the dev server** (Ctrl+C).

2. **Start it from the project folder:**
   ```bash
   cd c:\Users\crypt\Desktop\MDS\maison-des-saveurs-site
   npm run dev
   ```

3. Open **http://localhost:3000** and check:
   - The red banner **"TEST RELOAD WORKING"** appears at the top.

4. **Confirm Fast Refresh:**
   - Edit a component (e.g. change a word in `app/components/VisionHero.tsx`), save.
   - The browser should update within a few seconds without a full reload.

5. **Optional:** Remove the test banner from `app/page.tsx` once everything works.

6. **Optional:** If you don’t need the parent `package-lock.json`, you can remove or rename it so only the project lockfile exists. The explicit `turbopack.root` already fixes the issue even if both lockfiles remain.

---

## Summary

| Before | After |
|--------|--------|
| Turbopack root = `C:\Users\crypt` (parent) | Turbopack root = `maison-des-saveurs-site` (project) |
| Watched folder = parent | Watched folder = project |
| Edits in project not seen → no recompile | Edits in project trigger recompile and Fast Refresh |

The website was not updating because **the dev server was using the wrong root directory** (parent folder with another lockfile). Setting **`turbopack.root`** in `next.config.ts` to the project directory fixes this so changes in your components update immediately on localhost.
