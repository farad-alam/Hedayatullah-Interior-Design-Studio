# Agency Platform Core

## Developer Architecture & Development Plan

**Version:** v1.1
**Stack:** Next.js · PostgreSQL · Prisma · Neon · Cloudinary · Tailwind CSS · shadcn/ui · Vercel

------------------------------------------------------------------------

# Goal

## Primary Goal

Build a reusable **Agency Platform Core** using **Next.js** that enables
the agency to deliver websites for **Interior Design and
Interior-related businesses** quickly, consistently, and with high
quality.

The platform is **not** intended to be a generic CMS or website builder.

Instead, it should provide a stable backend, dashboard, and business
logic that can be reused across multiple client projects, while allowing
complete freedom to create unique frontend designs for each client.

## Primary Target Industries

-   Interior Design
-   Interior Decoration
-   Aluminium & Glass
-   Kitchen Design
-   Home Renovation
-   Architecture
-   Furniture
-   Construction
-   Maintenance
-   Other service-based businesses with similar requirements

------------------------------------------------------------------------

# Project Vision

Every new client should follow this workflow:

1.  Review previous completed client websites.
2.  Select the closest existing project.
3.  Clone that repository.
4.  Customize only the frontend (`design/` folder).
5.  Update `config/site.config.ts` with client branding and feature flags.
6.  Configure all business information from the dashboard.
7.  Deploy and deliver.

The backend should rarely require changes for standard client work.

------------------------------------------------------------------------

# Core Philosophy

The project has two responsibilities.

## 1. Core Platform

Shared across every client. Lives inside the cloned repository and
should **never be modified** for individual client needs.

Responsible for:

-   Database (PostgreSQL on Neon)
-   API (Next.js Route Handlers)
-   Dashboard (shadcn/ui components)
-   Authentication (Email & Password via NextAuth)
-   Business Logic
-   Media Management (Cloudinary)
-   Website Settings
-   SEO
-   Validation (Zod)

This is the product.

------------------------------------------------------------------------

## 2. Frontend Design

Unique for every client. Lives entirely inside the `design/` folder and
`config/site.config.ts`.

Responsible for:

-   Layout
-   Styling
-   Animations
-   Components (Hero, Cards, Sections, Navigation, Footer)
-   Typography
-   User Experience
-   Branding & Colors

This is the client project.

------------------------------------------------------------------------

# Golden Rule

> **Backend is the product. Frontend is the client project.**

Never mix these responsibilities.

------------------------------------------------------------------------

# Technology Stack

| Concern            | Technology              | Reason                                      |
| ------------------ | ----------------------- | ------------------------------------------- |
| Framework          | Next.js (App Router)    | SSR, API routes, Server Actions in one repo |
| Language           | TypeScript              | Type safety across the full stack           |
| Database           | PostgreSQL (Neon)       | Serverless Postgres, perfect for Vercel     |
| ORM                | Prisma                  | Type-safe schema, migrations, easy queries  |
| Auth               | NextAuth.js             | Battle-tested, Email+Password support       |
| Styling            | Tailwind CSS            | Utility-first, easy to override per client  |
| UI Components      | shadcn/ui               | Accessible, unstyled by default, composable |
| Media Storage      | Cloudinary              | Image hosting, transforms, CDN, WebP        |
| Validation         | Zod                     | Schema validation shared by server+client   |
| Hosting            | Vercel                  | Auto-deploy, Edge network, preview URLs     |
| Database Hosting   | Neon                    | Serverless Postgres, free tier, branching   |
| CI/CD              | Vercel Auto-deploy      | Push to main = deploy, no extra config      |
| Domains            | Per-client custom       | Each client gets their own domain           |

------------------------------------------------------------------------

# Deployment Model

-   **One Vercel project per client.** Each client site is a separate
    deployment with its own environment variables.
-   **One Neon database per client.** Complete data isolation. No
    multi-tenant complexity.
-   **One Cloudinary account per agency.** Organized by client using
    Cloudinary folders (`/clients/client-name/`).
-   **One custom domain per client.** Configured in Vercel dashboard.
-   **Auto-deploy on push to `main`.** No manual deployment steps.

------------------------------------------------------------------------

# Core Improvement Policy

When you fix a bug or add a platform feature in one project:

1.  Make the change in that project's Core files.
2.  Document the change in `CHANGELOG.md`.
3.  Manually apply the change to the Core Platform source repository.
4.  Future clones will include the improvement automatically.
5.  Apply to existing clients only if relevant or requested.

