import { Stack, Text } from '@mantine/core';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onCompleteTask?: (id: number) => void;
};

export function TaskList({ tasks, onCompleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <Text c="dimmed">No tasks yet. Add your first task above.</Text>;
  }

  return (
    <Stack gap="xs">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={onCompleteTask} />
      ))}
    </Stack>
  );
}

