import { createActionGroup, props } from '@ngrx/store';

import { Note } from './notes.models';

export const notesActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Note': props<{ note: Note }>(),
    'Update Note': props<{
      id: string;
      changes: Partial<Pick<Note, 'title' | 'content' | 'lastEditedAt'>>;
    }>(),
    'Select Note': props<{ id: string }>(),
    'Delete Note': props<{ id: string }>(),
  },
});
