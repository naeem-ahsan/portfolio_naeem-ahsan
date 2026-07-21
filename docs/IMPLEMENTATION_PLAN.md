# Naeem Ahsan Portfolio — Implementation Plan

Status: **Implementation complete; personal-content placeholders remain before publication.**

Source of truth: [`docs/PORTFOLIO_SPEC.md`](./PORTFOLIO_SPEC.md)  
Visual inspiration: `design-reference/editorial-layout-reference.png`

The architecture and delivery sequence were approved on 2026-07-21. This document is the live record of milestone progress, validation, decisions, and issues.

## 1. Repository baseline

The repository currently contains only:

- `AGENTS.md` — repository workflow and validation requirements.
- `docs/PORTFOLIO_SPEC.md` — authoritative product and technical specification.
- `design-reference/editorial-layout-reference.png` — a 1448 × 1086 editorial layout reference.
- `docs/IMPLEMENTATION_PLAN.md` — this planning document (previously empty).

There is no Git repository metadata in the current directory, no `package.json`, no Astro application, and no existing application convention to preserve. Implementation will therefore begin from a clean Astro scaffold after this plan is approved.

## 2. Design interpretation

The implementation will adapt the reference rather than reproduce it:

- A cream, subtly textured publication surface with black ink, thin grey rules, and one restrained red accent.
- A dominant active chapter area paired with narrow, vertically labelled chapter controls on desktop.
- High-contrast display serif for names and editorial statements, with a monospace face for body copy, metadata, and controls.
- A persistent bottom publication rail on desktop.
- Square edges, strong alignment, editorial image crops, and minimal decorative effects.
- A normal vertical reading document below 1024px; the horizontal reference composition will not be compressed onto mobile.

The portrait shown in the reference will not be used as Naeem's portrait. A clearly labelled neutral placeholder will be supplied until a real approved image is available. The approved profile location is Kuala Lumpur, Malaysia.

## 3. Proposed architecture

### 3.1 Rendering model

- Astro will own the page shell, content loading, semantic section markup, metadata, structured data, and all content that must exist without JavaScript.
- Vue 3 islands will enhance only stateful interactions: desktop chapter switching, portfolio index/menu, project filtering/preview, and case-study overlay/history behaviour.
- Each chapter and each project article will be emitted in the initial static HTML. Vue will change presentation and state; it will not fetch essential content after hydration.
- Below 1024px, the document remains a vertically ordered page. At and above 1024px, CSS and the hydrated desktop controller progressively enhance the same DOM into a horizontal chapter deck.
- Static output will target Cloudflare Pages with no server adapter, database, API, or authentication layer.

### 3.2 Component boundaries

The preferred interaction boundary is an Astro-rendered child tree inside small Vue controller shells. This avoids maintaining separate desktop and mobile copies of chapter content.

| Layer | Responsibility | Proposed examples |
| --- | --- | --- |
| Layout | Document shell, SEO props, skip link, global footer hooks | `MainLayout.astro` |
| Page composition | Load/sort content collections and compose chapters | `pages/index.astro` |
| Static sections | Semantic chapter content and no-JS anchors | `sections/*.astro` |
| Static UI | Reusable headings, metadata, links, archives, project articles | `components/astro/*.astro` |
| Vue controllers | State, keyboard input, focus, overlays, and URL synchronisation | `components/vue/*.vue` |
| Shared state utilities | Parse/serialize canonical hashes and coordinate history events | `lib/portfolio-state.ts` |
| Content | Project Markdown plus schema validation | `content/projects/*.md`, `content.config.ts` |
| Editable data | Profile, navigation, social links, skills, experience | `data/*.ts` |
| Styling | Tailwind v4 tokens/utilities plus narrow custom editorial CSS | `styles/*.css` |

Before committing to the slot-based controller boundary, Milestone 1 will prove that Astro-rendered slotted content remains present before hydration and can be enhanced without duplicated interactive DOM. If that spike fails, the fallback is a tiny Vue control island that updates state attributes on an Astro-owned deck via a scoped DOM contract; content ownership remains in Astro either way.

### 3.3 Proposed source structure

