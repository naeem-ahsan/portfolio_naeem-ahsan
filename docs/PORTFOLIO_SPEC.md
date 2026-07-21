# Naeem Ahsan Portfolio Specification

This document is the authoritative product, design, architecture,
accessibility and implementation specification for this repository.

Codex must read this document completely before planning or modifying code.

When another instruction conflicts with this document, stop and identify
the conflict before proceeding.

## Visual reference

Use `design-reference/editorial-layout-reference.png` as inspiration for:

- Horizontal editorial panel composition
- Large serif typography
- Vertical chapter navigation
- Cream paper background
- Thin divider rules
- Black, cream and red colour balance

Do not copy the publication’s text, identity, photographs or branding.
Adapt the visual language into an original developer portfolio for
Naeem Ahsan.

You are a Web Application Developer and UI engineer.
Build a production-ready personal portfolio website for Naeem Ahsan based on the requirements below.

Do not stop at a mock-up. Implement the complete working project, including:

- Astro project architecture
- Vue interactive components
- Responsive desktop and mobile layouts
- Content Collections
- Sample content
- Accessibility
- SEO
- Animations
- Cloudflare Pages deployment readiness
- Documentation
- Validation and production build

Before modifying files:

1. Inspect the current repository.
2. Summarise the existing structure.
3. Preserve any useful existing conventions.
4. If the repository is empty, scaffold the project.
5. Then proceed with implementation.

==================================================
1. PROJECT OBJECTIVE
==================================================

Create a distinctive single-page portfolio website for:

Name:
Naeem Ahsan

Professional focus:
Web Application Developer

Location:
Malaysia

Primary experience:

- WordPress
- Shopify
- WooCommerce
- PHP
- JavaScript
- Typescript
- Vue.js
- Astro
- Laravel
- MySQL
- Bootstrap
- Tailwind CSS
- CMS development
- E-commerce development
- Website performance optimisation
- Reusable frontend components
- Content-driven websites

The website should feel like a modern digital editorial publication inspired by a late-1990s investigative magazine, newspaper feature or independent editorial archive.

The visual reference is a full-screen editorial layout featuring:

- A large serif name
- An oversized editorial quote or statement
- A small monochrome portrait
- Monospaced descriptive text
- Thin vertical divider lines
- Narrow vertical chapter tabs
- One red index tab
- A cream paper-like background
- A horizontal chapter-navigation system on desktop

The result must be original and adapted specifically for a developer portfolio.

Do not reproduce copyrighted text, names, images or publication branding from the visual reference.

==================================================
2. TECHNOLOGY STACK
==================================================

Use:

- Astro
- TypeScript
- Vue 3
- Vue Composition API
- `<script setup lang="ts">`
- Tailwind CSS v4
- `@tailwindcss/vite` for Tailwind integration
- Astro Content Collections
- Markdown or MDX project files
- CSS-first design tokens using Tailwind `@theme`
- CSS custom properties for layout calculations and reusable runtime values
- Tailwind utility classes for layout, spacing, typography, colours, responsive behaviour and interaction states
- Limited custom global CSS for complex editorial effects, horizontal accordion behaviour, vertical writing modes, paper texture and reduced-motion handling
- Component-scoped CSS only when a component requires styling that is impractical with Tailwind utilities
- Static site generation
- Progressive enhancement
- Minimal client-side JavaScript
- GitHub-compatible source control
- Cloudflare Pages-compatible static output

Do not use:

- React
- Bootstrap
- Sass
- Tailwind component libraries
- Tailwind CSS v3 configuration patterns
- A database
- A custom backend
- Server-side rendering unless explicitly required
- Unnecessary third-party dependencies

Use native browser APIs and CSS wherever practical.

## Engineering constraints

- Use Astro and strict TypeScript.
- Use Vue 3 only for meaningful client-side interaction.
- Use Tailwind CSS v4 for styling.
- Integrate Tailwind through `@tailwindcss/vite`.
- Use Tailwind utility classes directly in Astro and Vue markup.
- Define the editorial design system using Tailwind v4 `@theme` variables.
- Prefer static HTML and progressive enhancement.
- Keep client-side JavaScript minimal.
- Do not add Bootstrap, Sass, a database, backend or authentication.
- Do not introduce component libraries such as DaisyUI, Flowbite or shadcn
  unless explicitly approved.
