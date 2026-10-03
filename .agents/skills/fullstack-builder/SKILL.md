---
name: fullstack-builder
description: Comprehensive full-stack architecture and rapid project building skill for Antigravity. Automatically activates when scaffolding new features, building full-stack workflows, creating API routes, database schemas, deployment configurations, or optimizing build performance.
---

# Fullstack Architect & Rapid Builder Skill

This skill enforces enterprise-grade full-stack architectural discipline, reliability, and deployment readiness.

## Core Architectural Guidelines

### 1. Separation of Concerns & Clean Structure
- Keep routes, controllers, database models, and static seed data decoupled.
- Frontend: Separate presentation components (`components/`), view containers (`pages/`), and routing configuration (`App.jsx`).
- Backend: Keep route definitions clean in `routes/`, configurations in `config/`, and data access in `models/` or query services.

### 2. High-Availability & Resilient Data Layer
- **Cold-Start Optimization**: In serverless/cloud environments (e.g., Vercel, AWS Lambda), implement quick timeouts (2–3s) on database handshakes to prevent stalling.
- **Embedded Resilient Fallback**: Always maintain a fallback mock/seed data layer so the application remains 100% interactive and functional even when external databases are temporarily unreachable.
- **Read-Only Filesystem Handling**: For serverless deployments, write file uploads to `os.tmpdir()` (`/tmp`) to avoid read-only filesystem (`EROFS`) crashes.

### 3. API Contract & Validation
- Validate all incoming payloads before processing (`req.body`, `req.query`, `req.params`).
- Use standardized JSON responses:
  ```json
  {
    "success": true,
    "message": "Action completed successfully",
    "data": { ... }
  }
  ```
- Return accurate HTTP status codes: `200` (OK), `201` (Created), `400` (Bad Request), `401` (Unauthorized), `404` (Not Found), `500` (Internal Error).

### 4. Build & Production Verification
- Before finishing any full-stack implementation, always execute:
  1. Frontend build verification: `npm run build`
  2. Linter / type-check verification: `npm run lint` or syntax checks
  3. Verify that environment variables and deployment configs (`vercel.json`, `.gitignore`, `package.json`) are updated.
