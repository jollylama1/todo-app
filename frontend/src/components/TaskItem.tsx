import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Group,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import type { Task } from '../types';
import { updateTask } from '../api/tasks';

function formatMdYyyy(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

type TaskItemProps = {
  task: Task;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onComplete?: (id: number) => void;
  onTaskUpdated: (updated: Task) => void;
};

export function TaskItem({
  task,
  isExpanded,
  onToggleExpand,
  onComplete,
  onTaskUpdated,
}: TaskItemProps) {
  const [localDescription, setLocalDescription] = useState(task.description ?? '');
  const [localDueDate, setLocalDueDate] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setLocalDescription(task.description ?? '');
      setLocalDueDate(task.dueDate ? new Date(task.dueDate) : null);
    }
  }, [isExpanded, task.id, task.description, task.dueDate]);

  const taskDueTime = task.dueDate ? new Date(task.dueDate).getTime() : null;
  const localDueTime = localDueDate?.getTime() ?? null;
  const hasChanges =
    localDescription !== (task.description ?? '') || localDueTime !== taskDueTime;

  const handleSave = async () => {
    if (!hasChanges) return;
    setSaving(true);
    try {
      const updated = await updateTask(task.id, {
        description: localDescription.trim() || null,
        dueDate: localDueDate ? localDueDate.toISOString() : null,
      });
      onTaskUpdated(updated);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setLocalDescription(task.description ?? '');
    setLocalDueDate(task.dueDate ? new Date(task.dueDate) : null);
  };

  const handleRowClick = () => {
    onToggleExpand();
  };

  const handleCheckboxChange = () => {
    if (!task.isCompleted && onComplete) {
      onComplete(task.id);
    }
  };

  return (
    <Box>
      <Group
        justify="space-between"
        style={{ cursor: 'pointer' }}
        onClick={handleRowClick}
        wrap="nowrap"
      >
        <Group wrap="nowrap" style={{ minWidth: 0, flex: 1 }}>
          <Box
            component="span"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'inline-flex' }}
          >
            <Checkbox
              checked={task.isCompleted}
              onChange={handleCheckboxChange}
            />
          </Box>
          <Text td={task.isCompleted ? 'line-through' : undefined} truncate>
            {task.title}
          </Text>
        </Group>
      </Group>

      <Collapse in={isExpanded}>
        <Stack gap="sm" mt="sm" pl="xl">
          <Textarea
            label="Description"
            placeholder="Add a description"
            value={localDescription}
            onChange={(e) => setLocalDescription(e.currentTarget.value)}
            minRows={2}
            autosize
            styles={{ root: { width: '100%' } }}
          />
          <DatePickerInput
            label="Due date"
            placeholder="Pick date"
            value={localDueDate}
            onChange={setLocalDueDate}
            clearable
          />
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              Created: {formatMdYyyy(task.createdAt)}
            </Text>
            <Text size="sm" c="dimmed">
              Completed: {formatMdYyyy(task.completedAt)}
            </Text>
          </Group>
          <Group>
            <Button
              variant="filled"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={!hasChanges}
              loading={saving}
            >
              Save
            </Button>
            <Button
              variant="default"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              disabled={!hasChanges}
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </Collapse>
    </Box>
  );
}
