import { useState } from 'react';
import { Button, Group, TextInput } from '@mantine/core';

type AddTaskFormProps = {
  onSubmit: (title: string) => void;
  loading?: boolean;
};

export function AddTaskForm({ onSubmit, loading }: AddTaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group align="flex-end" gap="sm" wrap="nowrap">
        <TextInput
          label="New task"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Button type="submit" loading={loading}>
          Add
        </Button>
      </Group>
    </form>
  );
}