> This is the trade-off of the clone approach. Core improvements are
> applied forward (new clones) not backward (existing clients)
> automatically. Document every Core change so developers know what
> version each client is on.

------------------------------------------------------------------------

# Project Structure

```text
agency-platform-core/
│
├── src/
│   ├── app/                        ← Next.js App Router (routes ONLY)
│   │   ├── (site)/                 ← Public website route group
│   │   │   ├── page.tsx            ← Homepage (renders design/ components)
│   │   │   ├── projects/
│   │   │   ├── services/
│   │   │   ├── gallery/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/            ← Dashboard route group
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── projects/
│   │   │   │   ├── services/
│   │   │   │   ├── gallery/
│   │   │   │   ├── testimonials/
│   │   │   │   ├── faqs/
│   │   │   │   ├── settings/
│   │   │   │   ├── seo/
│   │   │   │   └── media/
│   │   │   └── layout.tsx
│   │   ├── api/                    ← API Route Handlers
│   │   │   ├── projects/
│   │   │   ├── services/
│   │   │   ├── gallery/
│   │   │   ├── testimonials/
│   │   │   ├── faqs/
│   │   │   ├── settings/
│   │   │   ├── seo/
│   │   │   └── media/
│   │   ├── auth/                   ← NextAuth routes
│   │   └── layout.tsx              ← Root layout (Analytics, Fonts)
│   │
│   ├── core/                       ← 🔒 CORE PLATFORM — DO NOT MODIFY PER CLIENT
│   │   ├── db/
│   │   │   ├── schema.prisma       ← Prisma schema (all entities)
│   │   │   ├── client.ts           ← Prisma client singleton
│   │   │   └── seed.ts             ← Seed script for development
│   │   ├── auth/
│   │   │   ├── config.ts           ← NextAuth configuration
│   │   │   └── middleware.ts       ← Route protection middleware
│   │   ├── services/               ← Business logic
│   │   │   ├── project.service.ts
│   │   │   ├── service.service.ts
│   │   │   ├── gallery.service.ts
│   │   │   ├── testimonial.service.ts
│   │   │   ├── faq.service.ts
│   │   │   ├── settings.service.ts
│   │   │   ├── seo.service.ts
│   │   │   └── media.service.ts
│   │   ├── actions/                ← Server Actions (called from UI)
│   │   │   ├── project.actions.ts
│   │   │   ├── service.actions.ts
│   │   │   ├── gallery.actions.ts
│   │   │   ├── testimonial.actions.ts
│   │   │   ├── faq.actions.ts
│   │   │   ├── settings.actions.ts
│   │   │   └── media.actions.ts
│   │   └── lib/
│   │       ├── validations/        ← Zod schemas
│   │       ├── cloudinary.ts       ← Cloudinary setup
│   │       ├── utils.ts
│   │       └── constants.ts
│   │
│   ├── dashboard/                  ← 🔒 Dashboard UI — DO NOT MODIFY PER CLIENT
│   │   ├── components/             ← Dashboard-specific components
│   │   ├── forms/                  ← CRUD forms for each entity
│   │   └── layouts/                ← Dashboard sidebar, header
│   │
│   ├── components/                 ← 🔒 Shared primitive UI (shadcn/ui)
│   │   └── ui/                     ← Button, Input, Modal, Table, etc.
│   │
│   ├── design/                     ← 🎨 CLIENT FRONTEND — CUSTOMIZE HERE
│   │   ├── components/             ← Hero, Cards, Nav, Footer, etc.
│   │   ├── sections/               ← Page sections (HomeHero, ServicesGrid, etc.)
│   │   ├── layouts/                ← Page layouts
│   │   └── styles/                 ← Client-specific global CSS overrides
│   │
│   ├── hooks/                      ← Shared React hooks
│   ├── types/                      ← TypeScript types & interfaces
│   └── config/
│       └── site.config.ts          ← 🎨 CLIENT CONFIG — CUSTOMIZE HERE
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/                         ← Static assets
├── .env.example                    ← Required environment variables
├── .env.local                      ← Local secrets (git-ignored)
├── CHANGELOG.md                    ← Track Core Platform changes across versions
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

------------------------------------------------------------------------

# Folder Responsibilities

## `app/`

Next.js App Router routes and page files only. No business logic. Pages
import from `design/` for UI and from `core/services/` for data fetching.

## `core/`

**Never touch this folder for individual client work.**

Contains everything shared: DB, auth, services, actions, lib. When a
Core bug is fixed or a feature is added, update this folder and
document it in `CHANGELOG.md`.

## `core/db/`

Prisma schema, client singleton, and seed data. All database migrations
live here.

## `core/services/`

Pure business logic. Functions here do not know about HTTP or React.
They take typed inputs and return typed outputs.

## `core/actions/`

Next.js Server Actions. Thin wrappers over services. Handle
request-level concerns (auth checks, revalidation).

## `dashboard/`

Dashboard UI components and forms. Built with shadcn/ui. Shared across
all clients. Do not redesign per client.

## `components/ui/`

Base shadcn/ui components: Button, Input, Modal, Table, Badge, etc.

## `design/`

**This is where you work for each client.** Every component, section,
layout, and style file lives here. The folder is completely replaced for
each client's visual identity.

## `config/site.config.ts`

The single file a developer updates when starting a new client project.
Controls branding, enabled features, layout preferences, and theme
tokens.

------------------------------------------------------------------------

# `site.config.ts` — Client Configuration

Every client project has one central configuration file:

```typescript
// src/config/site.config.ts

