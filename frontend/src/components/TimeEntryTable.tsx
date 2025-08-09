import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';
import { type TimeEntry } from '../api';
import { parseISO, format } from 'date-fns';

interface Props { entries: TimeEntry[]; view: 'day'|'week'; }

type Grouped = Record<string, { project: string; totalHours: number }[]>;

export default function TimeEntryTable({ entries, view }: Props) {
  // Group by day or ISO week
  const grouped: Grouped = {};
  entries.forEach(e => {
    const dateKey = view === 'day'
      ? format(parseISO(e.startTime), 'yyyy-MM-dd')
      : `${format(parseISO(e.startTime), 'RRRR')}-W${format(parseISO(e.startTime), 'II')}`;

    const hours = (parseISO(e.endTime).getTime() - parseISO(e.startTime).getTime()) / 3600000;
    if (!grouped[dateKey]) grouped[dateKey] = [];
    const proj = grouped[dateKey].find(p => p.project === e.project);
    if (proj) proj.totalHours += hours;
    else grouped[dateKey].push({ project: e.project, totalHours: hours });
  });

  return (
    <Paper>
      {Object.entries(grouped).map(([key, list]) => (
        <React.Fragment key={key}>
          <Typography variant="h6" component="h2" p={2}>{view === 'day' ? key : `Week ${key}`}</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell align="right">Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(r => (
                <TableRow key={r.project}>
                  <TableCell>{r.project}</TableCell>
                  <TableCell align="right">{r.totalHours.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      ))}
    </Paper>
  );
}
