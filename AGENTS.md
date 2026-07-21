# Repository Instructions

## Source of truth

Before planning or modifying code, read the following file completely:

- `docs/PORTFOLIO_SPEC.md`

Treat that document as the authoritative specification for the portfolio.

## Working process

For substantial implementation work:

1. Inspect the repository before changing files.
2. Create and maintain a milestone-based plan in:
   `docs/IMPLEMENTATION_PLAN.md`
3. Implement one milestone at a time.
4. Validate each milestone before continuing.
5. Fix validation failures immediately.
6. Keep the implementation plan updated with progress, decisions and issues.

## Required validation

Run the relevant commands after implementation:

```bash
npm run check
npm run build