```text
src/
├── assets/
│   ├── portraits/
│   ├── projects/
│   └── textures/
├── components/
│   ├── astro/
│   │   ├── ChapterLabel.astro
│   │   ├── DesktopFooter.astro
│   │   ├── ExperienceArchive.astro
│   │   ├── MobileHeader.astro
│   │   ├── ProjectArticle.astro
│   │   ├── ProjectMetadata.astro
│   │   ├── SectionHeading.astro
│   │   ├── SkillsClassifieds.astro
│   │   └── SocialLinks.astro
│   └── vue/
│       ├── ChapterAccordion.vue
│       ├── MobileIndex.vue
│       ├── PortfolioIndex.vue
│       └── ProjectArchive.vue
├── content/projects/
├── data/
│   ├── experience.ts
│   ├── navigation.ts
│   ├── profile.ts
│   ├── skills.ts
│   └── socialLinks.ts
├── layouts/MainLayout.astro
├── lib/
│   ├── portfolio-state.ts
│   └── project-types.ts
├── pages/index.astro
├── sections/
│   ├── About.astro
│   ├── Contact.astro
│   ├── Experience.astro
│   ├── Introduction.astro
│   ├── SelectedWork.astro
│   └── Skills.astro
├── styles/
│   ├── fonts.css
│   ├── global.css
│   ├── reset.css
│   ├── tokens.css
│   └── typography.css
└── content.config.ts

public/
├── favicon.svg
├── images/placeholders/
├── og/
├── resume/
└── robots.txt
```

`ProjectArchive.vue` is proposed as one coordinated project island rather than three independently hydrated islands. It will own filter, preview, overlay, and focus/history state while Astro supplies safe pre-rendered project summaries and case-study article markup. This reduces bundle duplication and conflicting URL listeners. The boundary will be split only if bundle inspection shows a material benefit.

### 3.4 Content and data flow

1. Astro validates project Markdown with a strict Content Collection schema.
2. The page query excludes `draft: true`, sorts by `order`, and derives featured projects and filter categories.
3. Astro renders project rows and safe case-study article content; Markdown HTML will not be injected into Vue with `v-html`.
4. Serializable summary metadata is passed only where Vue needs state decisions.
5. Profile and personal links come from typed data modules, with placeholder status made explicit in the data rather than scattered through components.
6. Adding a non-draft project requires only its Markdown file and referenced image assets; the homepage is not edited.

### 3.5 URL and browser-history model

One typed state parser/serializer will be the authority for URL state:

- Chapter states: `#introduction`, `#work`, `#experience`, `#skills`, `#about`, `#contact`.
- Portfolio index state: `#index`.
- Project state: `#work/<project-slug>`.
- An absent or invalid hash resolves to Introduction without creating a history loop.

User-initiated chapter, index, and project actions will push history entries. Initial-state normalisation and non-user reconciliation will replace rather than push. A `popstate`/`hashchange` coordinator will restore chapter/index/project state without stealing focus. Opening a case study from Work will create a history entry so Back closes it; a direct project deep link will close to `#work` without navigating the visitor away from the site. The close-button fallback behaviour will be tested for both entry paths.

### 3.6 Accessibility model

- Use semantic regions and headings in logical DOM order, with a skip link and visible focus styles.
- Use a disclosure/tab pattern only after selecting the ARIA model that matches actual behaviour; do not mix incompatible `tab` and accordion semantics.
- Chapter controls use buttons, stable control/panel IDs, Enter/Space, Left/Right, Home/End, and state text available to assistive technology.
- Focus moves to a chapter heading only after a direct user selection, not during browser-history restoration.
- Portfolio index and case studies use accessible modal semantics, visible close controls, Escape, focus containment, background inertness, scroll locking, and trigger-focus restoration.
- Native `details`/`summary` will power experience expansion.
- Hover previews will also respond to focus; touch layouts display project images directly.
- All interaction remains usable with reduced motion, without hover, and at approximately 44px minimum touch-target size.
- No-JavaScript validation will confirm readable chapters, anchors, projects, and contact links.

### 3.7 Styling and responsive model

