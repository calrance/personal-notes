import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { TimeAgoPipe } from '@pipes/time-ago-pipe';
import { notesActions } from '@store/notes/notes.actions';
import { notesFeature } from '@store/notes/notes.reducer';

@Component({
  selector: 'app-note-list',
  imports: [TimeAgoPipe],
  templateUrl: './note-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteList {
  private readonly store = inject(Store);

  readonly notes = this.store.selectSignal(notesFeature.selectAllNotes);
  readonly selectedNoteId = this.store.selectSignal(notesFeature.selectSelectedNoteId);
  readonly hasNotes = computed(() => this.notes().length > 0);

  onSelect(noteId: string): void {
    this.store.dispatch(notesActions.selectNote({ id: noteId }));
  }
}
