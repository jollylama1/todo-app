## Frontend - React + Mantine

This is the React + TypeScript frontend for the Todo app, built with **Vite** and **Mantine UI**.

### Key Libraries

- `react`, `react-dom`
- `@mantine/core`, `@mantine/hooks`, `@mantine/notifications`
- `axios` for HTTP requests

### Structure

- `index.html` — Entry HTML file
- `src/main.tsx` — React entry point with `MantineProvider` and `Notifications`
- `src/App.tsx` — Main layout and basic wiring for:
  - Loading tasks from the backend
  - Adding a new task
  - Marking a task as complete
- `src/types.ts` — Shared TypeScript types (`Task`)
- `src/api/client.ts` — Axios instance configured to point at the backend API
- `src/api/tasks.ts` — Task-specific API helpers:
  - `fetchTasks`
  - `createTask`
  - `completeTask`
- `src/components/AddTaskForm.tsx` — Mantine form to add new tasks
- `src/components/TaskItem.tsx` — One task row with a checkbox for completion
- `src/components/TaskList.tsx` — Displays the list of tasks or an empty-state message

The UI is minimal but shows how the three core features will be represented on the client side.

