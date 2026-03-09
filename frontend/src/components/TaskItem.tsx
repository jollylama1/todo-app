import { Checkbox, Group, Text } from '@mantine/core';
import type { Task } from '../types';

type TaskItemProps = {
  task: Task;
  onComplete?: (id: number) => void;
};

export function TaskItem({ task, onComplete }: TaskItemProps) {
  const handleChange = () => {
    if (!task.isCompleted && onComplete) {
      onComplete(task.id);
    }
  };

  return (
    <Group justify="space-between">
      <Group>
        <Checkbox checked={task.isCompleted} onChange={handleChange} />
        <Text td={task.isCompleted ? 'line-through' : undefined}>{task.title}</Text>
      </Group>
    </Group>
  );
}

