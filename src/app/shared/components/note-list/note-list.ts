import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';

import { TimeAgoPipe } from '@pipes/time-ago-pipe';
import { notesActions } from '@store/notes/notes.actions';
import { notesFeature } from '@store/notes/notes.reducer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-note-list',
  imports: [TimeAgoPipe, ButtonModule],
  templateUrl: './note-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteList {
  private readonly store = inject(Store);

  readonly searchTerm = input<string>('');
  readonly notes = this.store.selectSignal(notesFeature.selectAllNotes);
  readonly selectedNoteId = this.store.selectSignal(notesFeature.selectSelectedNoteId);
  readonly filteredNotes = computed(() => {
    const normalizedQuery = this.searchTerm().trim().toLowerCase();
    const notes = this.notes();
    if (!normalizedQuery) {
      return notes;
    }

    return notes.filter((note) => {
      const title = (note.title || '').toLowerCase();
      const content = (note.content || '').toLowerCase();
      return title.includes(normalizedQuery) || content.includes(normalizedQuery);
    });
  });
  readonly hasNotes = computed(() => this.filteredNotes().length > 0);

  onSelect(noteId: string): void {
    this.store.dispatch(notesActions.selectNote({ id: noteId }));
  }

  onDelete(noteId: string): void {
    this.store.dispatch(notesActions.deleteNote({ id: noteId }));
  }
}