export const siteConfig = {
  // Client branding (populated from DB at runtime, this is the fallback)
  name: 'Client Name',
  tagline: 'Your Interior Design Partner',
  locale: 'en',

  // Feature flags — enable/disable dashboard sections and website pages
  features: {
    gallery: true,
    testimonials: true,
    faq: true,
    categories: true,
  },

  // Analytics — IDs are loaded from env vars, set to null to disable
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? null,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? null,
  },

  // Contact — primary CTA is always WhatsApp (from DB settings)
  contact: {
    showPhoneButton: true,
    showEmailButton: false,
  },

  // Layout preferences
  layout: {
    headerStyle: 'sticky',     // 'sticky' | 'fixed' | 'static'
    footerStyle: 'detailed',   // 'minimal' | 'detailed'
  },
}
```

------------------------------------------------------------------------

# Environment Variables

Every client deployment requires these environment variables:

```bash
# .env.example

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://your-client-domain.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=clients/client-name    # ← unique per client

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Set all of these in the Vercel project dashboard. Never commit `.env.local`.

------------------------------------------------------------------------

# Database Schema

One PostgreSQL database per client, hosted on Neon. Managed with Prisma.

```prisma
// prisma/schema.prisma

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  role         Role     @default(ADMIN)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum Role {
  ADMIN
  EDITOR
}

model SiteSettings {
  id          String   @id @default(cuid())
  brandName   String
  logoUrl     String?
  phone       String?
  whatsapp    String
  email       String?
  address     String?
  facebook    String?
  instagram   String?
  twitter     String?
  linkedin    String?
  youtube     String?
  tiktok      String?
  updatedAt   DateTime @updatedAt
}

model Project {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  description String?
  images      String[]      // Cloudinary URLs
  categoryId  String?
  category    Category?     @relation(fields: [categoryId], references: [id])
  featured    Boolean       @default(false)
  status      ContentStatus @default(DRAFT)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Service {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  description String?
  icon        String?       // Icon name or Cloudinary URL
  image       String?       // Cloudinary URL
  features    String[]      // List of bullet point features
  status      ContentStatus @default(DRAFT)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Category {
  id        String     @id @default(cuid())
  name      String
  slug      String     @unique
  type      String     // 'project' | 'gallery'
  projects  Project[]
  gallery   GalleryItem[]
  createdAt DateTime   @default(now())
}

model GalleryItem {
  id         String        @id @default(cuid())
  imageUrl   String        // Cloudinary URL
  title      String?
  caption    String?
  categoryId String?
  category   Category?     @relation(fields: [categoryId], references: [id])
  status     ContentStatus @default(DRAFT)
  createdAt  DateTime      @default(now())
}

model Testimonial {
  id          String        @id @default(cuid())
  clientName  String
  clientTitle String?
  content     String
  avatarUrl   String?       // Cloudinary URL
  rating      Int?          @default(5)
  featured    Boolean       @default(false)
  status      ContentStatus @default(DRAFT)
  createdAt   DateTime      @default(now())
}

model FAQ {
  id        String        @id @default(cuid())
  question  String
  answer    String
  status    ContentStatus @default(DRAFT)
  createdAt DateTime      @default(now())
}

model SEO {
  id          String   @id @default(cuid())
  pageSlug    String   @unique // 'home' | 'projects' | 'services' | etc.
  title       String?
  description String?
  ogImageUrl  String?  // Cloudinary URL
  keywords    String[]
  updatedAt   DateTime @updatedAt
}

model Media {
  id        String   @id @default(cuid())
  url       String   // Cloudinary URL
  publicId  String   // Cloudinary public ID (for deletion)
  filename  String
  mimeType  String
  size      Int      // bytes
  alt       String?
  folder    String?
  createdAt DateTime @default(now())
}

enum ContentStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

------------------------------------------------------------------------

# Dashboard Scope

The dashboard manages:

| Section          | Create | Read | Update | Delete |
| ---------------- | ------ | ---- | ------ | ------ |
| Projects         | ✓      | ✓    | ✓      | ✓      |
| Services         | ✓      | ✓    | ✓      | ✓      |
| Categories       | ✓      | ✓    | ✓      | ✓      |
| Gallery          | ✓      | ✓    | ✓      | ✓      |
| Testimonials     | ✓      | ✓    | ✓      | ✓      |
| FAQs             | ✓      | ✓    | ✓      | ✓      |
| Website Settings | —      | ✓    | ✓      | —      |
| SEO              | —      | ✓    | ✓      | —      |
| Media Library    | ✓      | ✓    | —      | ✓      |

**Rules:**
-   Do not redesign the dashboard for individual clients.
-   Client (business owner) only changes data — never code.
-   Developer controls layout and ordering via code in `design/`.

------------------------------------------------------------------------

# Content Status Rules

All content entities support three states:

| Status      | Visible on website | Saved in DB |
| ----------- | ------------------ | ----------- |
| `DRAFT`     | No                 | Yes         |
| `PUBLISHED` | Yes                | Yes         |
| `ARCHIVED`  | No                 | Yes         |

All API queries for public website pages must filter by `status: PUBLISHED`.

------------------------------------------------------------------------

# Media Management

All media is stored on **Cloudinary**.

-   **Upload:** Via dashboard Media Library. Files go to
    `/clients/{client-folder}/` in Cloudinary.
-   **Delivery:** Use Cloudinary URLs directly in `<Image>` tags.
-   **Optimization:** Always use Next.js `<Image>` component for automatic
    WebP conversion, lazy loading, and responsive sizes.
-   **Deletion:** When a Media record is deleted from the dashboard, the
    file must also be deleted from Cloudinary using its `publicId`.
-   **Max upload size:** 10MB per file (enforced server-side).

```typescript
// Always use next/image — never raw <img> tags
import Image from 'next/image'

