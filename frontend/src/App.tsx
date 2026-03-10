import { useEffect, useState } from 'react';
import { AppShell, Container, Loader, Space, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import type { Task } from './types';
import { fetchTasks, createTask, completeTask } from './api/tasks';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [completingId, setCompletingId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        showNotification({
          color: 'red',
          title: 'Error',
          message: 'Failed to load tasks from the server.'
        });
      } finally {
        setInitialLoading(false);
      }
    };

    load();
  }, []);

  const handleAddTask = async (title: string) => {
    setCreating(true);
    try {
      const task = await createTask({ title });
      setTasks((prev) => [task, ...prev]);
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to create task.'
      });
    } finally {
      setCreating(false);
    }
  };

  const handleCompleteTask = async (id: number) => {
    setCompletingId(id);
    try {
      const updated = await completeTask(id);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to mark task as complete.'
      });
    } finally {
      setCompletingId(null);
    }
  };

  const handleTaskUpdated = (updated: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="sm" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Title order={3}>Todo App</Title>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="sm">
          <Space h="lg" />
          <AddTaskForm onSubmit={handleAddTask} loading={creating} />
          <Space h="lg" />
          {initialLoading ? (
            <Loader />
          ) : (
            <TaskList
              tasks={tasks}
              onCompleteTask={handleCompleteTask}
              onTaskUpdated={handleTaskUpdated}
            />
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;

