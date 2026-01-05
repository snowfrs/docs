# Project Context: Wiki - The Power of Many

## 1. Project Overview
This project is a personal knowledge base and collaborative wiki powered by **Next.js** and **FumaDocs**. It serves as a comprehensive resource for IT professionals, covering topics such as HPC, DevOps, Kubernetes, Cloud Computing, and Infrastructure.

## 2. Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Documentation Framework**: [FumaDocs](https://fumadocs.vercel.app/) (Core, UI, MDX)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript / MDX
- **Search**: Orama (Local with Chinese Tokenizer)
- **Diagrams**: Mermaid.js
- **Deployment**: Vercel (Target)
- **Analytics**: Google Analytics (via @next/third-parties)

## 3. Project Structure
```text
/
├── app/                # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── global.css      # Global styles (including Sidebar width override)
│   ├── [[...slug]]/    # Documentation routes (Root catch-all)
│   └── og/             # Open Graph image generation
├── content/            # Content directory
│   └── docs/           # Documentation markdown/MDX files
│       ├── meta.json   # Top-level Navigation configuration
│       ├── index.mdx   # Home page content
│       ├── Infra/      # Infrastructure
│       ├── HPC/        # High Performance Computing
│       ├── K8s/        # Kubernetes
│       ├── DevOps/     # CI/CD, SCM, IaC
│       ├── Projects/   # Active Projects
│       ├── Links/      # Friendly Links
│       ├── Archive/    # Archived
│       └── ...
├── lib/                # Shared utilities (source.ts, layout.shared.tsx)
├── public/             # Static assets (images, logo, favicon)
├── source.config.ts    # FumaDocs source configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Dependencies
└── GEMINI.md           # Project Context
```

## 4. Key Configurations
- **`source.config.ts`**: Defines content source (`content/docs`).
- **`lib/source.ts`**: Configures the loader with `baseUrl: '/'` (Docs served at root).
- **`app/layout.tsx`**: Sets up `RootProvider`.
- **`content/docs/meta.json`**: Controls the sidebar order and sections (e.g., `---Infrastructure---`).

## 5. Scripts `package.json`
- `pnpm run dev`: Start development server.
- `pnpm run build`: Build for production.
- `pnpm run types:check`: Validate MDX and TypeScript.
- `pnpm run postinstall`: Runs `fumadocs-mdx`.

## 6. Content Guidelines
- **Format**: MDX (`.mdx`).
- **Assets**: Store in `public/assets/images/`. Reference via `/assets/images/filename`.
- **Navigation**: Define order in `meta.json`. Folders generally map to Sidebar Groups.
