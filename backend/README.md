## Backend - TodoApp.Api

ASP.NET Core Web API targeting **.NET 10**, prepared to use **PostgreSQL** via Entity Framework Core and Npgsql.

### Projects

- `TodoApp.sln` — Solution file
- `TodoApp.Api/` — Web API project

### Key Files

- `Program.cs` — Configures services, PostgreSQL `TodoDbContext`, CORS, and Swagger
- `Data/TodoDbContext.cs` — EF Core `DbContext` with `Tasks` DbSet
- `Models/TaskItem.cs` — Simple task entity (Id, Title, IsCompleted, CreatedAt)
- `Controllers/TasksController.cs` — Endpoints stubs for:
  - `GET /api/tasks` — list tasks
  - `POST /api/tasks` — add a task
  - `PUT /api/tasks/{id}/complete` — mark a task as complete
- `appsettings.json` — PostgreSQL connection string and basic logging

Migrations and detailed business logic are not implemented yet; you can add them once the schema and behavior are finalized.

