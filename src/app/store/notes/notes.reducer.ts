import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { notesActions } from './notes.actions';
import { NotesState } from './notes.models';
import { buildNote } from './notes.utils';

const defaultNote = buildNote({
  title: 'Getting Started',
  content: 'Start writing...',
});

const initialState: NotesState = {
  notes: [defaultNote],
  selectedNoteId: defaultNote.id,
};

export const notesFeature = createFeature({
  name: 'notes',
  reducer: createReducer(
    initialState,
    on(notesActions.addNote, (state, { note }) => ({
      ...state,
      notes: [note, ...state.notes],
      selectedNoteId: note.id,
    })),
    on(notesActions.updateNote, (state, { id, changes }) => ({
      ...state,
      notes: state.notes.map((note) => (note.id === id ? { ...note, ...changes } : note)),
    })),
    on(notesActions.selectNote, (state, { id }) => ({
      ...state,
      selectedNoteId: id,
    }))
  ),
  extraSelectors: ({ selectNotesState }) => {
    const selectAllNotes = createSelector(selectNotesState, (state) => state.notes);
    const selectSelectedNoteId = createSelector(selectNotesState, (state) => state.selectedNoteId);
    const selectSelectedNote = createSelector(selectNotesState, (state) =>
      state.notes.find((note) => note.id === state.selectedNoteId) ?? state.notes[0] ?? null
    );

    return {
      selectAllNotes,
      selectSelectedNoteId,
      selectSelectedNote,
    };
  },
});