- Preserve accessibility and reduced-motion support.
- Keep content separate from presentation.
- Projects must come from Astro Content Collections.
- The output must support static deployment to Cloudflare Pages.

## Tailwind styling rules

- Use Tailwind utilities for layout, spacing, typography, responsive design,
  borders, colours, states and basic transitions.
- Use semantic Astro or Vue components to prevent repeated class-heavy markup.
- Use CSS variables and Tailwind `@theme` for reusable design tokens.
- Keep custom CSS only for behaviour that is awkward or unsuitable for
  utilities, including:
  - Horizontal accordion panel calculations
  - Vertical writing modes
  - Paper grain
  - Complex fluid typography
  - Reduced-motion overrides
  - Print-inspired decorative rules
- Do not overuse `@apply`.
- Do not use dynamically assembled Tailwind class names.
- Use complete, statically detectable class names.

==================================================
3. CORE ARCHITECTURE
==================================================

Astro must render the majority of the website.

Use Vue only where browser-side state or interaction is genuinely necessary.

Vue may be used for:

1. Desktop horizontal chapter accordion
2. Mobile portfolio index
3. Project filtering
4. Project case-study overlay
5. URL and browser-history synchronisation
6. Optional keyboard shortcut for opening the index

Static content must remain available in the generated HTML.

Do not fetch the essential portfolio content only after hydration.

The site should remain meaningful when JavaScript is unavailable. Without JavaScript, sections should appear as a normal vertically stacked document with usable anchor links.

==================================================
4. INFORMATION ARCHITECTURE
==================================================

Organise the portfolio into seven chapters:

Part I — Introduction
Part II — Selected Work
Part III — Experience
Part IV — Sills
Part V — About
Part VI — Contact
Portfolio Index

Use these as editorial chapter labels throughout the site.

Default active chapter on desktop:

Part I — Introduction

Suggested URL hashes:

#introduction
#work
#experience
#skills
#about
#contact
#index

Project deep links should support a shareable state, for example:

#work/valiram-corporate-platform

or an equivalent URL structure using the History API.

Browser Back and Forward buttons must correctly close or reopen sections and project case studies.

==================================================
5. DESKTOP LAYOUT CONCEPT
==================================================

At desktop widths, create a full-viewport horizontal editorial accordion.

Recommended breakpoint:

Desktop accordion:
1024px and above

Mobile/tablet reading layout:
Below 1024px

The main desktop layout consists of several horizontal panels.

Only one chapter is expanded at a time.

Inactive chapters appear as narrow vertical strips.

Example default state:

┌─────────────────────────────────────┬────┬────┬────┬────┬────┬────────┐
│                                     │ II │III │ IV │ V  │ VI │ INDEX  │
│       PART I — INTRODUCTION         │WORK│EXP │CAP │ABOUT│CONT│        │
│                                     │    │    │    │    │    │        │
└─────────────────────────────────────┴────┴────┴────┴────┴────┴────────┘

When Part V — About is active:

┌────┬────┬────┬────┬──────────────────────────────────────┬────┬────────┐
│ I  │ II │III │ IV │ PART V — ABOUT                       │ VI │ INDEX  │
│    │    │    │    │                                      │    │        │
└────┴────┴────┴────┴──────────────────────────────────────┴────┴────────┘

Rules:

- Chapters before the active chapter appear collapsed on the left.
- Chapters after the active chapter appear collapsed on the right.
- The active chapter takes the remaining width.
- The red Portfolio Index panel remains at the far right.
- Collapsed chapter labels are vertically oriented.
- Use real buttons for collapsed tabs.
- Do not make an entire anonymous `<div>` clickable.
- Keep a persistent footer strip along the bottom.
- Use `100svh` carefully, with sensible fallback behaviour.
- Allow content inside an expanded panel to scroll vertically if necessary.
- Do not scroll the entire horizontal deck unexpectedly.

Recommended collapsed widths:

Chapter tab:
64px to 76px

Portfolio Index tab:
82px to 96px

The active panel should fill all remaining horizontal space.

Use CSS Grid or Flexbox.

Do not calculate the entire layout manually with JavaScript.

==================================================
6. DESKTOP INTRODUCTION LAYOUT
==================================================

Part I should resemble an editorial cover or opening feature.

Suggested structure:

Top-left:
Small label: “PART I”

Main upper-left:
Large name: “NAEEM AHSAN”

Upper-right:
Small monochrome portrait

Main lower-left:
Oversized editorial statement

Suggested text:

“BUILDING DIGITAL
EXPERIENCES THAT
PERFORM.”

Lower centre-right:
Short monospaced introduction

Suggested text:

Web application developer specialising in WordPress,
Shopify, PHP and modern frontend technologies.

I build maintainable, content-driven websites focused
on performance, usability and clean implementation.

CTA:
READ PORTFOLIO →

The CTA should activate Part II — Selected Work.

Bottom editorial footer:

- © The Naeem Edition
- Current year
- Kuala Lumpur or Malaysia
- GitHub
- LinkedIn
- Credits

Do not hardcode an incorrect city if it has not been confirmed. Store it in the profile data file so it can be edited.

==================================================
7. CHAPTER INTERACTION
==================================================

Clicking a collapsed chapter tab should:

1. Update the active chapter.
2. Expand the selected panel.
3. Collapse the previous panel.
4. Update the URL hash.
5. Preserve browser history.
6. Move keyboard focus to the active chapter heading.
7. Announce the state appropriately to assistive technology.
8. Avoid reloading the page.

Use a smooth editorial transition.

Suggested duration:

500ms to 700ms

Suggested easing:

cubic-bezier(0.22, 1, 0.36, 1)

Animate only:

- Panel width or flex basis
- Content opacity
- Small content translation
- Divider positions where necessary

Do not animate every child element separately.

Respect `prefers-reduced-motion`.

With reduced motion enabled:

- Change panel state immediately or nearly immediately.
- Do not use sliding or staggered entrance effects.

==================================================
8. ACCESSIBLE DESKTOP TAB BEHAVIOUR
==================================================

Implement the chapter navigation as an accessible tab-like interface or disclosure system.

Requirements:

- Use `<button>` elements.
- Provide visible focus styles.
- Support Enter and Space.
- Support Left and Right Arrow navigation between chapter tabs.
- Support Home and End.
- Mark the active chapter clearly.
- Associate controls and panels using IDs.
- Use `aria-controls` and an appropriate selected or expanded state.
- Do not apply ARIA roles incorrectly.
- Test screen-reader reading order.
- Keep panel content in a logical DOM order.

When a chapter becomes active:

- Focus its main heading, using `tabindex="-1"` where appropriate.
- Avoid stealing focus when the change was caused by browser history unless necessary.

==================================================
9. PORTFOLIO INDEX
==================================================

The red “Portfolio Index” strip is a signature navigation element.

On desktop, clicking it should open either:

- A large directory panel, or
- A full-screen editorial overlay

The directory must include:

I — Introduction
II — Selected Work
III — Experience
IV — Skills
V — About
VI — Contact

Also list:

- Featured projects
- GitHub
- LinkedIn
- Download CV
- Email

Optional enhancement:

Allow Cmd + K on macOS and Ctrl + K elsewhere to open the Portfolio Index.

Do not override browser shortcuts that are more important.

The index should:

- Trap focus if implemented as a modal
- Close using Escape
- Close using a visible button
- Restore focus to the trigger
- Update the URL only when useful
- Work without hover

==================================================
10. MOBILE AND TABLET LAYOUT
==================================================

Do not force the horizontal accordion onto smaller screens.

Below 1024px, convert the site into a normal vertical editorial reading experience.

Mobile structure:

1. Compact header
2. Introduction
3. Selected Work
4. Experience
5. Skills
6. About
7. Contact
8. Footer

Mobile header:

Left:
NAEEM AHSAN

Right:
MENU

Below name:
WEB DEVELOPMENT · CMS · E-COMMERCE

Use a thin bottom rule.

The mobile menu should open a full-screen Portfolio Index:

PORTFOLIO INDEX
CLOSE ×

I      INTRODUCTION
II     SELECTED WORK
III    EXPERIENCE
IV     Skills
V      ABOUT
VI     CONTACT

Selecting an item should:

1. Close the menu.
2. Scroll to the relevant section.
3. Place focus appropriately.
4. Update the URL hash.

Mobile layout rules:

- Use one primary content column.
- Avoid horizontal scrolling.
- Avoid rotated text in normal section content.
- Preserve editorial labels and Roman numerals.
- Ensure all touch targets are at least approximately 44px.
- Do not depend on hover.
- Use fluid typography.
- Keep body text comfortably readable.

Suggested mobile page padding:

20px to 24px

Suggested tablet page padding:

32px to 48px

==================================================
11. SELECTED WORK
==================================================