<Image
  src={project.images[0]}
  alt={project.title}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="..." // Cloudinary blur placeholder
/>
```

------------------------------------------------------------------------

# Authentication

Version 1 includes only:

-   Email & Password login (NextAuth Credentials provider)
-   Session-based auth (JWT)
-   Protected dashboard routes via middleware

Do not build OAuth or advanced role management initially.

The dashboard login page is at `/dashboard/login`.

All `/dashboard/**` routes are protected. Redirect unauthorized users
to `/dashboard/login`.

------------------------------------------------------------------------

# Contact Strategy

No contact form in Version 1.

Primary conversion goal: **WhatsApp**

Secondary options (configurable via `site.config.ts`):
-   Phone button (`showPhoneButton: true/false`)
-   Email button (`showEmailButton: true/false`)

All contact data comes from `SiteSettings` in the database. Never
hardcode phone numbers or WhatsApp links.

------------------------------------------------------------------------

# SEO Strategy

-   Each page has its own SEO record in the database (`SEO` table).
-   The dashboard allows editing title, description, OG image, and keywords
    per page.
-   Use Next.js `generateMetadata()` to inject SEO data server-side.
-   Default fallback: use `SiteSettings.brandName` as title prefix.

```typescript
// app/(site)/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO('home')
  return {
    title: seo?.title ?? siteConfig.name,
    description: seo?.description,
    openGraph: { images: seo?.ogImageUrl ? [seo.ogImageUrl] : [] },
  }
}
```

------------------------------------------------------------------------

# Analytics

Analytics IDs are stored in environment variables and enabled via
`site.config.ts`. Not all clients need analytics — set to `null` to
disable.

A shared `<AnalyticsProvider>` component in the root layout injects:
-   Google Analytics 4 (gtag.js)
-   Meta Pixel

------------------------------------------------------------------------

# Business Logic Rules

Business logic belongs **only** in:

-   `core/services/`
-   `core/actions/`
-   `app/api/`

Never place business logic inside:

-   `app/` page files
-   `design/`
-   UI Components

------------------------------------------------------------------------

# Data Rules

Never hardcode:

-   Brand Name
-   Logo
-   WhatsApp Number
-   Phone
-   Email
-   Address
-   Hero Content
-   Services
-   Projects
-   Gallery
-   Testimonials
-   Social Links
-   SEO Metadata

Everything must come from the database.

------------------------------------------------------------------------

# New Client Workflow

## Step 1 — Review

Review previously completed client websites. Choose the design that
most closely matches the new client's vision.

## Step 2 — Clone

Clone that repository into a new directory.

```bash
git clone git@github.com:agency/client-project-a.git new-client-name
cd new-client-name
git remote set-url origin git@github.com:agency/new-client-name.git
git remote add upstream git@github.com:agency/agency-platform-core.git
```

If no suitable design exists, clone the Core directly:

```bash
git clone git@github.com:agency/agency-platform-core.git new-client-name
```

## Step 3 — Setup

```bash
pnpm install
cp .env.example .env.local
# Fill in .env.local with client-specific values
pnpm db:push      # Apply schema to new Neon DB
pnpm db:seed      # (Optional) Load sample data
pnpm dev
```

## Step 4 — Configure Client

Update `src/config/site.config.ts`:
-   Client name and tagline
-   Enable/disable features
-   Set analytics IDs (in `.env.local`)
-   Layout preferences

## Step 5 — Customize Frontend

Work **only** inside `src/design/`:
-   Layout
-   Animations
-   Hero
-   Cards
-   Navigation
-   Branding
-   Colors (via Tailwind config / CSS variables)

Avoid any changes to `core/`, `dashboard/`, or `components/ui/`.

## Step 6 — Configure Content

Use the dashboard to add:
-   Business settings (WhatsApp, phone, address, social links)
-   Projects
-   Services
-   Gallery
-   Testimonials
-   FAQs
-   SEO per page

## Step 7 — Deploy

1.  Push to GitHub.
2.  Create a new Vercel project linked to this repository.
3.  Add all environment variables in Vercel dashboard.
4.  Connect custom client domain.
5.  Vercel auto-deploys on every push to `main`.

------------------------------------------------------------------------

# Platform Improvement Policy

When a Core change is needed:

**Ask: Will this benefit future client projects?**

| Answer | Action |
| ------ | ------ |
| YES    | Add to Core. Document in `CHANGELOG.md`. Apply to Core source repo. |
| NO     | Keep inside `design/` or `site.config.ts`. Do not pollute Core. |

Never modify `core/` for a one-off client need.

------------------------------------------------------------------------

# Core Version Tracking

Each client repository tracks its Core version in `package.json`:

```json
{
  "agencyCore": {
    "version": "1.0.0",
    "lastUpdated": "2026-07-20",
    "changes": []
  }
}
```

When applying a Core update to an existing client:
1.  Note the change in `CHANGELOG.md`.
2.  Update the `agencyCore.version` field.
3.  Document what was applied.

------------------------------------------------------------------------

# Developer Decision Matrix

| Request                            | Action         | Where              |
| ---------------------------------- | -------------- | ------------------ |
| Different hero design              | Frontend       | `design/`          |
| Different card style               | Frontend       | `design/`          |
| Different animations               | Frontend       | `design/`          |
| Different layout                   | Frontend       | `design/`          |
| Different branding / colors        | Frontend       | `design/` + config |
| Enable/disable a section           | Config         | `site.config.ts`   |
| New reusable dashboard feature     | Core Platform  | `core/` + `dashboard/` |
| New reusable API capability        | Core Platform  | `core/` + `app/api/` |
| Dashboard bug                      | Core Platform  | `core/` or `dashboard/` |
| Frontend bug                       | Client Project | `design/`          |
| Analytics setup                    | Config + Env   | `site.config.ts` + `.env.local` |

------------------------------------------------------------------------

# Success Criteria

The platform is successful when a developer can:

1.  Clone the closest previous project.
2.  Set up environment variables.
3.  Customize only `design/` and `site.config.ts`.
4.  Configure content through the dashboard.
5.  Deploy to Vercel without touching any backend code.

**Target:** A new client site should go from clone to deploy-ready in
under **1 working day** for standard designs.

If backend modifications become common for standard client requests, the
Core Platform must be improved — not each individual client project.

------------------------------------------------------------------------

# Development Principle

> Build the backend once. Reuse it for every client. Create unique
> frontends as required. Continuously improve the Core Platform only
> when the improvement benefits future projects.
> Document every Core change so the team knows exactly what version
> each client is running.
