# AI Resume Analyzer & Job Match System

## Overview

This is an AI-powered resume analyzer and job matching prototype with a gamified, cyberpunk-themed dashboard interface. The application allows users to upload resumes, analyzes them against job requirements, and displays match scores along with skill visualizations in a futuristic "Command Center" style UI.

The project uses a React frontend with 3D visual effects and a Node.js/Express backend with PostgreSQL for data persistence. The current implementation returns mock analysis data for UI development purposes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom cyberpunk theme (dark mode, neon accents, glassmorphism)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **3D Effects**: Three.js via @react-three/fiber and @react-three/drei for particle backgrounds
- **Animations**: Framer Motion for page transitions and hover effects
- **Charts**: Recharts for data visualization (radial bar charts, radar charts)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled via tsx)
- **API Structure**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Build System**: Custom build script using esbuild for server, Vite for client

### Data Flow
1. User uploads resume via drag-and-drop interface
2. Frontend sends FormData to `/api/analyze` endpoint
3. Backend processes (currently returns mock data) and returns analysis result
4. Results stored in localStorage and displayed on dashboard page

### Key Design Patterns
- **Shared Schema**: Types and validation schemas shared between client/server in `shared/` directory
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared directory
- **Component Structure**: UI primitives in `components/ui/`, feature components at `components/` root
- **API Contract**: Route definitions with Zod schemas ensure type safety across boundaries

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and migrations in `migrations/` directory
- **drizzle-kit**: CLI tool for database schema push (`npm run db:push`)

### Third-Party Libraries
- **Radix UI**: Headless component primitives for accessible UI elements
- **Recharts**: React charting library for data visualization
- **Three.js ecosystem**: 3D rendering for background effects
- **Framer Motion**: Animation library
- **react-dropzone**: File upload drag-and-drop functionality
- **maath**: Math utilities for 3D random point generation

### Development Tools
- **Replit plugins**: Dev banner, cartographer, runtime error overlay (development only)
- **PostCSS + Autoprefixer**: CSS processing pipeline

### Session/Storage
- **connect-pg-simple**: PostgreSQL session store (available but not currently used)
- **localStorage**: Client-side storage for analysis results between pages