Part II should feel like a project archive or investigative feature index.

Do not use generic rounded SaaS cards.

Use:

- Thin rules
- Project numbering
- Editorial titles
- Monochrome or muted screenshots
- Category labels
- Project year
- Role
- Technology metadata
- Concise summaries
- Directional arrows

Suggested structure:

PART II
SELECTED WORK

PROJECT ARCHIVE
03 PROJECTS / 2022—2026

01
VALIRAM CORPORATE PLATFORM

WordPress · PHP · JavaScript · AWS

A content-driven corporate platform supporting multiple
brands, reusable components and business requirements.

VIEW CASE STUDY →

Add at least three realistic sample projects:

1. Valiram Corporate Platform
2. Custom WordPress Job Portal
3. Shopify Commerce Enhancement

Treat all descriptions as editable placeholders unless confirmed.

Do not expose confidential client information.

Support projects with no public URL.

==================================================
12. PROJECT FILTERING
==================================================

Create a Vue project-filter component.

Suggested filters:

ALL
WORDPRESS
SHOPIFY
FRONTEND
FULL STACK

Requirements:

- Generate available categories from the project content.
- Include an All option.
- Use accessible buttons.
- Indicate the selected filter visually and programmatically.
- Do not reload the page.
- Preserve the original project order.
- Display a useful empty state.
- Keep animations subtle.
- Avoid layout jumps.

Suggested hydration:

`client:visible`

Pass serialisable project data from Astro into Vue.

==================================================
13. PROJECT PREVIEW BEHAVIOUR
==================================================

On larger screens, project rows may include a dedicated image-preview area.

When a visitor focuses or hovers over a project:

- Update the preview image.
- Keep the text readable.
- Do not hide necessary information behind hover.
- Support keyboard focus.
- Avoid rapid flashing.

On touch devices:

- Show each project thumbnail directly.
- Do not require a first tap merely to simulate hover.

Suggested image treatment:

- Black-and-white or slightly desaturated by default
- Optional colour reveal on hover
- Thin border
- No heavy shadow
- No large rounded corners

==================================================
14. PROJECT CASE STUDY
==================================================

Clicking a project should open a full editorial case-study experience.

Preferred implementation:

- Full-screen accessible overlay on desktop
- Full-screen sheet or route-like overlay on mobile

The case study should support:

- Project title
- Summary
- Year
- Role
- Client name
- Category
- Technologies
- Cover image
- Project URL
- Repository URL
- NDA or confidentiality state
- Overview
- Challenge
- Approach
- Contributions
- Outcome
- Screenshots

Suggested layout:

SPECIAL REPORT
PROJECT 01

VALIRAM CORPORATE PLATFORM

Role             Web Application Developer
Period           2024—2026
Technology       WordPress, PHP, JavaScript, AWS

[Large project image]

OVERVIEW
CHALLENGE
MY CONTRIBUTIONS
TECHNICAL APPROACH
RESULTS

Case-study accessibility requirements:

- Visible close button
- Escape closes
- Focus trap
- Restore focus after closing
- Prevent background interaction
- Prevent accidental background scroll
- Correct dialog labelling
- Shareable URL state
- Browser Back closes the case study

Do not render unsafe Markdown directly inside Vue.

Prefer rendering project content through Astro and passing safe structured content, or generate accessible static project article markup that Vue reveals.

==================================================
15. EXPERIENCE
==================================================

Part III should resemble a career archive.

Store experience entries in a TypeScript data file.

Each item should support:

- Job title
- Company
- Start date
- End date
- Location
- Summary
- Responsibilities
- Technologies
- Current role
- Order

Suggested layout:

PART III
CAREER ARCHIVE

2022—PRESENT
ASSOCIATE DEVELOPER
COMPANY NAME

Brief role summary

[EXPAND +]

Use native `<details>` and `<summary>` where practical.

Do not use Vue merely to expand experience entries.

Requirements:

- Keyboard accessible
- Clear focus state
- Smooth but optional content reveal
- Reduced-motion support
- Logical chronological order

==================================================
16. Skills
==================================================

Part IV should use a classified-advertisement or technical-directory style.

Suggested title:

CLASSIFIEDS & Skills

Organise skills into groups:

Frontend
- HTML
- CSS
- JavaScript
- TypeScript
- Vue.js
- Astro
- React
- jQuery

CMS & Commerce
- WordPress
- Shopify
- WooCommerce
- Drupal

