# Hedge Contract Management MVP

[![CI](https://github.com/Dakarakoso/hedge-contracts-mvp/actions/workflows/tests.yaml/badge.svg)](https://github.com/Dakarakoso/hedge-contracts-mvp/actions/workflows/tests.yaml)
[![CI](https://github.com/Dakarakoso/hedge-contracts-mvp/actions/workflows/linting.yaml/badge.svg)](https://github.com/Dakarakoso/hedge-contracts-mvp/actions/workflows/linting.yaml)
[![PostgreSQL](https://img.shields.io/badge/Postgres-14+-336791.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Terraform](https://img.shields.io/badge/Terraform-IaC-844FBA.svg?logo=terraform&logoColor=white)](https://www.terraform.io/)

## Overview

Hedge Contract Management MVP is a web application that helps businesses manage hedge contracts, track settlements, and ensure compliance.

This MVP is being developed to:

- Register and authenticate users (trader, manager, auditor).
- Create, update, and monitor hedge contracts.
- Track settlement dates and amounts with automated reminders.
- Provide audit logs, secure access, and reliable infrastructure.

---

## Tech Stack

- **Frontend & Backend:** [Next.js](https://nextjs.org/) (API routes + React UI)
- **Database:** PostgreSQL (managed with [node-pg-migrate](https://salsita.github.io/node-pg-migrate/))
- **Authentication:** JWT stored in HTTP-only cookies (`bcryptjs`, `cookie`)
- **Data Fetching:** [SWR](https://swr.vercel.app/) for React
- **Infra as Code:** [Terraform](https://www.terraform.io/)
- **CI/CD:** GitHub Actions
- **Testing:** Jest

---

## Features

- User registration and login (JWT + cookies)
- Role-based permissions (trader, manager, auditor)
- Contract CRUD (create, list, update, delete)
- Settlement tracking with reminders
- Audit logging of contract changes
- Encrypted sensitive data (passwords, settlements)
- Infrastructure on AWS (ECS, RDS, ALB, S3, CloudWatch)
