import { Note } from './notes.models';

const createNoteId = (): string => globalThis.crypto?.randomUUID?.();

export const buildNote = (partial?: Partial<Note>): Note => ({
  id: partial?.id ?? createNoteId(),
  title: partial?.title ?? 'Untitled note',
  content: partial?.content ?? '',
  lastEditedAt: partial?.lastEditedAt ?? new Date().toISOString(),
});