- Tailwind CSS v4 via `@tailwindcss/vite`, with CSS-first `@theme` tokens and complete statically detectable utility classes.
- Custom CSS is limited to the desktop chapter grid calculations, vertical writing modes, paper grain, fluid editorial type, print-style rules, and global reduced-motion behaviour.
- Desktop deck: CSS Grid at `min-width: 1024px`, one flexible active chapter track, up to five surrounding 64–76px collapsed chapter tracks, an 82–96px red index track, and a persistent footer rail. Exact widths will use clamped custom properties and must remain viable at 1024px.
- Mobile/tablet: one semantic column, 20–48px fluid page padding, no rotated content labels, and no horizontal overflow.
- Breakpoint and overflow checks will cover 320, 375, 430, 768, 1024, 1280, 1440, and 1920px.
- Fonts will be limited to a licensed/self-hostable display serif and monospace family with system fallbacks and `font-display: swap`. If local font files cannot be legally included, implementation will begin with fallbacks rather than a blocking external request.

## 4. Dependencies

Exact compatible versions will be resolved and locked during scaffolding rather than guessed in this plan.

### Required runtime/build dependencies

- `astro`
- `vue`
- `@astrojs/vue`
- `tailwindcss` v4
- `@tailwindcss/vite`
- TypeScript support provided/configured through Astro

### Expected development dependencies

- `@astrojs/check`
- `typescript`
- Only the package-manager lockfile generated by the selected package manager

### Dependency constraints

- No animation library; use CSS transitions and native browser APIs.
- No modal, focus-trap, icon, UI component, CSS preprocessor, or state-management library unless native platform behaviour proves insufficient and the addition is reviewed first.
- No Cloudflare adapter for the static build.
- No remote runtime content fetch.
- No analytics or third-party scripts in the initial implementation.

### External inputs needed before final content sign-off

- Approved portrait and alt text.
- Public email, GitHub, LinkedIn, canonical domain, and exact location.
- CV file.
- Confirmed employment details and biography.
- Approved project descriptions, outcomes, links, screenshots, and confidentiality status.
- Open Graph image.

Placeholders allow engineering to proceed, but the site cannot be considered publication-ready until these inputs are reviewed.

## 5. Milestones

Each milestone is completed, validated, and recorded here before the next begins. Failures are fixed within the active milestone.

### Milestone 0 — Decisions and baseline

**Depends on:** Plan approval.

**Work**

- Confirm naming and content ambiguities listed in Section 7.
- Record package-manager choice and runtime prerequisite.
- Capture baseline repository contents and initialise source control only if requested/approved.
- Establish a placeholder register with one source location for personal values.

**Validation gate**

- Approved architecture and naming decisions are recorded in this plan.
- No unlabelled personal claim enters the implementation.

### Milestone 1 — Foundation and progressive-enhancement proof

**Depends on:** Milestone 0.

**Work**

- Scaffold Astro with strict TypeScript, Vue, Tailwind v4, and static output.
- Add design tokens, reset, typography foundations, and global reduced-motion rules.
- Create typed profile/navigation/social/experience/skills modules.
- Build `MainLayout.astro`, skip link, semantic page landmarks, and all six static chapter shells.
- Prove the Astro-content/Vue-controller boundary with one chapter interaction before scaling it.
- Ensure the unhydrated document is readable and anchor-navigable.

**Validation gate**

- `npm run check` passes.
- `npm run build` passes and outputs static files.
- Built HTML contains all chapters in logical order before JavaScript.
- JavaScript-disabled anchors and contact links work.
- No hydration mismatch appears in the browser console.

### Milestone 2 — Content system and static editorial sections

**Depends on:** Milestone 1.

**Work**

- Configure the project Content Collection and schema.
- Add the three clearly labelled sample projects with placeholder imagery/content.
- Exclude drafts, sort by `order`, derive categories, and render projects through Astro.
- Complete Introduction, Selected Work, Experience, Skills, About, and Contact static layouts.
- Use native `details`/`summary` for experience entries.
- Add image dimensions, loading policy, and descriptive placeholder alt text.

**Validation gate**

- Schema rejects malformed project frontmatter.
- Draft projects are absent from the production output.
- Project order and generated categories are deterministic.
- Adding a project does not require homepage changes.
- `npm run check` and `npm run build` pass.

### Milestone 3 — Desktop editorial chapter system

**Depends on:** Milestone 2 and the controller-boundary proof.

**Work**

