import { describe, it, expect } from 'vitest';
import { Action } from '@ngrx/store';

import { notesActions } from './notes.actions';
import { notesFeature } from './notes.reducer';
import { NotesState } from './notes.models';

const createInitialState = (): NotesState => notesFeature.reducer(undefined, { type: 'init' });
const reduce = (state: NotesState, action: Action): NotesState => notesFeature.reducer(state, action);

describe('notes reducer', () => {
  it('initializes with a default note selected', () => {
    const state = createInitialState();

    expect(state.notes).toHaveLength(1);
    expect(state.notes[0]?.title).toBe('Getting Started');
    expect(state.notes[0]?.content).toBe('Start writing...');
    expect(state.selectedNoteId).toBe(state.notes[0]?.id);
  });

  it('adds a note and selects it', () => {
    const state = createInitialState();
    const newNote = {
      id: 'note-2',
      title: 'Next',
      content: 'Content',
      lastEditedAt: '2024-01-02T00:00:00.000Z',
    };

    const updated = reduce(state, notesActions.addNote({ note: newNote }));

    expect(updated.notes[0]?.id).toBe('note-2');
    expect(updated.selectedNoteId).toBe('note-2');
  });

  it('updates a note by id', () => {
    const state = createInitialState();
    const targetId = state.notes[0]?.id ?? '';

    const updated = reduce(
      state,
      notesActions.updateNote({
        id: targetId,
        changes: { title: 'Updated', lastEditedAt: '2024-01-03T00:00:00.000Z' },
      })
    );

    expect(updated.notes[0]?.title).toBe('Updated');
    expect(updated.notes[0]?.lastEditedAt).toBe('2024-01-03T00:00:00.000Z');
  });

  it('selects a note by id', () => {
    const state = createInitialState();

    const updated = reduce(state, notesActions.selectNote({ id: 'other' }));

    expect(updated.selectedNoteId).toBe('other');
  });

  it('deletes a note by id', () => {
    const state = createInitialState();
    const targetId = state.notes[0]?.id ?? '';

    const updated = reduce(state, notesActions.deleteNote({ id: targetId }));

    expect(updated.notes).toHaveLength(0);
  });
});
