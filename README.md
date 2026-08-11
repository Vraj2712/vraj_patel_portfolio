# Vraj Patel — Portfolio

A personal resume / portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS,
shadcn/ui, and GSAP.

---

## 1. Editing your content (the only file you need)

Every word on the site (except the SEO boilerplate in `app/layout.tsx`) comes from one file:

```
data/portfolio.ts
```

Open it and you'll see a big comment block at the top explaining exactly how to edit it in
plain language. In short:

- **Name, role, location, tagline, links** — edit the plain fields near the top.
- **Add a job** — copy one of the objects inside the `experience` array and change the text.
  Keep the newest job first.
- **Add a project** — copy one of the objects inside the `projects` array. `tags` are the small
  pill labels on the card; `links` is optional (leave it out if you don't have a public link yet).
- **Add a school** — copy one of the objects inside the `education` array.
- **Reorder anything** — just reorder the objects in the array. They render top to bottom.

Save the file. If you're running the site locally (`npm run dev`), it updates instantly. If it's
already deployed, push the change to GitHub (see below) and Vercel redeploys automatically.

### Swapping your photo

Replace `public/photo.jpg` with a new file (keep the same filename `photo.jpg`, or update the
`photo` path in `data/portfolio.ts` to match). A portrait-orientation photo (taller than wide)
works best since the hero frame is a 3:4 rectangle.

### Replacing your resume

Replace `public/resume.pdf` with your updated PDF (keep the filename `resume.pdf`, or update the
`resumeFile` path in `data/portfolio.ts`). This is the file the "Resume" button in the navbar
downloads.

### Things flagged as TODO

A couple of items from the resume didn't have enough information to fill in safely (no invented
facts):

- **Mini Amazon project** has no public repo/live link in `data/portfolio.ts` — add one to its
  `links` array once you have it, or the card will keep showing a "TODO" note.

Search the codebase for `TODO` to find these spots again at any time.

---

## 2. Running it locally

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check that everything builds cleanly before deploying:

```bash
npm run build
```

---

## 3. Deploying to Vercel

### Step 1 — Push this project to GitHub

If this folder isn't a git repo yet:

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new empty repository on [github.com/new](https://github.com/new) (don't initialize it
with a README), then connect and push:

```bash
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```

### Step 2 — Import the repo on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with your GitHub account.
2. Click **Import** next to the repository you just pushed.
3. Vercel auto-detects Next.js — leave the build settings as-is (Build Command:
   `next build`, Output: default).
4. Click **Deploy**.

That's it — no extra configuration needed. Vercel builds and gives you a live URL
(`your-project.vercel.app`), and you can attach a custom domain later from the project's
**Settings → Domains** tab.

### Step 3 — Keep it updated

Every time you push to the `main` branch, Vercel automatically rebuilds and redeploys the live
site:

```bash
git add .
git commit -m "Update resume and add new project"
git push
```

### Optional: correct social-preview links

The site generates its own Open Graph / social-share image and metadata URLs from
`NEXT_PUBLIC_SITE_URL` (falls back to Vercel's preview URL automatically). Once you have a
production domain, set it in Vercel under **Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Redeploy after adding it so link previews (Slack, X, LinkedIn, iMessage) point to the right URL.

---

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) for UI primitives (Button, Card, Badge, Sheet, Separator)
- [GSAP](https://gsap.com) + `@gsap/react` for the hero entrance and scroll reveals
- [next-themes](https://github.com/pacocoursey/next-themes) for the light/dark toggle
- [Phosphor Icons](https://phosphoricons.com) for iconography

## Project structure

```
data/portfolio.ts        ← all editable content lives here
app/                      ← pages, layout, SEO metadata, favicon/OG image generation
components/sections/      ← Hero, About, Skills, Experience, Projects, Education, Contact
components/layout/        ← Navbar, Footer
components/ui/            ← shadcn/ui primitives
components/reveal.tsx     ← GSAP scroll-reveal wrapper components
public/photo.jpg          ← your portrait
public/resume.pdf         ← your downloadable resume
```