Backend
- PHP
- Laravel
- MySQL
- REST APIs

Styling & UI
- Bootstrap
- Tailwind CSS
- Sass

Tools & Workflow
- Git
- GitHub
- Jira
- Confluence
- Notion
- Trello
- Slack

Store these groups in a TypeScript file.

Do not use a wall of colourful technology logos.

Use typography, columns, rules and small labels as the primary design.

==================================================
17. ABOUT
==================================================

Part V should feel like an editorial profile or interview feature.

Suggested title:

FROM THE EDITOR’S DESK

Main statement:

I BUILD MAINTAINABLE,
CONTENT-DRIVEN EXPERIENCES
FOR THE WEB.

Include:

- Monochrome portrait placeholder
- Professional biography
- Location
- Years of experience
- Primary focus
- Working style
- Download CV
- LinkedIn
- Email

Add a small editorial Q&A section.

Possible questions:

- What kind of work do you enjoy?
- What matters most when building a website?
- How do you approach maintainability?
- What are you currently learning?

Use editable placeholder answers.

Do not invent personal claims that have not been supplied.

==================================================
18. CONTACT
==================================================

Part VI should feel like the final page of the publication.

Suggested title:

FINAL EDITION

Suggested statement:

LET’S BUILD
SOMETHING USEFUL.

Include:

- Email
- LinkedIn
- GitHub
- Download CV

Do not create a custom backend.

For the initial version, use:

- Email link
- Social links
- Optional static contact-form placeholder

If a contact form is included:

- Clearly mark the endpoint as a placeholder.
- Document how it could later connect to Cloudflare Workers or a form service.
- Do not pretend form submission works if no endpoint exists.

==================================================
19. CONTENT MANAGEMENT
==================================================

Use Astro Content Collections for projects.

Recommended directory:

src/content/projects/

Each project should be an individual Markdown or MDX file.

Create:

src/content.config.ts

Use schema validation.

Suggested project schema:

{
  title: string;
  slug?: string;
  summary: string;
  year: number;
  startYear?: number;
  endYear?: number;
  category: string;
  technologies: string[];
  featured: boolean;
  order: number;
  coverImage: string;
  gallery?: string[];
  projectUrl?: string;
  repositoryUrl?: string;
  clientName?: string;
  role?: string;
  nda: boolean;
  draft: boolean;
}

Hide draft projects from production output.

Sort projects primarily by `order`.

Support featured-project highlighting.

Adding a project must not require editing the homepage component.

==================================================
20. PROFILE AND DATA FILES
==================================================

Create editable data modules such as:

src/data/profile.ts
src/data/navigation.ts
src/data/socialLinks.ts
src/data/skills.ts
src/data/experience.ts

Suggested profile fields:

{
  name: string;
  shortName: string;
  professionalTitle: string;
  location: string;
  email: string;
  introduction: string;
  heroStatement: string;
  availability?: string;
  cvUrl: string;
  portrait: string;
}

Clearly mark placeholder values.

Do not scatter personal details across unrelated components.

==================================================
21. RECOMMENDED PROJECT STRUCTURE
==================================================

Use a structure similar to:

src/
├── assets/
│   ├── portraits/
│   ├── projects/
│   └── textures/
│
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
│   │
│   └── vue/
│       ├── ChapterAccordion.vue
│       ├── MobileIndex.vue
│       ├── PortfolioIndex.vue
│       ├── ProjectCaseStudy.vue
│       └── ProjectFilter.vue
│
├── content/
│   └── projects/
│       ├── valiram-corporate-platform.md
│       ├── custom-wordpress-job-portal.md
│       └── shopify-commerce-enhancement.md
│
├── data/
│   ├── experience.ts
│   ├── navigation.ts
│   ├── profile.ts
│   ├── skills.ts
│   └── socialLinks.ts
│
├── layouts/
│   └── MainLayout.astro
│
├── pages/
│   └── index.astro
│
├── sections/
│   ├── About.astro
│   ├── Skills.astro
│   ├── Contact.astro
│   ├── Experience.astro
│   ├── Introduction.astro
│   └── SelectedWork.astro
│
├── styles/
│   ├── fonts.css
│   ├── global.css
│   ├── reset.css
│   ├── tokens.css
│   ├── typography.css
│   └── utilities.css
│
└── content.config.ts

public/
├── favicon.svg
├── icons/
├── images/
├── og/
├── resume/
└── robots.txt

