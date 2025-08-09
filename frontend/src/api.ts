// src/api.ts
import axios from 'axios';

export interface TimeEntry {
  id: string;
  startTime: string;
  endTime: string;
  project: string;
  description: string;
}

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const fetchEntries = () => api.get<TimeEntry[]>('/time-entries');
export const createEntry  = (data: Omit<TimeEntry,'id'>) => api.post('/time-entries', data);
export const updateEntry  = (id: string, data: Partial<TimeEntry>) => api.put(`/time-entries/${id}`, data);
export const deleteEntry  = (id: string) => api.delete(`/time-entries/${id}`);
