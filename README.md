# Julius Jojo C. Sabulao, Jr. — Portfolio

A personal portfolio website for internship applications. It follows a simple story: who I am
(Hero, About), what I can do (Focus, Skills, Toolkit), what I have built (Projects,
Certifications), and how to reach me (Let’s Connect, with email, LinkedIn, GitHub, and resume).

The site is fully static: no database, no backend, no login, no API keys, and no build step.

## Technologies Used

- HTML5 (semantic markup)
- CSS3 (custom properties, Flexbox, Grid, media queries)
- Vanilla JavaScript (mobile menu, active-link highlighting, scroll reveal)

No frameworks, packages, web fonts, or CDNs are used, so the page works offline (external links aside).

## Project Structure

```text
portfolio/
├── index.html      # All page content and sections
├── style.css       # Styles, colors, and responsive layout
├── script.js       # Mobile menu, active nav link, reveal animation, resume check
├── README.md       # This file
└── assets/
    ├── Julius-Sabulao-Resume.pdf   # Resume (Download Resume buttons)
    ├── profile.jpg                            # Hero photo (480×480, web-optimized)
    └── badges/                                # Certification badge images
```

All paths are relative (for example `assets/profile.jpg`, not `/assets/profile.jpg`), so the site
works when opened directly from disk and when hosted at any URL.

## Run Locally

**Option 1:** Double-click `index.html` to open it in your browser.

**Option 2:** Use a local server (recommended, since it matches how the site behaves online):

```bash
cd portfolio
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy to GitHub Pages

1. Create a new **public** repository on GitHub.
   - Name it `clstljr.github.io` to publish at `https://clstljr.github.io`, or
   - use any name (for example `portfolio`) to publish at `https://clstljr.github.io/portfolio/`.
2. Upload the **contents** of the `portfolio` folder (`index.html`, `style.css`, `script.js`,
   `README.md`, and `assets/`) to the root of the repository. You can drag them into
   **Add file → Upload files**, or use git:

   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/clstljr/clstljr.github.io.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**. Under **Build and deployment**, choose
   **Deploy from a branch**, select `main` and `/ (root)`, then click **Save**.
4. Wait a minute or two, then open your site's URL.

## Deploy to Vercel

The site is plain static files, so Vercel serves it as-is. No `vercel.json`, build command, or
environment variables are needed.

**Option A: from GitHub (recommended, redeploys on every push)**

1. Push the contents of the `portfolio` folder to a GitHub repository (see the git commands above).
2. Sign in at <https://vercel.com> and choose **Add New… → Project**, then import that repository.
3. Use these settings:
   - **Framework Preset:** Other
   - **Root Directory:** the folder that contains `index.html` (leave as `./` if `index.html` is at
     the top of the repository; choose `portfolio` if the repository contains the `portfolio` folder)
   - **Build Command:** leave empty
   - **Output Directory:** leave empty
   - **Install Command:** leave empty
4. Click **Deploy**. Your site will be live at `https://<project-name>.vercel.app`.

**Option B: from the command line**

```bash
cd portfolio
npx vercel
```

Answer the prompts (link to your account, keep the detected settings with no build command), then
run `npx vercel --prod` to publish the production URL.

**Netlify:** drag the `portfolio` folder into Netlify Drop. No build command is needed.

## Replace the Resume PDF

1. Export your CV as a PDF.
2. Name it exactly `Julius-Sabulao-Resume.pdf`.
3. Put it in the `assets/` folder, replacing any older version.

If you use a different file name, update both links with the class `js-resume-link`
in `index.html` (one in the Hero section, one in the Contact section).

When the site is served over http/https and the PDF is missing, `script.js` hides the resume
buttons so visitors never hit a broken link. They appear automatically once the PDF is added.

## Replace the Profile Photo

1. Use a square photo with your face near the center.
2. Resize it to about 480×480 pixels and save it as a JPG (this keeps the page fast).
3. Save it as `assets/profile.jpg`, replacing the current file.

If the photo is missing, the image removes itself and the hero still looks clean.

## Update Project Links and Personal Information

All content lives in `index.html`. Each section is marked with a comment such as
`<!-- ===== Projects ===== -->`.

- **Name, role, intro:** the Hero section near the top of `<main>`.
- **Page title and search/social description:** the `<title>`, `meta name="description"`,
  and `og:` tags in `<head>`.
- **About text and quick facts:** the About section.
- **"How can I help?":** the Focus section. Each `<li class="plate-item">` is one task, with its tools in `<p class="plate-tools">`.
- **Hero "at a glance" panel:** the `<aside class="glance">` block.
- **Skills and levels:** the "Core Skills" list. Change the label inside `<span class="level ...">`,
  and use `level-beginner` or `level-competent` for the matching style.
- **Toolkit:** the Programming, Development Tools, and Other Tools lists. Each `<li>` is one tag.
- **Projects:** each project is one `<article class="project-card">`. Edit its type, name,
  description, role, tags, and the `href` of its `project-link`. To add a project, copy an
  existing `<article>` block and edit it.
- **Certifications:** each certification is one `<li class="cert-card">`, with its badge image
  in `assets/badges/` and its date in `<p class="cert-date">`.
- **Email, LinkedIn, GitHub:** search `index.html` for `mailto:`, `linkedin.com`, and
  `github.com/clstljr`, and update every match (they appear in the Hero and Contact sections).
- **Colors:** edit the palette variables at the top of `style.css` (`--background`, `--surface`,
  `--surface-muted`, `--primary`, `--primary-dark`, `--text`, `--muted-text`, `--border`,
  `--accent`). Keep `--accent` (bronze) for decoration only; it is too light for text.