Adjust this where Astro conventions require it, but preserve clear separation between:

- Content
- Data
- Static Astro components
- Interactive Vue components
- Layout
- Styles
- Assets

==================================================
22. VISUAL STYLE GUIDE
==================================================

Design concept:

Modern editorial minimalism with a subtle late-1990s newspaper or investigative-publication atmosphere.

The site should feel:

- Editorial
- Intelligent
- Calm
- Technical
- Confident
- Structured
- Slightly nostalgic
- Modern in usability

The site must not feel:

- Victorian
- Steampunk
- Cyberpunk
- Corporate SaaS
- Template-driven
- Overly distressed
- Decorative for decoration’s sake

==================================================
23. COLOUR TOKENS
==================================================

Use CSS custom properties.

Suggested palette:

:root {
  --color-paper: #f2efe7;
  --color-paper-light: #faf8f1;
  --color-paper-dark: #e5e0d6;

  --color-ink: #11100e;
  --color-ink-muted: #6d6860;
  --color-ink-soft: #918b82;

  --color-rule: #aaa49a;
  --color-rule-soft: rgba(17, 16, 14, 0.18);

  --color-accent: #d6382f;
  --color-accent-dark: #ad2922;
  --color-accent-text: #fffaf2;

  --color-focus: #2459d3;
}

Use the red accent sparingly for:

- Portfolio Index
- CTAs
- Active-state markers
- Small metadata labels
- Links or arrows
- Focus-independent visual emphasis

Do not make all headings red.

Do not use gradients.

Do not implement dark mode in version one unless the existing project already requires it. The paper-based visual identity is the primary theme.

==================================================
24. TYPOGRAPHY
==================================================

Use a maximum of two primary font families.

Recommended:

Display serif:
Bodoni Moda

Body, metadata and interface:
IBM Plex Mono

Fallbacks:

Display:
"Bodoni Moda", "Times New Roman", Georgia, serif

Interface:
"IBM Plex Mono", "Courier New", monospace

Use self-hosted or efficiently loaded font files only when licensing and project setup permit.

Do not commit proprietary font files.

Use `font-display: swap`.

Suggested typography roles:

Name:
Display serif
Large uppercase
High contrast
Tight tracking

Hero statement:
Display serif
Uppercase
Large fluid sizing
Line-height around 0.92 to 1

Body:
Monospace
Readable line height
Moderate width

Metadata:
Monospace
Uppercase
Small size
Letter spacing

Suggested fluid scales:

Name:
clamp(3.4rem, 8vw, 8.5rem)

Hero statement:
clamp(3rem, 7vw, 7.5rem)

Chapter heading:
clamp(2.5rem, 5vw, 5.5rem)

Body:
clamp(0.95rem, 1.1vw, 1.1rem)

Metadata:
0.7rem to 0.82rem

On mobile, prioritise readable line breaks over preserving desktop scale.

Avoid widows and awkward single-word final lines where practical.

==================================================
25. SPACING AND LAYOUT TOKENS
==================================================

Create consistent tokens.

Example:

--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.5rem;
--space-6: 2rem;
--space-7: 3rem;
--space-8: 4rem;
--space-9: 6rem;

--page-padding-desktop: clamp(2rem, 3vw, 4rem);
--page-padding-mobile: 1.25rem;

--rule-width: 1px;
--content-max-width: 1600px;

Use square or nearly square edges.

Avoid:

- Large pill shapes
- Excessively rounded cards
- Floating glass panels
- Heavy shadows

Border radius should generally be:

0 to 4px

==================================================
26. RULES, TEXTURE AND IMAGERY
==================================================

Use thin horizontal and vertical rules as primary structural elements.

Paper texture:

- Extremely subtle
- Low opacity
- Should not interfere with reading
- Prefer a small CSS or SVG noise texture
- Avoid a large raster background
- Disable or reduce it where performance or accessibility suffers

Images:

- Primarily monochrome or desaturated
- Strong crop
- Editorial aspect ratios
- Thin border
- No excessive shadow
- Use Astro image optimisation
- Include explicit width and height
- Lazy-load below-the-fold images
- Provide accurate alt text
- Avoid layout shift

Portrait:

- Use a clear placeholder file and path
- Do not generate or invent the user’s face
- Make replacement instructions obvious

==================================================
27. MOTION DESIGN
==================================================

Motion should communicate the movement of editorial dividers or publication chapters.

Use:

