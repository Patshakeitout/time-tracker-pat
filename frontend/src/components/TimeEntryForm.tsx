import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createEntry, type TimeEntry } from '../api';

interface Props { onAdded: (entry: TimeEntry) => void; }

export default function TimeEntryForm({ onAdded }: Props) {
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createEntry({ project, description, startTime, endTime });
    onAdded(res.data);
    setProject(''); setDescription(''); setStartTime(''); setEndTime('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
      <TextField
        label="Project" required value={project}
        onChange={e => setProject(e.target.value)} fullWidth
      />
      <TextField
        label="Description" required value={description}
        onChange={e => setDescription(e.target.value)} fullWidth
      />
      <TextField
        label="Start Time" type="datetime-local" required
        value={startTime} onChange={e => setStartTime(e.target.value)}
        InputLabelProps={{ shrink: true }} fullWidth
      />
      <TextField
        label="End Time" type="datetime-local" required
        value={endTime} onChange={e => setEndTime(e.target.value)}
        InputLabelProps={{ shrink: true }} fullWidth
      />
      <Button type="submit" variant="contained">Add Entry</Button>
    </Box>
  );
}
