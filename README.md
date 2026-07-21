# Naeem Ahsan Portfolio

A production-oriented, single-page portfolio for Naeem Ahsan, Web Application Developer in Kuala Lumpur, Malaysia. The site uses an original editorial interface inspired by late-1990s independent publications: cream paper, high-contrast serif type, monospace metadata, thin rules, horizontal desktop chapters, and one red Portfolio Index.

The repository currently contains editable placeholder biography, employment, contact, project, portrait, CV, canonical-domain, and social data. Complete the [publication checklist](#publication-readiness-checklist) before deploying publicly.

## Design concept

Desktop visitors navigate a full-viewport horizontal publication. One chapter is expanded while the remaining chapters become narrow vertical controls; the red Portfolio Index remains fixed at the right edge. A publication rail remains visible at the bottom.

Below 1024px, the same semantic content becomes a normal vertical reading experience with a compact sticky header and full-screen Index. JavaScript enhances navigation, filters, and overlays, but the generated HTML retains all chapters and complete case studies.

The implementation adapts the composition in `design-reference/editorial-layout-reference.png`. It does not reuse the reference's identity, text, portrait, photography, or branding.

## Technology stack

- Astro 7 with static output and strict TypeScript
- Vue 3 Composition API with `<script setup lang="ts">`
- Tailwind CSS 4 through `@tailwindcss/vite`
- Astro Content Collections with Markdown project files and Zod validation
- Self-hosted Bodoni Moda Variable and IBM Plex Mono fonts through Fontsource
- Native CSS, History API, focus management, `inert`, and semantic HTML
- Cloudflare Pages-compatible output in `dist/`

There is no database, server-rendered runtime, custom backend, CMS, UI library, animation package, or Cloudflare adapter.

## Local setup

Requirements:

- Node.js 22.12.0 or newer
- npm

```bash
npm install
npm run dev
```

Open the local URL printed by Astro. Personal details and project content can be edited without changing the application architecture.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Astro development server. |
| `npm run check` | Run Astro and TypeScript diagnostics. |
| `npm run build` | Generate the static production site in `dist/`. |
| `npm run preview` | Serve the latest `dist/` build locally. |

Astro telemetry is disabled in these scripts so validation remains workspace-local and reproducible in restricted environments.

## Folder structure

```text
src/
├── components/
│   ├── astro/          # Static editorial UI and semantic wrappers
│   └── vue/            # Focused interaction controllers
├── content/projects/   # One Markdown file per project
├── data/               # Profile, navigation, social, skills and experience data
├── layouts/            # Document metadata and page shell
├── pages/              # Astro route composition and content query
├── sections/           # Six portfolio chapters
├── styles/             # Fonts, tokens, typography and chapter behavior
└── content.config.ts   # Content Collection schema

public/
├── images/placeholders/
├── og/
├── resume/
├── favicon.svg
└── robots.txt
```

## Astro and Vue responsibility split

Astro owns:

- All essential chapter and project HTML
- Markdown validation and build-time rendering
- Profile, experience, skills, navigation and social data
- Metadata, JSON-LD and static assets
- Semantic document order and no-JavaScript anchors

Vue owns only browser state:

- `ChapterAccordion.vue` — desktop chapter state, keyboard navigation, focus and chapter hashes
- `PortfolioIndexController.vue` — Index overlay, focus containment, Escape, scroll locking and shortcut
- `ProjectArchive.vue` — filters, preview selection, case-study overlays and project deep links

The Vue components control existing Astro-rendered elements through stable data attributes. They do not fetch or inject essential content.

## Desktop chapter behavior

At 1024px and wider:

- Introduction opens by default.
- Selecting a collapsed chapter expands it and collapses the previous chapter.
- Left/Right Arrow, Home and End move among chapter controls; Enter and Space activate buttons.
- User-activated changes move focus to the selected chapter heading.
- `#introduction`, `#work`, `#experience`, `#skills`, `#about`, and `#contact` are canonical chapter hashes.
- Back and Forward restore chapter state without forced focus changes.
- The red Index opens with its visible trigger or optional Cmd/Ctrl+K shortcut.
- The active panel scrolls internally when its content is taller than the viewport.
- Reduced-motion preferences remove the editorial sliding transition.

## Mobile and tablet behavior

Below 1024px:

- All chapters form a normal vertical document.
- The sticky header opens the shared full-screen Portfolio Index.
- Choosing a chapter closes the Index, updates the hash, scrolls to the section, and focuses its heading.
- Project thumbnails appear directly; visitors do not need a simulated-hover tap.
- Case studies use a full-screen sheet with a sticky close control.
- The mobile footer includes publication information and direct links.

The minimum validation matrix is 320, 375, 430, 768, 1024, 1280, 1440, and 1920px.

## URL and case-study behavior

Project deep links use `#work/<project-slug>`, for example:

```text
#work/valiram-corporate-platform
```

Opening a case study inside the site pushes a history entry, so Back closes it and Forward reopens it. Closing a direct-entry project returns to `#work`. Complete case-study articles remain in the static HTML and appear as normal in-document reports when JavaScript is unavailable.

## Accessibility notes

The site targets WCAG 2.2 AA where practical and includes:

- Semantic landmarks and logical heading order
- Skip-to-content link
- Visible keyboard focus
- Disclosure-style chapter buttons with control/panel relationships
- Keyboard chapter navigation
- Native `details`/`summary` experience and Q&A entries
- Programmatic filter state and a live result announcement
- Accessible Index and case-study overlays with Escape, focus containment and focus restoration
- Background inertness and scroll locking while overlays are open
- Reduced-motion handling
- Focus-equivalent project previews and direct touch thumbnails
- Explicit image dimensions and descriptive placeholder alt text
- State indicators that do not rely on colour alone

Before publication, test with keyboard navigation, browser zoom/reflow, reduced motion, and at least one screen reader using the final content and images.

## Add or edit a project

Create or update a Markdown file in `src/content/projects/`. Adding a project does not require editing the homepage.

Required frontmatter:

```yaml
---
title: Project title
slug: project-slug
summary: Concise archive summary.
year: 2026
category: WordPress
technologies:
  - WordPress
  - PHP
featured: true
order: 4
coverImage: /images/projects/project-cover.webp
nda: false
draft: false
placeholder: false
---
```

Optional fields include `startYear`, `endYear`, `gallery`, `projectUrl`, `repositoryUrl`, `clientName`, and `role`. Write the case study below the frontmatter using normal Markdown headings and lists.

After an update:

```bash
npm run check
npm run build
npm run preview
```

Project controls:

- Hide a project: set `draft: true`.
- Change order: edit the positive integer in `order`.
- Feature a project in the Index: set `featured: true`.
- Add a filter category: use a new `category` value; filters are generated automatically.
- Protect confidential work: set `nda: true`, omit sensitive URLs, and use approved generic wording.

## Edit experience

Update `src/data/experience.ts`. Each entry supports title, company, dates, location, summary, responsibilities, technologies, current-role state, order, and placeholder status.

Keep entries in the intended chronological order through the `order` field. Set `placeholder: false` only after the complete entry is approved for public use.

## Edit skills

Update `src/data/skills.ts`. Add, remove, or reorder groups and skill names in that one file. The Skills chapter generates its classified directory from the exported array.

## Replace profile data

Update `src/data/profile.ts` for:

- Name and professional title
- Kuala Lumpur location
- Public email
- Introduction and hero statement
- Biography and years of experience
- Primary focus and working style
- CV and portrait paths

Update `src/data/socialLinks.ts` for GitHub, LinkedIn and email links. Change `placeholder` to `false` only for approved public URLs; only approved external links are included in Person `sameAs` structured data.

Update the canonical-domain placeholder in `astro.config.mjs` and replace any placeholder SEO copy or assets before deployment.

## Replace the portrait

1. Add the approved image under `src/assets/portraits/` or `public/images/`.
2. Update `profile.portrait` in `src/data/profile.ts`.
3. Replace both placeholder alt strings in `src/sections/Introduction.astro` and `src/sections/About.astro` with an accurate description.
4. Use explicit dimensions and an appropriately compressed modern format.
5. Remove the placeholder caption after approval.

Do not use the portrait from the design reference.

## Replace the CV

1. Add the approved PDF to `public/resume/`.
2. Update `profile.cvUrl` in `src/data/profile.ts`.
3. Change visible “placeholder” labels in About, Contact, the Index and documentation.
4. Verify the file opens and downloads from the production build.

## Content update workflow

1. Add or edit a project Markdown file.
2. Add or replace project images.
3. Update frontmatter and remove placeholder flags only after approval.
4. Run `npm run check`.
5. Run `npm run build` and preview locally.
6. Commit the reviewed files.
7. Push the branch to GitHub.
8. Cloudflare Pages rebuilds the static site.

Example:

```bash
git add .
git commit -m "Add new portfolio project"
git push
```

## Cloudflare Pages deployment

This project uses Astro static output and needs no Cloudflare adapter.

1. Push the repository to GitHub.
2. In Cloudflare Pages, create a project and connect the GitHub repository.
3. Select the intended production branch.
4. Configure:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js: 22.12.0 or newer
5. Save and run the first deployment.
6. Verify the production URL, chapter hashes, project deep links, social metadata and placeholder checklist.

Pull requests and non-production branches can use Cloudflare preview deployments. Pushing the configured production branch triggers an automatic production rebuild.

## Custom domain and HTTPS

1. Replace `https://example.com` in `astro.config.mjs` with the approved canonical origin.
2. Update or replace `public/robots.txt` if a sitemap is added later.
3. Add the domain under the Pages project's custom-domain settings.
4. Follow Cloudflare's DNS ownership instructions.
5. Wait for the certificate to become active and verify HTTPS.
6. Confirm canonical, Open Graph and Twitter image URLs in the generated page source.

Do not publish while canonical metadata still points to `example.com`.

## Publication readiness checklist

- [ ] Replace the neutral portrait placeholder and alt text.
- [ ] Replace `hello@example.com` in profile and social data.
- [ ] Replace the GitHub root URL with Naeem's profile URL.
- [ ] Replace the LinkedIn root URL with Naeem's profile URL.
- [ ] Replace the CV text placeholder with the approved PDF.
- [x] Confirm location as Kuala Lumpur, Malaysia.
- [ ] Confirm current company, title and employment dates.
- [ ] Replace the biography, experience summary and Q&A answers.
- [ ] Confirm years of experience.
- [ ] Review all project titles, descriptions and responsibilities.
- [ ] Add approved project screenshots and accurate alt text.
- [ ] Add only verified project outcomes and metrics.
- [ ] Review NDA/confidentiality state for every project.
- [ ] Add public project/repository URLs where permitted.
- [ ] Replace the Open Graph placeholder image.
- [ ] Replace the `example.com` canonical domain.
- [ ] Re-run keyboard, screen-reader, responsive and reduced-motion checks with final content.
- [ ] Run `npm run check` and `npm run build` immediately before deployment.

## Future CMS options

Version one deliberately keeps content in Git. Possible future paths are:

- Decap CMS for a Git-backed editorial interface over the existing Markdown and data workflow.
- Sanity for hosted structured content if previewing, collaboration or richer relationships justify a remote service.

Neither CMS is installed. Any future CMS must preserve static fallback content, schema validation, performance and accessible interaction behavior.