- Enhance the desktop layout at 1024px+ into the horizontal CSS Grid chapter deck.
- Implement the active chapter, before/after collapsed tracks, vertical labels, red Index track, and persistent footer rail.
- Add keyboard navigation, focus movement, state announcements, and reduced-motion behaviour.
- Add chapter hash parsing, push/replace rules, and Back/Forward restoration.
- Implement the accessible desktop Portfolio Index and optional Cmd/Ctrl+K shortcut without intercepting reserved browser behaviour.

**Validation gate**

- Exactly one desktop chapter is expanded and the index remains at far right.
- Controls work with pointer, Enter/Space, Left/Right, Home/End, and visible focus.
- Direct chapter hashes and Back/Forward restore the correct state.
- Active-panel overflow scrolls internally without moving the horizontal deck.
- Layout is viable at 1024, 1280, 1440, and 1920px.
- Reduced-motion mode removes nonessential sliding.
- `npm run check` and `npm run build` pass.

### Milestone 4 — Project interaction and deep links

**Depends on:** Milestone 2 for content; Milestone 3 for shared URL state.

**Work**

- Add generated-category filtering while preserving original order and showing an empty state.
- Add keyboard-equivalent desktop image previews and direct thumbnails on touch layouts.
- Add a full editorial case-study overlay/sheet using Astro-rendered safe article markup.
- Implement dialog labelling, focus containment/restoration, Escape, inert background, and scroll locking.
- Add `#work/<slug>` deep links and Back/Forward semantics.

**Validation gate**

- Filter state is both visually and programmatically clear.
- All project information remains available without JavaScript.
- Direct project URLs open the correct case study after enhancement.
- Back closes an opened case study; Forward reopens it.
- Closing direct-entry and in-app-entry overlays produces the documented URL state.
- No unsafe Markdown injection or background interaction is possible.
- `npm run check` and `npm run build` pass.

### Milestone 5 — Mobile and tablet experience

**Depends on:** Milestones 2 and 4.

**Work**

- Add compact mobile header and full-screen Portfolio Index.
- Verify the vertical reading flow below 1024px and remove desktop-only rotated/control presentation.
- Implement menu close/scroll/focus/hash behaviour.
- Adapt case-study presentation to a mobile sheet/route-like overlay.
- Verify touch targets, body scroll handling, readable line lengths, images, and no-hover paths.

**Validation gate**

- No horizontal accordion or horizontal overflow appears below 1024px.
- Mobile menu supports keyboard, touch, Escape, focus restoration, and anchors.
- Project actions require no simulated-hover first tap.
- Checks pass at 320, 375, 430, and 768px and across the 1024px boundary.
- `npm run check` and `npm run build` pass.

### Milestone 6 — SEO, accessibility, and performance hardening

**Depends on:** All feature milestones.

**Work**

- Add reusable metadata, canonical placeholder, Open Graph/Twitter data, favicon, robots metadata, and Person structured data.
- Optimise responsive images, asset loading, fonts, texture, and Vue hydration boundaries.
- Complete keyboard, screen-reader-oriented semantics, contrast, zoom/reflow, reduced-motion, and no-JS audits.
- Check for layout shift, duplicate interactive content, console errors, and unnecessary client payload.
- Test the required viewport matrix.

**Validation gate**

- WCAG 2.2 AA requirements in the specification are manually checked and documented.
- No known keyboard traps, hover-only actions, colour-only states, console errors, or hydration warnings remain.
- Essential content is present in generated HTML.
- Bundle/hydration findings and any accepted performance trade-offs are recorded.
- `npm run check` and `npm run build` pass.

### Milestone 7 — Documentation and deployment readiness

**Depends on:** Milestone 6.

**Work**

- Write the complete README sections required by the specification.
- Document content updates, draft/order/feature/category behaviour, data edits, portrait/CV replacement, and placeholder locations.
- Document Cloudflare Pages build/output settings, previews, custom domain, and HTTPS.
- Add a publication-readiness placeholder checklist and future CMS options without implementing a CMS.
- Perform the final acceptance-criteria audit.

**Validation gate**

- README instructions match the actual repository and commands.
- Every known placeholder is listed once in the checklist and traceable to its source.
- Cloudflare Pages static settings are documented as `npm run build` and `dist`.
- Final `npm run check` and `npm run build` pass.
- Any remaining warnings or unverified manual behaviours are reported rather than claimed complete.

## 6. Milestone dependency map

