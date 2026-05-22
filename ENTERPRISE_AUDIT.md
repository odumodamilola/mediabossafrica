# ENTERPRISE SYSTEM AUDIT & SDLC RECONSTRUCTION
**Project:** Oroki Innovation Hub  
**Date:** May 2026  
**Auditor:** Principal Software Engineering Team  

## 1. EXECUTIVE SYSTEM OVERVIEW
### Application Summary
Oroki Innovation Hub is an educational and entrepreneurial platform targeting youth, SMEs, and innovators in Osun State. Currently, the application exists as a frontend-heavy static prototype built with React, Vite, and Tailwind CSS. The system lacks a functional backend, database, and operational infrastructure necessary for enterprise deployment.

### Current Maturity Level
- **Frontend:** MVP stage (high aesthetic quality, but static data and mock states).
- **Backend:** Non-existent (currently inferred).
- **Database:** Non-existent.
- **Production Readiness Score:** 20/100 (Only UI layer is ready).

### Core Risks
- **No Backend:** Contact forms trigger `mailto:` links; no actual email processing.
- **Static Content:** Blog posts, programs, and testimonials are hardcoded in TypeScript files.
- **Missing Auth:** No user authentication, cohort application portal, or admin dashboard.
- **Data Loss:** No database means zero state persistence.

---

## 2. COMPLETE PRODUCT REQUIREMENTS DOCUMENT (PRD)

### Product Vision
To serve as a globally competitive digital infrastructure platform bridging the gap between local ambition in Osun State and the global tech economy through scalable training, SME incubation, and community events.

### User Personas
1. **Learner/Applicant:** Applies to cohorts, views programs, reads blog.
2. **SME Owner:** Applies for pre-incubation, seeks mentorship.
3. **Admin/Staff:** Manages applications, publishes blog posts, tracks analytics.

### Functional Requirements
- **Public Website:** Landing pages, program details, blog reader, static pages.
- **Cohort Application System:** Multi-step dynamic form with document uploads.
- **Blog CMS:** CRUD operations for blog posts with rich text and image support.
- **Admin Dashboard:** Role-based access to manage users, applications, and content.
- **Notification System:** Automated email workflows for applicants and admins.

---

## 3. SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

### System Behaviors & Architecture
The target architecture must transition from a static SPA to a decoupled Client-Server model.
- **Frontend:** React + Vite (Existing)
- **Backend:** Node.js + Express.js (To be built)
- **Database:** Supabase (PostgreSQL + Auth + Storage)

### Security Requirements
- All API endpoints must be protected via JWT.
- Rate limiting must be applied to all public forms (e.g., Contact, Application).
- File uploads must be restricted by MIME type and size (max 5MB).

---

## 4. FULL DATABASE ARCHITECTURE REVIEW (SUPABASE)

### ERD & Schema Recommendations
1. **Users Table:** `id` (UUID), `email`, `role` (enum: ADMIN, USER), `created_at`.
2. **Profiles Table:** `id` (FK to Users), `full_name`, `phone`, `avatar_url`.
3. **Programs Table:** `id`, `slug`, `title`, `category`, `description`, `status`.
4. **Applications Table:** `id`, `user_id` (FK), `program_id` (FK), `status` (PENDING, REVIEWING, ACCEPTED, REJECTED), `resume_url`, `submitted_at`.
5. **BlogPosts Table:** `id`, `author_id` (FK), `title`, `slug`, `content`, `published_at`, `status` (DRAFT, PUBLISHED).
6. **Contacts Table:** `id`, `name`, `email`, `subject`, `message`, `status` (UNREAD, READ, RESPONDED).

### RLS (Row Level Security) Policies
- **BlogPosts:** Public read access if `status = 'PUBLISHED'`. Admin full access.
- **Applications:** Users can read/insert their own. Admins have full access.

---

## 5. BACKEND ARCHITECTURE ANALYSIS (NODE.JS + EXPRESS)

### Recommended Architecture
Follow a layered service-repository pattern:
- **Routes:** Define API endpoints.
- **Controllers:** Handle HTTP requests, parsing, and sending responses.
- **Services:** Core business logic (e.g., processing an application).
- **Repositories:** Database interactions (Supabase client calls).

### Middleware Structure
- `auth.middleware.ts`: Validates Supabase JWTs.
- `rbac.middleware.ts`: Checks user roles for Admin routes.
- `validator.middleware.ts`: Zod schema validation for incoming payloads.
- `rateLimiter.ts`: Redis-based or memory-based request limiting.

---

## 6. COMPLETE API DOCUMENTATION (PROPOSED)

### Authentication
- `POST /api/auth/register` - Create new user.
- `POST /api/auth/login` - Authenticate user.

### Applications
- `POST /api/applications` - Submit a new cohort application.
- `GET /api/applications/me` - Get current user's applications.
- `GET /api/admin/applications` - (Admin) List all applications.
- `PATCH /api/admin/applications/:id/status` - (Admin) Update status.

### Blog
- `GET /api/blog` - List published posts.
- `POST /api/admin/blog` - (Admin) Create post.
- `PUT /api/admin/blog/:id` - (Admin) Update post.

