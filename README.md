# chiyz

Yizhou Chi’s personal website: research, projects, writing, and contact information.
Built with React and Vite, with a monochrome editorial layout and an interactive WebGL dither effect in the homepage opening.

## Local development

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Install dependencies on each computer; do not copy or sync `node_modules` between Windows and macOS.

## Checks and production build

```sh
npm run lint
npm run test:run
npm run build
```

The production output is generated in `dist/`. `npm run preview` serves that build locally.

## Editing content

- `src/data/portfolio.js`: publications and projects
- `src/about/`: English and Chinese biographies
- `src/posts/`: Markdown essays
- `src/pages/Contact.jsx`: contact page
- `src/index.css`: shared styles and opacity/color transitions
- `src/components/DitherField.jsx`: homepage animation

The theme defaults to the system preference. The header cycles between Auto, Light, and Dark. Interface animations do not translate or scale content; reduced-motion preferences are respected.

## Routing and deployment

Routes use hash URLs (`/#/blog`, `/#/contact`) for GitHub Pages compatibility. Homepage section links use router-aware destinations such as `/#publications` in React Router’s `Link` component.

Pushing to `main` runs lint, tests, and a production build through GitHub Actions, then deploys to GitHub Pages. The custom domain is configured in `public/CNAME`.