- Panel expansion
- Small text fade
- Subtle horizontal reveal
- Thin red active marker
- Image preview transition

Do not use:

- Parallax
- Scroll hijacking
- Continuous floating animation
- Typewriter effects
- Marquee text
- Cursor-following graphics
- Long loading screens
- Staggered animation on every line

All motion must respect:

@media (prefers-reduced-motion: reduce)

==================================================
28. RESPONSIVE BREAKPOINTS
==================================================

Suggested breakpoints:

Small mobile:
Below 480px

Large mobile:
480px to 767px

Tablet:
768px to 1023px

Desktop accordion:
1024px and above

Large desktop:
1440px and above

Do not rely exclusively on fixed breakpoints.

Use:

- CSS Grid
- Flexbox
- `clamp()`
- `min()`
- `max()`
- `minmax()`
- Container-aware sizing where appropriate

Test at minimum:

- 320px
- 375px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

==================================================
29. SEO
==================================================

Create a reusable Astro layout supporting:

- Page title
- Meta description
- Canonical URL placeholder
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter card
- Favicon
- Theme colour
- Robots metadata

Add structured data for a professional profile or Person.

Include:

- Name
- Job title
- URL placeholder
- SameAs social links
- Location at country or city level only
- Skills where appropriate

Do not include private contact information beyond what is intentionally displayed.

==================================================
30. ACCESSIBILITY
==================================================

Target WCAG 2.2 AA where practical.

Requirements:

- Semantic HTML
- Logical heading hierarchy
- Skip-to-content link
- Visible keyboard focus
- Sufficient colour contrast
- Accessible chapter navigation
- Accessible mobile menu
- Accessible project filters
- Accessible case-study modal
- Correct labels
- Useful image alt text
- No keyboard traps except intentional modal focus management
- Escape closes overlays
- Reduced-motion support
- Touch-friendly controls
- No interaction available only by hover
- No colour-only state indicators

Do not use ARIA when native HTML already provides the required semantics.

==================================================
31. PERFORMANCE
==================================================

Target excellent Lighthouse performance.

Requirements:

- Static generation
- Minimal JavaScript
- Limited Vue hydration
- No unnecessary third-party scripts
- No large animation package
- Responsive images
- Font optimisation
- No render-blocking decorative assets
- No unnecessary client data fetching
- Avoid cumulative layout shift
- Avoid hidden duplicate content being fully interactive
- Lazy-load non-critical interactions when appropriate

Suggested Vue hydration:

Chapter accordion:
`client:load` on desktop only if necessary for immediate navigation

Mobile index:
`client:load`

Project filter:
`client:visible`

Project case study:
Hydrate only when required, or include it in the same interactive island if this reduces duplication cleanly

Audit bundle size after implementation.

==================================================
32. PROGRESSIVE ENHANCEMENT
==================================================

Before JavaScript:

- All chapters should appear in normal document order.
- Anchor navigation should work.
- Project content should be readable.
- Contact links should work.

After Vue hydration on desktop:

- Transform the chapter sequence into the horizontal accordion.
- Preserve semantic content.
- Avoid a large layout flash.
- Use an early CSS class or media query to manage the enhanced layout.

Do not make essential content permanently hidden when hydration fails.

==================================================
33. DEVELOPMENT QUALITY
==================================================

Use strict TypeScript where practical.

Create types for:

- Profile
- Navigation item
- Experience item
- Skill group
- Project summary
- Chapter state
- Case-study state

Requirements:

- Reusable components
- Clear naming
- No unnecessary abstractions
- Comments only where logic is non-obvious
- No `any` unless strongly justified
- No console errors
- No unused code
- No fake APIs
- No unfinished interactive controls

Add useful npm scripts:

{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "check": "astro check"
}

Configure formatting and linting only when the configuration remains maintainable.

==================================================
34. CONTENT UPDATE WORKFLOW
==================================================

Document this workflow in the README:

1. Add or edit a Markdown project file.
2. Add or replace project images.
3. Update frontmatter.
4. Run Astro validation.
5. Preview locally.
6. Commit the changes.
7. Push to GitHub.
8. Cloudflare Pages automatically rebuilds the site.

Example:

git add .
git commit -m "Add new portfolio project"
git push

Also document:

- How to hide a draft project
- How to change project order
- How to feature a project
- How to add a category
- How to update skills
- How to update experience
- How to replace the portrait
- How to replace the CV
- How to update social links

