import { useEffect, useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import type { TimeEntry } from './api.ts';
import TimeEntryForm from './components/TimeEntryForm.tsx';
import TimeEntryTable from './components/TimeEntryTable.tsx';
import { fetchEntries } from './api';

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetchEntries().then(res => setEntries(res.data));
  }, []);

  return (
    <Container maxWidth="md">
      <Box component="header" my={4}>
        <Typography variant="h4" component="h1">Time Tracker</Typography>
      </Box>

      <Box mb={4}>
        <TimeEntryForm onAdded={e => setEntries([...entries, e])} />
      </Box>

      <Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="By Day" />
          <Tab label="By Week" />
        </Tabs>
        <Box mt={2}>
          <TimeEntryTable entries={entries} view={tab === 0 ? 'day' : 'week'} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
