# Content Vault

A modern content management application for creating, organizing, and storing rich text entries. Built with Next.js 16 and React 19.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 |
| UI | React 19 + React Compiler |
| Database | PostgreSQL via Drizzle ORM |
| Authentication | Supabase (Magic Link + Google OAuth) |
| Rich Text Editor | Tiptap |
| UI Components | @base-ui/react (headless) |
| Icons | lucide-react |
| Validation | Zod |
| Styling | CSS Modules with OKLch color system |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase project)
- Supabase project for authentication

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
DATABASE_URL=your_postgres_connection_string
DATABASE_URL_MIGRATION=your_postgres_connection_string_for_migrations
```

### Installation

```bash
# Install dependencies
npm install

# Push database schema (development)
npm run db:push

# Or run migrations (production)
npm run db:migrate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate migration from schema changes |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:push` | Push schema directly to database |
| `npm run db:studio` | Open Drizzle Studio |

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── auth/
│   │   └── callback/             # OAuth callback handler
│   ├── dashboard/
│   │   ├── add/                  # Create new entry
│   │   ├── category/
│   │   │   └── [id]/             # Category view & add entry
│   │   ├── entry/
│   │   │   └── [id]/             # View entry
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   └── page.tsx              # All entries view
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout
│   ├── manifest.ts               # PWA manifest
│   └── page.tsx                  # Login page
├── components/
│   ├── add-category/             # Category creation modal
│   ├── button/                   # Reusable button component
│   ├── category-dropdown/        # Category selector
│   ├── dialog/                   # Modal dialog component
│   ├── entries-grid/             # Entry cards grid display
│   ├── entry-editor/             # Tiptap rich text editor
│   ├── grid-skeleton/            # Loading skeleton for grid
│   ├── header/                   # Page header with actions
│   ├── login-form/               # Magic link & Google OAuth
│   ├── new-entry-form/           # Entry creation form
│   ├── new-entry-skeleton/       # Loading skeleton for form
│   ├── sidebar/                  # Navigation sidebar
│   ├── sidebar-skeleton/         # Loading skeleton for sidebar
│   └── sign-out-button/          # Sign out action
├── lib/
│   ├── drizzle/
│   │   ├── drizzle.ts            # Database client
│   │   ├── migrations/           # Database migrations
│   │   └── schema.ts             # Database schema
│   └── supabase/
│       ├── client.ts             # Browser Supabase client
│       ├── proxy.ts              # Middleware for auth
│       └── server.ts             # Server Supabase client
├── utils/
│   └── time.ts                   # Time formatting utilities
└── proxy.ts                      # Middleware configuration
```

## Database Schema

```
categories              entries                     collaborators
├── id (uuid, PK)       ├── id (uuid, PK)          ├── id (uuid, PK)
├── userId (uuid)       ├── userId (uuid)          ├── entryId (uuid, FK)
├── name (text)         ├── categoryId (uuid, FK)  ├── invitedBy (uuid)
├── createdAt           ├── title (text)           ├── collaboratorEmail
└── updatedAt           ├── content (text/HTML)    ├── collaboratorId
                        ├── createdAt              ├── inviteToken (unique)
                        └── updatedAt              ├── status
                                                   └── createdAt
```

## Features

- Magic link and Google OAuth authentication
- Rich text editor with formatting toolbar
- Organize entries into categories
- Responsive design with dark mode support
- Server-side rendering with Suspense boundaries
- PWA support

## Missing Features / Roadmap

- [ ] **Delete entries** - UI exists but not wired to server action
- [ ] **Edit entries** - Entries are read-only after creation
- [ ] **Collaboration** - Database schema exists but not implemented
- [ ] **Search/filter** - No search functionality for entries
- [ ] **Export/backup** - No data export options
- [ ] **Entry sharing** - Collaborator invite system not built

## Security Notes

- HTML content is sanitized with DOMPurify before rendering
- Routes are protected via Supabase middleware
- Server actions validate input with Zod schemas
- **Known issue:** `getEntry()` and `getEntries()` queries should verify user ownership

## License

Private
