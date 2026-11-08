# ProxiService Project Documentation

## 1. Document purpose

This document describes the ProxiService application based on the actual source code, database schema, seed data, tests, configuration, and repository history.

It distinguishes implemented functionality from partial functionality, limitations, and missing features. It does not contain passwords, API keys, session secrets, or other sensitive values.

## 2. Project summary

ProxiService is a local-services marketplace for Greater Tunis. It connects clients with service providers such as mechanics, cleaners, electricians, plumbers, painters, and carpenters.

The main business workflow is:

1. A client creates an account or signs in.
2. The client describes a problem in natural language.
3. The application classifies the problem into a service category and urgency.
4. The client confirms the analysis.
5. Matching providers are searched by category, location, radius, price, rating, availability, and urgency.
6. The client chooses a provider, service, date, and time.
7. A booking request is created.
8. The provider accepts, rejects, starts, or completes the booking.
9. The client can review completed work.

The application is a working prototype and academic demonstration. It is not yet a complete production marketplace.

## 3. Repository information

- Repository: `MalekBR1506/ProxiServices`
- Main branch: `main`
- Framework: Next.js App Router
- Database: MySQL/MariaDB
- ORM: Prisma
- Styling: Tailwind CSS
- Test framework: Vitest
- Deployment mode: local development documented with Windows, XAMPP, and MySQL

No `CLAUDE.md` file exists in the repository.

Primary files:

- `README.md`: setup and demo information
- `package.json`: scripts and dependencies
- `prisma/schema.prisma`: database model
- `prisma/seed.ts`: demo data
- `src/app`: pages and API routes
- `src/components`: reusable React components
- `src/server`: authentication, database, and business services
- `tests`: automated tests

## 4. Project structure

