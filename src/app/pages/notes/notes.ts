import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { NoteList } from '@components/note-list/note-list';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { notesActions } from '@store/notes/notes.actions';
import { notesFeature } from '@store/notes/notes.reducer';
import { buildNote } from '@store/notes/notes.utils';

@Component({
  selector: 'app-notes',
  imports: [DatePipe, NoteList, ButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './notes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notes {
  private readonly store = inject(Store);

  readonly selectedNote = this.store.selectSignal(notesFeature.selectSelectedNote);
  readonly lastEditedAt = computed(() => this.selectedNote().lastEditedAt);

  addNote(): void {
    const note = buildNote();
    this.store.dispatch(notesActions.addNote({ note }));
  }

  onTitleChange(value: string): void {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.store.dispatch(
      notesActions.updateNote({
        id: note.id,
        changes: { title: value, lastEditedAt: new Date().toISOString() },
      })
    );
  }

  onContentChange(value: string): void {
    const note = this.selectedNote();
    if (!note) {
      return;
    }
    this.store.dispatch(
      notesActions.updateNote({
        id: note.id,
        changes: { content: value, lastEditedAt: new Date().toISOString() },
      })
    );
  }
}
