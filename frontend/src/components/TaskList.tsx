import { useState } from 'react';
import { Stack, Text } from '@mantine/core';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onCompleteTask?: (id: number) => void;
  onTaskUpdated: (updated: Task) => void;
};

export function TaskList({ tasks, onCompleteTask, onTaskUpdated }: TaskListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggleExpand = (taskId: number) => {
    setExpandedId((prev) => (prev === taskId ? null : taskId));
  };

  if (tasks.length === 0) {
    return <Text c="dimmed">No tasks yet. Add your first task above.</Text>;
  }

  return (
    <Stack gap="xs">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isExpanded={expandedId === task.id}
          onToggleExpand={() => handleToggleExpand(task.id)}
          onComplete={onCompleteTask}
          onTaskUpdated={onTaskUpdated}
        />
      ))}
    </Stack>
  );
}