```text
.
├── .vscode/
│   └── tasks.json
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── bookings/[id]/
│   │   ├── client/dashboard/
│   │   ├── client/request/new/
│   │   ├── login/
│   │   ├── provider/dashboard/
│   │   ├── provider/onboarding/
│   │   ├── providers/[id]/
│   │   ├── register/
│   │   ├── search/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── server/
│   ├── types/
│   └── middleware.ts
├── tests/
├── .env.example
├── next.config.mjs
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

Generated or local-only directories are not application source:

- `node_modules/`
- `.next/`
- `src/generated/prisma/`
- local `.env`

## 5. Technology and dependency inventory

### Runtime dependencies

| Dependency | Use |
|---|---|
| `next` | Application framework, routing, middleware, server rendering |
| `react`, `react-dom` | User interface rendering |
| `@prisma/adapter-mariadb` | MariaDB adapter for Prisma |
| `@prisma/client` | Prisma client package declaration |
| `mariadb` | MariaDB driver |
| `bcrypt` | Password hashing and verification |
| `jose` | JWT creation and verification |
| `zod` | Runtime request validation |
| `leaflet` | Interactive maps |
| `lucide-react` | Interface icons |

### Development dependencies

| Dependency | Use |
|---|---|
| `typescript` | Type checking |
| `vitest` | Unit and route-handler tests |
| `prisma` | Client generation, migrations, database operations |
| `tsx` | Running the TypeScript seed script |
| `dotenv` | Loading environment variables for Prisma and seed |
| `tailwindcss` | Utility CSS generation |
| `postcss` | CSS processing |
| `autoprefixer` | CSS vendor prefixes |
| `@types/*` | TypeScript declarations |

## 6. Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Intended Next.js lint command; currently prompts because no ESLint configuration is committed |
| `npm test` | Run Vitest tests |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Apply development migrations |
| `npm run db:seed` | Insert or update demo data |
| `npx tsc --noEmit` | Type-check the project |

## 7. Application routes

| Route | Access | Purpose | Status |
|---|---|---|---|
| `/` | Public | Homepage and service categories | Implemented |
| `/login` | Public | Sign in | Implemented |
| `/register` | Public | Client/provider registration | Implemented |
| `/search` | Client | Provider search and map | Implemented |
| `/client/dashboard` | Client | Client bookings and activity | Implemented |
| `/client/request/new` | Client | AI-assisted problem analysis | Implemented |
| `/provider/dashboard` | Provider | Provider management dashboard | Implemented |
| `/provider/onboarding` | Provider | Incomplete profile guidance | Partial |
| `/providers/[id]` | Public | Provider profile and booking | Implemented |
| `/bookings/[id]` | Booking participant | Booking details and actions | Implemented |

## 8. API inventory

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register client or provider |
| `POST` | `/api/auth/login` | Authenticate a user |
| `POST` | `/api/auth/logout` | Clear the session cookie |
| `GET` | `/api/auth/me` | Return the current user session |
| `GET` | `/api/categories` | Return categories and provider counts |
| `POST` | `/api/analyses` | Analyze a client problem and persist ready analyses |
| `GET` | `/api/analyses/[id]` | Load an owned analysis |
| `PATCH` | `/api/analyses/[id]` | Confirm an analysis |
| `POST` | `/api/ai/chat` | Direct AI chat endpoint |
| `GET` | `/api/providers/search` | Search and rank providers |
| `GET` | `/api/providers/[id]` | Load a public provider profile |
| `PUT` | `/api/providers/[id]` | Update the provider's own profile |
| `PUT` | `/api/providers/[id]/availability` | Replace weekly availability |
| `GET` | `/api/providers/[id]/slots` | Calculate available slots |
| `GET` | `/api/bookings` | List the caller's bookings |
| `POST` | `/api/bookings` | Create a booking request |
| `GET` | `/api/bookings/[id]` | Load a booking for a participant |
| `PATCH` | `/api/bookings/[id]` | Execute a booking status action |
| `POST` | `/api/reviews` | Create a client review |

Most request bodies use strict Zod schemas and return `{ success, data }` or `{ success: false, error }`.

## 9. Authentication and authorization

Authentication is implemented in `src/server/auth.ts`.

### Session design

- JWT signed with `SESSION_SECRET`
- Seven-day expiry
- HTTP-only cookie: `proxiservice_session`
- `SameSite=Lax`
- `Secure` in production
- JWT algorithm restricted to HS256

### Middleware protection

`src/middleware.ts` protects:

- `/client/*`
- `/provider/*`
- `/bookings/*`
- `/search`

Role rules:

- Client-only pages require `CLIENT`.
- Provider-only pages require `PROVIDER`.
- Booking pages require a valid session, with participant authorization checked by the service layer.

### Authorization rules

Implemented:

- Users can load their own session.
- Clients cannot edit provider profiles.
- Providers can edit only their own profile.
- Clients can access only their own analyses.
- Only booking participants can load or change a booking.
- Only clients can create reviews.
- Only completed bookings can be reviewed.
- Phone numbers are hidden until the provider accepts a booking.

Missing:

- Email verification
- Password reset
- Account deletion
- Rate limiting
- Brute-force protection
- Admin authorization
- Audit logs

## 10. Database model

The schema is in `prisma/schema.prisma`.

### User

Stores account identity, contact data, role, coordinates, and address.

Relationships:

- Optional `Provider`
- Client `Booking[]`
- Client `Review[]`
- `ProblemAnalysis[]`

### Category

Stores service categories and their icons.

Seeded categories:

- Mechanic
- Cleaner
- Electrician
- Plumber
- Painter
- Carpenter

### Provider

Stores provider profile information:

- Biography
- Experience
- Operational radius
- Rating average
- Review count
- Completed job count
- Verification flag

Relationships:

- One user account
- Provider categories
- Services
- Portfolio items
- Availability
- Bookings
- Reviews

### ProviderCategory

Many-to-many relationship between providers and categories.

### Service

Stores provider offerings:

- Title
- Description
- Price
- Price type
- Duration
- Active flag

### PortfolioItem

Stores provider portfolio entries.

### Availability

Stores weekly weekday/start/end working-hour ranges.

### Booking

Stores:

- Client, provider, and service
- Start and end time
- Address and coordinates
- Notes and problem summary
- Price snapshot
- Price type
- Booking status
- Timeline timestamps
- Optional problem-analysis relationship

### ProblemAnalysis

Stores:

- Owning client
- Category
- Urgency
- Summary
- Conversation messages as JSON
- Confirmation time
- Expiration time
- Analysis status

### Review

Stores one review per booking and belongs to both the client and provider.

## 11. Database migrations

Migrations:

1. `20261107000000_init`
2. `20261107193208_booking_timeline`
3. `20261107223108_problem_analysis`

Important portability observation: later migration files reference lowercase `booking`, while the initial migration creates `Booking`. This may work on case-insensitive Windows/MySQL configurations but can fail on case-sensitive MySQL/Linux configurations.

## 12. Seed data

`prisma/seed.ts` is designed to be idempotent through stable IDs and upserts.

It creates:

- 6 categories
- 25 providers
- 10 clients
- Provider services
- Portfolio items
- Weekly availability
- Historical completed bookings
- Reviews
- Demo client bookings
- Pending provider requests
- A same-day accepted booking for testing

The README documents demo accounts, but credentials are intentionally not repeated in this document.

## 13. Feature inventory

### 13.1 Homepage and public navigation

**Purpose:** Introduce the marketplace and direct users to registration and service discovery.

**Users:** Guests, clients, providers.

**Location:** `/`, Navbar, Footer.

**Flow:**

1. Homepage requests `/api/categories`.
2. Categories and provider counts are shown.
3. Users can navigate to registration, login, services, and explanation sections.
4. Navbar changes based on authentication and role.

**Frontend:**

- `src/app/page.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/Logo.tsx`

**Backend:** `GET /api/categories`.

**Validation/security:** Category data is loaded from the server. No user-sensitive action is available without authentication.

**Status:** Implemented.

**Limitations:**

- Category cards route to client registration rather than directly filtering providers.
- Homepage content is mostly static.
- No admin-managed content.

### 13.2 Client and provider registration

**Purpose:** Create accounts and collect the information required for marketplace participation.

**Users:** Guests.

**Location:** `/register`.

**Client flow:**

1. Enter name, email, phone, password, and location.
2. Submit the form.
3. Server validates and hashes the password.
4. User and session are created.
5. Client is redirected to a new problem request.

**Provider flow:**

1. Enter account details.
2. Select a service category.
3. Enter experience, radius, biography, services, prices, and portfolio.
4. Select a location using the map or browser geolocation.
5. Server creates the user, provider profile, category relation, services, portfolio, and default availability.
6. Provider is redirected to the dashboard.

**Frontend:**

- `src/app/register/page.tsx`
- `src/components/LocationPicker.tsx`
- `src/components/MapComponent.tsx`

**Backend:** `POST /api/auth/register`, `GET /api/categories`.

**Database:** `User`, `Provider`, `Category`, `ProviderCategory`, `Service`, `PortfolioItem`, `Availability`.

**Validation:**

- Name: 2–120 characters.
- Email: valid and normalized to lowercase.
- Password: 8–72 characters.
- Provider category required.
- Provider service list required.
- Prices, durations, coordinates, radius, and text lengths bounded.

**Status:** Implemented.

**Limitations:**

- No email verification.
- No password confirmation field.
- Provider form contains default sample service and portfolio values.
- Incomplete-provider onboarding redirects to registration setup and may cause a duplicate-account conflict.

### 13.3 Login, logout, and current session

**Purpose:** Authenticate users and retain their session.

**Users:** Registered clients and providers.

**Location:** `/login`, Navbar logout.

**Flow:**

1. User submits email and password.
2. Server loads the user.
3. Bcrypt verifies the password.
4. JWT is created.
5. HTTP-only cookie is set.
6. User is redirected according to role.

**Frontend:**

- `src/app/login/page.tsx`
- `src/components/Navbar.tsx`
- `src/lib/auth-client.ts`

**Backend:** `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`.

**Status:** Implemented.

**Limitations:** No password recovery, account verification, login throttling, or account deletion.

### 13.4 AI-assisted problem analysis

**Purpose:** Convert a natural-language problem into category, urgency, summary, and search context.

**Users:** Clients.

**Location:** `/client/request/new`.

**Flow:**

1. Client writes a problem.
2. Conversation is posted to `/api/analyses`.
3. Gemini or Groq is attempted if configured.
4. A local classifier is used as fallback.
5. The result is `need_more` or `ready`.
6. Ready results create a `ProblemAnalysis` record.
7. Client reviews and confirms the result.
8. Client is sent to provider search.

**Categories:** Mechanic, cleaning, electrician, plumber, painter, carpenter.

**Language handling:** English, French, Tunisian Derja, Arabizi, Arabic, mixed language, common typos, and missing accents are intended to be supported.

**Frontend:**

- `src/app/client/request/new/page.tsx`
- `src/components/AIProblemChat.tsx`

**Backend:**

- `POST /api/analyses`
- `GET /api/analyses/[id]`
- `PATCH /api/analyses/[id]`
- `src/server/services/ai-chat.ts`
- `src/server/services/analyses.ts`

**Database:** `ProblemAnalysis`, `User`, `Booking.analysisId`.

**Status:** Implemented, but quality is partial.

**Limitations:**

- Without external AI keys, classification is finite vocabulary/phrase matching rather than semantic AI.
- External AI provider failures silently fall through to local classification.
- `/api/ai/chat` is separate from the current frontend analysis path and is not used by the current UI.
- No confidence score.
- No human escalation.
- Analysis expiry is stored but its lifecycle is incomplete:
  - Expired records are not automatically changed to `EXPIRED`.
  - Reopening does not consistently reject expired analyses.
  - Confirmation should independently validate `expiresAt`.
- Ambiguous messages may still receive repetitive questions.

### 13.5 Provider search and matching

**Purpose:** Find appropriate providers for a confirmed request.

**Users:** Clients.

**Location:** `/search?analysisId=...`.

**Flow:**

1. Client must have a confirmed analysis.
2. Filters are validated.
3. Providers are filtered by category.
4. Optional rating, price, query, and radius filters are applied.
5. Haversine distance is calculated.
6. Providers outside the requested/provider radius are removed.
7. Availability is calculated for the next seven days.
8. Match score is calculated.
9. Results are sorted.

**Match weights:**

Normal urgency:

- Distance: 30%
- Rating: 25%
- Availability: 20%
- Price: 15%
- Experience: 10%

High urgency:

- Distance: 45%
- Availability: 35%
- Rating: 15%
- Price: 5%
- Experience: 0%

**Frontend:**

- `src/app/search/page.tsx`
- `src/components/ProviderCard.tsx`
- `src/components/MapComponent.tsx`

**Backend:**

- `GET /api/providers/search`
- `src/server/services/matching.ts`
- `src/lib/geo.ts`

**Status:** Implemented.

**Limitations:**

- No pagination.
- Query search uses substring matching rather than full-text search.
- No provider response-time or cancellation-rate factor.
- Verification is displayed but not required for ranking.
- Availability calculations may become expensive at scale.

### 13.6 Maps and location

**Purpose:** Let users select locations and visualize nearby providers.

**Users:** Clients and providers.

**Location:** Registration, provider profile editor, provider search.

**Behavior:**

- Leaflet is loaded dynamically in the browser.
- OpenStreetMap tiles are used.
- Users can click the map to set coordinates.
- Browser geolocation can set coordinates.
- Search shows provider markers and a search-radius circle.

**Frontend:**

- `src/components/MapComponent.tsx`
- `src/components/LocationPicker.tsx`

**Status:** Implemented.

**Limitations:**

- No reverse geocoding.
- Human-readable address must be entered manually.
- Browser geolocation requires permission and suitable browser/security settings.
- No production tile-usage policy is implemented.
- Public provider profiles expose location-related information.

### 13.7 Public provider profile

**Purpose:** Let clients inspect a provider before booking.

**Users:** Guests and clients.

**Location:** `/providers/[id]`.

**Displays:**

- Name and initials avatar
- Verification indicator
- Categories
- Rating and review count
- Experience and completed jobs
- Address and service radius
- Biography
- Services and prices
- Working hours
- Portfolio
- Reviews
- Available slots

**Frontend:**

- `src/app/providers/[id]/page.tsx`
- `src/components/SlotPicker.tsx`

**Backend:** Provider profile and slot endpoints.

**Status:** Implemented.

**Limitations:**

- No uploaded profile images.
- Verification is only a displayed boolean; no verification workflow exists.
- No favorites, comparison, or messaging.

### 13.8 Booking creation

**Purpose:** Create a request for a provider service.

**Users:** Clients.

**Location:** Booking panel on provider profile.

**Flow:**

1. Select service.
2. Select available day and time.
3. Enter job address, problem summary, and notes.
4. Server verifies client, provider, service, analysis, category, time, availability, and conflicts.
5. Provider row is locked during the overlap check.
6. Booking is created using the database service price.

**Database:** `Booking`, `User`, `Provider`, `Service`, `ProblemAnalysis`.

**Status:** Implemented.

**Limitations:**

- No payment or deposit.
- No notification system.
- No calendar export.
- No rescheduling.
- No cancellation reason or dispute process.

### 13.9 Availability and slot calculation

**Purpose:** Prevent invalid and conflicting appointment times.

**Users:** Providers and clients.

**Provider controls:**

- Enable or disable weekdays.
- Set start and end time.
- Save the complete weekly schedule.

**Client view:**

- See available days.
- See available time slots.
- Select a slot.

**Rules:**

- Tunis time is treated as UTC+1 throughout the year.
- Slot starts are generated using the service duration.
- Past slots are removed.
- Pending, accepted, and in-progress bookings block time.
- Enabled ranges must be at least 30 minutes.
- Slot requests are limited to 14 days.

**Status:** Implemented.

**Limitations:**

- Only one range per weekday is supported by the editor.
- No holidays, vacations, or exceptions.
- Existing bookings are not automatically reconciled after schedule changes.

### 13.10 Booking lifecycle

**Statuses:**

- `PENDING`
- `ACCEPTED`
- `REJECTED`
- `CANCELLED`
- `IN_PROGRESS`
- `COMPLETED`

**Provider actions:**

- Accept
- Reject
- Start on appointment day
- Complete

**Client actions:**

- Cancel pending or accepted bookings
- Review completed bookings

**Status:** Implemented with server-side status checks and transaction guards.

**Limitations:**

- No reminders.
- No automatic missed-appointment handling.
- No notifications.
- Provider start is permitted on the appointment day rather than strictly after appointment start.

### 13.11 Client dashboard

**Purpose:** Show client bookings, activity, and basic profile details.

**Location:** `/client/dashboard`.

**Displays:**

- Active booking count
- Upcoming appointment count
- Completed booking count
- Upcoming appointments
- Recent activity
- Basic profile data

**Status:** Implemented.

**Limitations:**

- No profile editing.
- No filtering or pagination.
- Counts are calculated from the loaded booking list.

### 13.12 Provider dashboard

**Purpose:** Manage provider activity and profile.

**Location:** `/provider/dashboard`.

**Tabs:**

- Overview
- Requests
- Availability
- My Profile

**Provider capabilities:**

- Review pending requests.
- Accept or decline requests.
- View today's and upcoming jobs.
- Update weekly availability.
- Edit biography, categories, services, prices, duration, portfolio, and location.
- View public profile.

**Status:** Implemented.

**Limitations:**

- No revenue or earnings data.
- No advanced analytics.
- No verification application.
- No document/image uploads.
- No provider-side messaging.

### 13.13 Reviews and ratings

**Purpose:** Let clients rate completed provider work.

**Flow:**

1. Booking must be completed.
2. Client submits 1–5 stars.
3. Client writes a 3–2000 character comment.
4. Review is created transactionally.
5. Provider rating aggregate is recalculated.

**Status:** Implemented.

**Limitations:**

- No review editing or deletion.
- No provider response.
- No moderation or abuse reporting.
- Rating data is redundantly stored on the provider and review tables.

## 14. Error handling and validation

Shared backend helpers in `src/server/http.ts` provide:

- Consistent success/failure JSON responses.
- Zod request parsing.
- Business error conversion using `ServiceError`.

Client-side API helper:

- `src/lib/api.ts`

Reusable UI states:

- Loading spinner
- Error state with retry
- Empty state
- Status/error notice

Limitations:

- Some unexpected exceptions are rethrown to the framework.
- Homepage and registration use raw `fetch` instead of the shared API helper.
- AI provider errors silently fall back.
- No structured logging, request IDs, metrics, or tracing.

## 15. Testing

### Test files

- `tests/routes.test.ts`
- `tests/slots.test.ts`
- `tests/matching.test.ts`
- `tests/ai-chat.test.ts`

### Covered behavior

- Login success and failure
- HTTP-only cookie behavior
- Session and ownership restrictions
- Provider profile authorization
- Booking creation validation
- Service ownership validation
- Slot generation
- Past and outside-hours rejection
- Overlap and double-booking protection
- Booking status transitions
- Phone visibility rules
- Review validation and duplicate prevention
- Availability validation
- Matching score calculation
- Multilingual and typo-tolerant AI fallback classification

### Verified commands

- `npm test`: 64 tests passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed

The production build emitted a warning related to `jose` and Edge Runtime API detection.

`npm run lint` is currently not a non-interactive validation command because Next.js prompts for ESLint setup and no ESLint configuration is committed.

### Missing testing

- Browser end-to-end tests
- Real MariaDB integration tests
- Seed verification tests
- External Gemini/Groq integration tests
- Direct `/api/ai/chat` tests
- Provider search route tests
- Categories endpoint tests
- Public profile route tests
- Map interaction tests
- Geolocation permission tests
- Registration UI tests
- Provider profile editor UI tests
- Booking UI tests
- Analysis expiry tests
- Production middleware tests

## 16. Implemented, partial, missing, and risky functionality

### Implemented

- Public marketplace homepage
- Client/provider registration
- Login/logout and JWT sessions
- Role-based authorization
- Provider profiles
- Services and portfolio
- Provider availability
- AI-assisted problem analysis
- Provider search and ranking
- Haversine distance calculation
- Leaflet map visualization
- Slot generation
- Booking lifecycle
- Reviews and rating aggregation
- Demo seed dataset
- Automated unit and route-handler tests

### Partially implemented

- AI semantic understanding
- Provider verification
- Location/address handling
- Provider onboarding
- Analysis expiration
- Search scalability
- Error observability

### Missing

- Admin role and admin panel
- Payments
- Notifications
- Email/SMS
- Chat or messaging
- Password reset
- Email verification
- Provider document verification
- Dispute handling
- Moderation
- Calendar integration
- Analytics
- Production monitoring
- Rate limiting

### Risky edge cases

1. Analysis confirmation should independently reject expired timestamps.
2. Analysis reopening should validate expiry.
3. Migration table casing should be standardized.
4. The direct AI route should either be integrated, tested, or removed.
5. Provider incomplete-profile onboarding should be separated from account registration.
6. External AI errors should be observable without exposing provider secrets.
7. Provider start rules should consider appointment start time, not only calendar date.
8. Production map tile usage and privacy should be reviewed.

## 17. Security and privacy

### Positive controls

- Passwords use bcrypt hashing.
- JWTs are stored in HTTP-only cookies.
- Tokens and password hashes are not returned in normal authentication responses.
- JWT verification restricts the algorithm.
- Server-side ownership checks protect provider profiles, analyses, bookings, and reviews.
- Phone numbers are hidden before provider acceptance.
- API inputs are generally bounded with strict Zod schemas.
- Map popup values are escaped before HTML interpolation.

### Missing controls

- Login and AI rate limiting
- Brute-force prevention
- Email verification
- Password recovery
- CSRF defense beyond SameSite cookie behavior
- Audit logs
- Monitoring and alerting
- Consent/privacy notice for sending problem descriptions to external AI providers
- Formal location privacy policy
- Review moderation and abuse reporting

## 18. Academic documentation recommendations

The project can support the following course documents:

1. Project overview and business problem
2. Stakeholder and user-role analysis
3. Functional requirements
4. Non-functional requirements
5. Use-case descriptions
6. System architecture
7. Database ERD and relationship explanation
8. API specification
9. Authentication and authorization design
10. AI triage design and limitations
11. Matching algorithm explanation
12. Booking state machine
13. Availability and scheduling logic
14. UI navigation map
15. Test strategy and results
16. Security and privacy considerations
17. Deployment and setup guide
18. Known limitations and future work

## 19. Final assessment

ProxiService successfully demonstrates a complete local-services marketplace prototype from problem description through provider discovery, appointment selection, booking, provider action, and review.

The strongest implemented areas are:

- Clear role separation
- Server-side authorization
- Transactional booking checks
- Availability calculation
- Provider matching
- Seeded demonstration data
- Automated business-rule tests

The main areas requiring work before describing the system as production-ready are:

- External AI reliability and observability
- Analysis expiration correctness
- Notifications and communication
- Payments
- Provider verification
- Rate limiting and abuse prevention
- Integration and browser testing
- Administration and moderation
- Production database portability
- Production monitoring and deployment controls