### Contact
- `POST /api/contact` - Submit contact form.

---

## 7. QA AUDIT & TESTING STRATEGY

### Identified Frontend Issues
- `Contact.tsx` uses `mailto:`, which is a poor UX and untrackable.
- Blog articles are hardcoded; no pagination or dynamic routing beyond static arrays.
- Performance: Large images loaded directly (e.g., `ai-for-educators-1.webp`). Missing responsive image sets (`srcset`).

### Testing Plan
- **Unit Testing:** Jest/Vitest for utilities and complex React components.
- **Integration Testing:** Supertest for Express API endpoints.
- **E2E Testing:** Cypress or Playwright for critical flows (Cohort Application, Contact Form).
- **Load Testing:** Artillery for testing API resilience during cohort launches.

---

## 8. ADMIN DASHBOARD SYSTEM ANALYSIS

### Missing Systems
Currently, there is no admin interface. 

### Proposed Workflows
- **Application Review:** Kanban-style board (Pending, In Review, Accepted, Rejected).
- **User Management:** View all registered users, suspend accounts, change roles.
- **Content Management:** WYSIWYG editor for blog posts, toggle visibility for Programs.
- **Analytics:** Overview of application volume, site traffic, and contact requests.

---

## 9. BLOG CMS ARCHITECTURE

### Architecture Design
- **Drafting:** Posts must support auto-save to `DRAFT` status.
- **Media:** Images uploaded to Supabase Storage, returning a CDN link embedded in the rich text (Markdown or HTML).
- **SEO:** Each post must have configurable `meta_title`, `meta_description`, and `slug`.

---

## 10. COHORT APPLICATION SYSTEM ANALYSIS

### Workflow State Machine
1. **Draft:** User starts application, saves progress.
2. **Submitted:** Form complete, confirmation email triggered.
3. **Under Review:** Admin opens application.
4. **Decision:** Accepted/Rejected (triggers respective email workflow).

---

## 11. EMAIL SYSTEM ARCHITECTURE

### Current State
`mailto:` links. Unacceptable for enterprise.

### Proposed Architecture
- **Provider:** Resend or SendGrid.
- **Queueing:** BullMQ with Redis for asynchronous email processing to avoid blocking API requests.
- **Templates:** React Email for responsive, branded HTML templates.
- **Triggers:** Contact Form submissions, Welcome emails, Application status changes.

---

## 12. SECURITY AUDIT

### Vulnerabilities in Current Code
- **No Rate Limiting on Contact:** The current `mailto:` prevents spam to a database, but once converted to an API, an attacker could spam the `/api/contact` endpoint.
- **Hardcoded State:** Business logic (like checking valid programs) is entirely on the client, easily manipulated.

### Remediation
- Implement strict CORS policies.
- Implement CSRF protection for session-based flows, or stick to strict JWT handling.
- Zod validation on backend (currently only on frontend in `Contact.tsx`).

---

## 13. DEVOPS & INFRASTRUCTURE REVIEW

### Current State
Deployed to Vercel (inferred from `vercel.json` with rewrites).

### Production Recommendations
- **Frontend:** Vercel or AWS Amplify.
- **Backend:** Render, Railway, or AWS ECS for the Node.js API.
- **Database:** Supabase managed service.
- **CI/CD:** GitHub Actions to run tests, linting, and automated deployments upon merges to `main`.
- **Environment Variables:** Strictly manage `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `JWT_SECRET`, `EMAIL_API_KEY`.

---

## 14. FRONTEND ARCHITECTURE REVIEW

### Strengths
- Excellent use of Tailwind CSS and Framer Motion for animations.
- Clean component separation (UI folder, pages folder).

### Weaknesses
- Tight coupling of static data (`src/data/programs.ts`) with components.
- Missing React Query / SWR for server-state management once the API is introduced.
- Form handling is basic `useState`; recommend `react-hook-form` for complex applications.

---

## 15. PERFORMANCE AUDIT

### Findings
- High reliance on client-side JS for animations. 
- Some large videos (`Flow - May 04...`) are loaded on the Impact page. Ensure these are compressed and served via CDN.

### Recommendations
- Implement Lazy Loading (`React.lazy`) for heavy routes.
- Optimize video assets; provide WebM formats with MP4 fallbacks.
- Use `vite-plugin-image-optimizer` to compress static assets during build.

---

## 16. PRODUCTION READINESS REPORT

**Readiness Score:** 20/100  
**Status:** BLOCKED for full production launch.

### Critical Blockers
1. Lack of a Backend API and Database.
2. Lack of Authentication and Admin capabilities.
3. Contact form is non-functional for business needs.

### Action Plan (Next 30 Days)
1. **Week 1:** Setup Supabase schema, configure Node.js + Express repository.
2. **Week 2:** Build Auth, Contact, and Blog API endpoints. Integrate frontend.
3. **Week 3:** Build Cohort Application system and Admin Dashboard.
4. **Week 4:** Implement Email workflows, conduct QA/Security testing, execute CI/CD pipeline.
