# The Real Help, LLC

Production-grade React + Firebase application scaffold with multi-tenant architecture, role-based access, Cloud Functions backend, and audit logging.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 7 |
| Backend | Firebase (Auth, Firestore, Storage, Functions 2nd Gen) |
| Hosting | Firebase Hosting / Vercel |
| Icons | lucide-react |
| Notifications | react-hot-toast |
| Dates | date-fns |

## Prerequisites

- **Node.js 20.19+** or **22.12+**
- **Firebase CLI**: `npm install -g firebase-tools`
- A Firebase project configured in the [Firebase Console](https://console.firebase.google.com)

## Getting Started

### 1. Install Dependencies

```bash
# Root (frontend)
npm install

# Cloud Functions
cd functions && npm install && cd ..
```

### 2. Configure Environment Variables

Copy the example env file and fill in your Firebase project values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase config from the console:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_USE_EMULATORS=true
```

### 3. Firebase Setup

```bash
# Login to Firebase
firebase login

# Select your project
firebase use --add
```

### 4. Start Development

#### With Emulators (recommended for local dev)

```bash
# Terminal 1: Start Firebase emulators
npm run emulators

# Terminal 2: Start Vite dev server
npm run dev
```

#### Without Emulators

Set `VITE_USE_EMULATORS=false` in `.env.local`, then:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

### 5. Build Cloud Functions

```bash
cd functions
npm run build
```

## Project Structure

```
root/
├── src/
│   ├── app/
│   │   ├── router/        # Route config & guards
│   │   ├── providers/     # AuthProvider, AppProviders
│   │   └── layouts/       # App, Admin, Public layouts
│   ├── components/
│   │   ├── ui/            # Button, Card, Input, Badge, Spinner
│   │   ├── forms/         # FormField
│   │   ├── tables/        # DataTable
│   │   └── feedback/      # Toast re-export
│   ├── features/
│   │   ├── auth/          # Login page
│   │   ├── dashboard/     # Dashboard page
│   │   ├── records/       # Records list & detail
│   │   ├── workflows/     # Workflow management
│   │   ├── files/         # File upload & management
│   │   └── admin/         # Admin dashboard, settings, audit
│   ├── hooks/             # useFirestore, useTenant, usePagination
│   ├── lib/
│   │   ├── firebase/      # Firebase client init
│   │   ├── utils/         # cn(), formatters
│   │   ├── validation/    # Input validation
│   │   └── constants/     # Roles, routes
│   ├── types/             # TypeScript interfaces
│   ├── styles/            # Tailwind entry CSS
│   └── main.tsx           # App entry point
├── functions/
│   └── src/
│       ├── config/        # Firebase Admin init
│       ├── auth/          # Auth event handlers
│       ├── callable/      # Callable functions
│       ├── triggers/      # Firestore triggers
│       ├── jobs/          # Scheduled functions
│       ├── utils/         # Audit logging, Firestore helpers
│       ├── types/         # Function types
│       └── index.ts       # Function exports
├── firestore.rules        # Firestore security rules
├── firestore.indexes.json # Composite indexes
├── storage.rules          # Storage security rules
└── firebase.json          # Firebase config + emulators
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run test` | Placeholder for test runner |
| `npm run emulators` | Start Firebase emulators |
| `npm run deploy` | Deploy everything to Firebase |
| `npm run deploy:hosting` | Deploy only hosting |
| `npm run deploy:functions` | Deploy only Cloud Functions |
| `npm run deploy:rules` | Deploy Firestore & Storage rules |

## Emulator Usage

The Firebase Emulator Suite runs locally for Auth, Firestore, Storage, and Functions:

| Service | Port |
|---------|------|
| Auth | 9099 |
| Firestore | 8080 |
| Storage | 9199 |
| Functions | 5001 |
| Emulator UI | 4000 |

Emulator data is persisted to `./emulator-data/` between restarts.

## Firestore Data Model

Multi-tenant structure:

```
/tenants/{tenantId}
  /users/{userId}
  /records/{recordId}
  /workflows/{workflowId}
  /files/{fileId}
  /auditLogs/{logId}
```

## Architecture Principles

- **Thin frontend**: Browser reads data and submits user intents
- **Cloud Functions**: Handle privileged mutations, workflow transitions, audit logging
- **Security Rules**: Enforce access boundaries (signed-in, tenant isolation, role-based)
- **Audit logging**: Every meaningful mutation gets an audit record
- **Denormalized views**: List-ready fields to minimize read amplification
- **Role-based access**: Centralized role logic, expandable without rewrites

## Deploy

```bash
# Full deploy
npm run deploy

# Or individually
npm run deploy:hosting
npm run deploy:functions
npm run deploy:rules
```

## Brand Colors

| Color | Value |
|-------|-------|
| Black | `#0A0A0A` |
| Blue (primary) | `#1E3A8A` |
| Silver | `#71717A` (mid), `#D4D4D8` (light) |
| Surface | `#FFFFFF`, `#F4F4F5` |
