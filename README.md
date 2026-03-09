## Todo App Monorepo

This repository contains a simple todo application with:

- **Frontend**: React + TypeScript using the Mantine UI component library
- **Backend**: ASP.NET Core Web API targeting .NET 10
- **Database**: PostgreSQL (via Entity Framework Core + Npgsql)

This scaffold focuses on project structure and starter files only. The core business logic and data access are intentionally minimal so you can implement them step by step.

### Structure

- `frontend/` — React + Vite + Mantine UI client app
- `backend/` — ASP.NET Core Web API (`TodoApp.Api`) prepared for PostgreSQL

### High-Level Features

The app is designed for three core features:

1. **Display a list of tasks**
2. **Add a new task**
3. **Mark a task as complete**

Both the frontend and backend folders contain starter code that reflects these features (routes, components, and models), but **do not yet implement full logic or persistence**.