```text
Plan approval
    |
M0 Decisions and baseline
    |
M1 Foundation + enhancement proof
    |
M2 Content system + static sections
    |
M3 Desktop chapter system ---------+
    |                               |
    +---------------------------> M4 Project interaction
                                    |
                                  M5 Mobile/tablet
                                    |
                                  M6 Quality hardening
                                    |
                                  M7 Documentation/deployment
```

The desktop system precedes project deep-link completion because both need one canonical history model. Mobile follows the project model so the same state and case-study semantics are adapted rather than independently reinvented.

## 7. Approved decisions and remaining inputs

1. **Part IV label — approved:** use **Part IV — Skills**; use **Classifieds & Skills** as its editorial section title.
2. **Location — approved:** use **Kuala Lumpur, Malaysia** in the editable profile data.
3. **Project years/content:** all three sample case studies and their date ranges/outcomes will be visibly treated as editable placeholders until approved.
4. **Package manager:** proposed default is **npm**, matching the required commands and Cloudflare documentation.
5. **Optional shortcut:** Cmd/Ctrl+K will be added only if it does not conflict during usability testing; it is not required for navigation completeness.
6. **Contact form:** proposed version one includes direct contact links only, with no non-functional form placeholder.
7. **Font assets:** confirm whether approved/licensed Bodoni Moda and IBM Plex Mono files are available. Otherwise use permitted packages or system fallbacks after dependency review.

## 8. Risk register

| Risk | Impact | Mitigation / proof point |
| --- | --- | --- |
| Astro/Vue ownership creates duplicated or hydration-sensitive chapter markup | High | Prove the slotted controller boundary in Milestone 1; retain one Astro-owned semantic content tree and fall back to scoped state attributes if needed. |
| Multiple islands compete over hash/history state | High | One typed parser/serializer and one documented event contract; test direct entry, Back, Forward, close, invalid hashes, and rapid navigation. |
| Desktop accordion is too narrow at 1024px after six tabs and Index | High | Clamp tab widths at the lower breakpoint, permit active-panel internal scrolling, and validate real content at 1024px before visual polish. |
| Focus movement conflicts with Back/Forward or modal restoration | High | Track input origin; move focus only for explicit user activation and restore triggers only when still connected. |
| Static no-JS content conflicts with enhanced hidden panels/modals | High | Default to visible document flow; apply enhanced hiding only after the controller is ready; audit tabbability/inert state. |
| Direct case-study deep links have no prior in-site history entry | Medium | Distinguish direct entry from in-app entry; close direct entries to `#work` with replace semantics and test refresh behaviour. |
| Mobile menu and case-study overlay both lock scroll | Medium | Use one shared, reference-counted overlay policy or ensure overlays are mutually exclusive. |
| Tailwind v4 content detection misses dynamic class names | Medium | Use complete static class names and state/data selectors; prohibit assembled utility names. |
| Placeholder claims are mistaken for verified facts | High | Central placeholder register, explicit comments/flags in data, and a README publication checklist. |
| Portrait or project imagery causes privacy/confidentiality issues | High | Use neutral local placeholders; require approval and NDA review before real assets or client details are published. |
| Font licensing or remote font loading harms compliance/performance | Medium | Use licensed/self-hosted assets with swap, or robust system fallbacks; do not commit proprietary files. |
| Paper texture and large typography reduce readability/performance | Medium | Use lightweight CSS/SVG noise at very low opacity; test contrast, zoom, reflow, raster cost, and reduced-data implications. |
| Modal implementation depends on uneven browser behaviour | Medium | Prefer native `<dialog>` where validation supports it; keep a tested semantic fallback without adding a dependency by default. |
| Specification's broad acceptance criteria invite late integration failures | Medium | Validate each milestone with `npm run check`, `npm run build`, focused browser checks, and immediate fixes before proceeding. |

## 9. Validation strategy

Automated gates after every implementation milestone:

```bash
npm run check
npm run build
```

Focused manual checks will cover:

- JavaScript enabled and disabled.
- Keyboard-only navigation and visible focus.
- Reduced-motion mode.
- Direct hashes, refresh, invalid hashes, Back, and Forward.
- Menu and case-study focus/scroll behaviour.
- Touch/no-hover behaviour.
- 320, 375, 430, 768, 1024, 1280, 1440, and 1920px widths.
- Browser console and hydration warnings.
- Generated HTML for essential content, metadata, structured data, and draft exclusion.

