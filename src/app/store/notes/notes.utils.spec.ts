import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { buildNote } from './notes.utils';

describe('buildNote', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', { randomUUID: () => 'note-1' });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds a note with defaults', () => {
    const note = buildNote();

    expect(note.id).toBe('note-1');
    expect(note.title).toBe('Untitled note');
    expect(note.content).toBe('');
    expect(note.lastEditedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('respects provided values', () => {
    const note = buildNote({
      id: 'custom',
      title: 'Draft',
      content: 'Hello',
      lastEditedAt: '2024-01-01T00:00:00.000Z',
    });

    expect(note).toEqual({
      id: 'custom',
      title: 'Draft',
      content: 'Hello',
      lastEditedAt: '2024-01-01T00:00:00.000Z',
    });
  });
});