==================================================
35. CLOUDFLARE PAGES
==================================================

Build for static Cloudflare Pages deployment.

Expected settings:

Build command:
npm run build

Output directory:
dist

Do not add a Cloudflare adapter unless server functionality is genuinely required.

Document:

- Connecting the GitHub repository
- Choosing the production branch
- Setting the build command
- Setting the output directory
- Adding a custom domain
- HTTPS
- Preview deployments
- Automatic deployments after Git pushes

==================================================
36. README
==================================================

Write a complete README containing:

1. Project overview
2. Design concept
3. Technology stack
4. Local setup
5. Commands
6. Folder structure
7. Astro and Vue responsibility split
8. Desktop accordion behaviour
9. Mobile layout behaviour
10. Accessibility notes
11. How to add a project
12. How to edit experience
13. How to edit skills
14. How to replace profile data
15. How to replace the portrait
16. How to add the CV
17. Cloudflare deployment
18. Custom-domain setup
19. Placeholder checklist
20. Future CMS options

Mention future optional CMS paths:

- Decap CMS for Git-based admin editing
- Sanity for hosted structured content

Do not implement either CMS in version one.

==================================================
37. IMPLEMENTATION PHASES
==================================================

Follow this order.

Phase 1 — Foundation

- Inspect repository
- Scaffold Astro if necessary
- Enable TypeScript
- Add Vue integration
- Create reset and design tokens
- Create the main layout
- Create the data modules
- Build semantic static sections

Phase 2 — Content

- Configure Content Collections
- Create the project schema
- Add sample Markdown projects
- Render project data through Astro
- Add experience and skills data

Phase 3 — Desktop interaction

- Build horizontal chapter accordion
- Implement active panel state
- Implement keyboard navigation
- Add URL hash synchronisation
- Add Back and Forward behaviour
- Add the Portfolio Index

Phase 4 — Projects

- Add project filtering
- Add project preview behaviour
- Add project case-study overlay
- Add focus management
- Add deep-link support

Phase 5 — Mobile

- Create mobile header
- Create mobile Portfolio Index
- Create vertical reading layout
- Adapt project case studies
- Verify touch behaviour

Phase 6 — Quality

- Add SEO
- Add structured data
- Optimise images
- Add reduced-motion handling
- Test accessibility
- Test responsive layouts
- Audit hydration
- Run Astro checks
- Run production build

Phase 7 — Documentation

- Write README
- Document content workflow
- Document Cloudflare Pages
- List remaining placeholders

==================================================
38. ACCEPTANCE CRITERIA
==================================================

The implementation is complete only when:

- The site builds successfully.
- `npm run build` succeeds.
- `npm run check` succeeds.
- There are no browser-console errors.
- The desktop site uses the horizontal editorial chapter system.
- One chapter expands at a time.
- Chapters before and after the active chapter collapse correctly.
- The red Portfolio Index works.
- Keyboard navigation works.
- URL hashes work.
- Browser Back and Forward work.
- Mobile uses a vertical layout instead of compressed horizontal tabs.
- Mobile navigation is accessible.
- Projects come from Astro Content Collections.
- Draft projects are excluded.
- Adding a project does not require editing the homepage.
- Project filters work.
- Project case studies work.
- Case-study focus handling works.
- Essential content is available in static HTML.
- The design matches the editorial paper, serif, monospaced and red-accent direction.
- The design does not resemble a generic SaaS portfolio.
- The site is suitable for Cloudflare Pages.
- The README is complete.

==================================================
39. PLACEHOLDER CONTENT
==================================================

Clearly identify every placeholder that Naeem must replace, including:

- Portrait
- Email address
- LinkedIn URL
- GitHub URL
- CV file
- Exact location
- Current company
- Employment dates
- Professional biography
- Project screenshots
- Project descriptions
- Project outcomes
- Public project URLs
- Repository URLs
- Open Graph image
- Canonical domain

Create a checklist in the README.

Do not hide placeholder values in multiple files.

==================================================
40. FINAL RESPONSE AFTER IMPLEMENTATION
==================================================

After completing the implementation:

1. Summarise the architecture.
2. List files created and changed.
3. Explain the desktop accordion implementation.
4. Explain mobile behaviour.
5. Explain project content management.
6. Report the result of `npm run check`.
7. Report the result of `npm run build`.
8. Mention any warnings.
9. List all remaining personal-content placeholders.
10. Do not claim a feature works unless it was implemented and checked.