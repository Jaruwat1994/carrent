# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # dev server at localhost:3000
npm run build     # production build (runs tsc + next build)
npm run lint      # eslint
npm run seed      # seed MongoDB via scripts/seed.ts
npx tsc --noEmit  # type-check only
```

No test framework is configured.

## Critical: Next.js 16 Breaking Changes

**`params` in route handlers is now `Promise<{...}>`** — must `await params`:
```ts
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

**Middleware renamed** — Next.js 16 uses `src/proxy.ts` instead of `src/middleware.ts`. The export must be named `proxy`, not `middleware`. The `config.matcher` export stays the same.

## Auth Architecture

Two separate auth systems run in parallel:

**Customer auth** — NextAuth v5 (`next-auth@^5.0.0-beta.31`) with JWT strategy. Config in `src/lib/auth.ts`. `trustHost: true` is required for Vercel. Uses `bcryptjs` + `mongoose` (Node.js-only APIs — cannot run on Edge runtime). Session exposed via `useSession()` client-side or `auth()` server-side.

**Admin auth** — Custom JWT via `jose`. Login at `/api/admin/login` sets an `admin-token` httpOnly cookie signed with `AUTH_SECRET`. Verified in `src/proxy.ts` using `jwtVerify`.

`src/proxy.ts` guards routes: `/admin/*` checks `admin-token` cookie; `/customer/*` and `/booking/create` check NextAuth session via `auth()`. The `auth()` call is intentionally limited to protected/auth paths only — calling it on all requests causes 500s on public pages.

## Environment Variables

Required in `.env.local`:
- `MONGODB_URI` — MongoDB connection string
- `AUTH_SECRET` — shared secret for both NextAuth JWT and admin JWT signing
- `NEXTAUTH_URL` — must be set to the full production URL (e.g. `https://carallcar.vercel.app`) on Vercel

## Data Models (`src/lib/models/`)

- `Customer` — email, password (bcrypt), firstName, lastName, phone, idCardNumber, drivingLicenseNumber, status (`blacklisted` blocks login)
- `Vehicle` — brand/model/year/seats/color, pricePerDay/Week/Month, features[], images[], status, isActive
- `Rental` — rentalCode (nanoid), vehicleId (ref), customerId (ref), startDate, endDate, totalPrice, deposit, status pipeline: `pending→confirmed→active→completed/cancelled/overdue`
- `Admin` — email, password (bcrypt), name, role (`superadmin|admin`)
- `CarouselSlide` — image/title/subtitle for homepage carousel
- `PaymentMethod` — type (`bank_transfer|promptpay`), bankName, accountNumber, accountName, qrCodeUrl, isActive, displayOrder

## Admin Panel

All admin pages (`src/app/admin/*/page.tsx`) must include the `<AdminSidebar />` wrapper:
```tsx
return (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
    <AdminSidebar />
    <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>
      {/* page content */}
    </main>
  </div>
)
```

Admin API routes at `/api/admin/*` are protected only by the proxy — no auth middleware inside the route handlers themselves.

## Styling

No CSS modules or Tailwind utility classes in JSX. All styling uses inline `style={{}}` objects with CSS variables defined in `src/app/globals.css` (e.g. `var(--accent)`, `var(--bg-secondary)`, `var(--radius-card)`). Global class names like `btn-primary`, `btn-outline`, `input-field`, `field-label` are defined in globals.css. Font families: Raleway (headings/brand), Sarabun (Thai body text), Fira Code/Sans (admin UI).