No feature will be marked complete solely because it builds; interaction acceptance criteria require browser-level verification.

## 10. Progress log

| Date | Milestone | Status | Notes |
| --- | --- | --- | --- |
| 2026-07-21 | Planning | Approved | Read repository instructions, full portfolio specification, and design reference; inspected the empty application baseline; plan approved by the user. |
| 2026-07-21 | Milestone 0 | Complete | Recorded Skills and Kuala Lumpur decisions; npm and the installed Node runtime selected; baseline contains no existing application or Git metadata. |
| 2026-07-21 | Milestone 1 | Complete | Scaffolded Astro 7, Vue 3, Tailwind CSS 4 and strict TypeScript; added typed data, semantic chapter shells, editorial tokens, responsive foundations and the chapter-controller proof. `npm run check`: 0 errors/warnings/hints. `npm run build`: 1 static page built. Generated HTML contains all chapters. Astro telemetry was disabled in npm scripts because sandboxed validation cannot write to the user preferences directory. |
| 2026-07-21 | Milestone 2 | Complete | Added the Astro Content Collection schema, three sorted non-draft Markdown projects, safe build-time case-study rendering, placeholder project artwork, experience archive, skills directory, About and Contact content. Generated HTML contains three project rows and three complete case studies. Validation is sequential because concurrent Astro content-cache writers race. `npm run check`: 0 errors/warnings/hints. `npm run build`: passed. |
| 2026-07-21 | Milestone 3 | Complete | Added the progressively enhanced desktop horizontal chapter deck, disclosure-style button semantics, roving keyboard access, user-origin focus handling, chapter hash/Back/Forward synchronisation, fixed publication footer, red Portfolio Index rail, static index fallback and an accessible modal Index with focus containment, Escape, inert background and optional Cmd/Ctrl+K. `npm run check`: 0 errors/warnings/hints. `npm run build`: passed. |
| 2026-07-21 | Milestone 4 | Complete | Added Content Collection-derived filters, programmatic selected state and empty state, focus/hover desktop preview parity, direct touch thumbnails, full-screen case-study overlays over static Astro-rendered articles, focus containment/restoration, Escape, inert background, scroll locking and `#work/<slug>` direct-entry/Back/Forward handling. `npm run check`: 0 errors/warnings/hints. `npm run build`: passed. |
| 2026-07-21 | Milestone 5 | Complete | Added the sticky mobile header, full-screen shared Index, mobile chapter scroll/focus/hash handling, vertical reading flow, mobile footer, direct thumbnails, sticky case-study close control and 44px-class touch targets. Production screenshots at 375, 768 and 1280px exposed and verified fixes for sub-480px intrinsic grid/type overflow and confirmed the settled desktop tab isolation. `npm run check`: 0 errors/warnings/hints. `npm run build`: passed. |
| 2026-07-21 | Milestone 6 | Complete | Added self-hosted Bodoni Moda and IBM Plex Mono fonts, reusable metadata, canonical/OG/Twitter placeholders, valid Person JSON-LD, local favicon/OG assets, reduced-motion handling and contrast corrections. Audited generated HTML for image metadata, six chapters, three projects and three safe case studies; static output is 384KB with shared Vue runtime and three focused controller bundles. Restored focus on history-driven overlay closes and fixed direct project-close routing. `npm run check`: 0 errors/warnings/hints. `npm run build`: passed. |
| 2026-07-21 | Milestone 7 | Complete | Added the complete README with architecture, setup, content/data workflows, accessibility, Cloudflare Pages, custom-domain instructions, future CMS options and publication checklist. Final Chrome device-emulation audit at 320, 375, 430, 768, 1024, 1280, 1440 and 1920px reports `scrollWidth === clientWidth`; mobile mode is active below 1024px and the desktop deck at and above it. The 320px project-grid overflow found during the audit was fixed before completion. Final `npm run check`: 0 errors/warnings/hints. Final `npm run build`: passed. |

## 11. Approval gate

All implementation milestones are complete. Publication remains gated by the personal-content checklist in the README: approved portrait, contact/social links, CV, biography, employment details, project facts/screenshots/outcomes, canonical domain, and Open Graph image.
