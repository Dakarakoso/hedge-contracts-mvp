# hedge-contracts-mvp

# 📘 Hedge Contract Management MVP

## 🔹 Overview

Hedge Contract Management MVP is a web application that helps businesses manage hedge contracts, track settlements, and ensure compliance.

This MVP is being developed to:

- Register and authenticate users (trader, manager, auditor).
- Create, update, and monitor hedge contracts.
- Track settlement dates and amounts with automated reminders.
- Provide audit logs, secure access, and reliable infrastructure.

---

## 🔹 Tech Stack

- **Frontend & Backend:** [Next.js](https://nextjs.org/) (API routes + React UI)
- **Database:** PostgreSQL (managed with [node-pg-migrate](https://salsita.github.io/node-pg-migrate/))
- **Authentication:** JWT stored in HTTP-only cookies (`bcryptjs`, `cookie`)
- **Data Fetching:** [SWR](https://swr.vercel.app/) for React
- **Infra as Code:** [Terraform](https://www.terraform.io/) (ECS Fargate, ALB, RDS, S3, CloudWatch)
- **CI/CD:** GitHub Actions → AWS ECS/ECR deployments
- **Testing:** Jest

---

## 🔹 Features

✅ User registration and login (JWT + cookies)  
✅ Role-based permissions (trader, manager, auditor)  
✅ Contract CRUD (create, list, update, delete)  
✅ Settlement tracking with reminders  
✅ Audit logging of contract changes  
✅ Encrypted sensitive data (passwords, settlements)  
✅ Infrastructure on AWS (ECS, RDS, ALB, S3, CloudWatch)

---
