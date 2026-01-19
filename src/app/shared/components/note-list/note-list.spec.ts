import '@utils/dayjs.config';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { NoteList } from './note-list';
import { notesActions } from '@store/notes/notes.actions';
import { notesFeature } from '@store/notes/notes.reducer';
import { NotesState } from '@store/notes/notes.models';

const createState = (): { notelist: NotesState } => ({
  notelist: {
    notes: [
      {
        id: 'note-1',
        title: 'Alpha',
        content: 'First',
        lastEditedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 'note-2',
        title: 'Beta',
        content: 'Second',
        lastEditedAt: '2024-01-02T00:00:00.000Z',
      },
    ],
    selectedNoteId: 'note-1',
  },
});

describe('NoteList', () => {
  let fixture: ComponentFixture<NoteList>;
  let component: NoteList;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteList],
      providers: [
        provideStore({ notelist: notesFeature.reducer }, { initialState: createState() }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteList);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('filters notes by search term', () => {
    fixture.componentRef.setInput('searchTerm', 'beta');
    fixture.detectChanges();

    expect(component.filteredNotes().map((note) => note.id)).toEqual(['note-2']);
    expect(component.hasNotes()).toBe(true);

    fixture.componentRef.setInput('searchTerm', 'missing');
    fixture.detectChanges();

    expect(component.filteredNotes()).toHaveLength(0);
    expect(component.hasNotes()).toBe(false);
  });

  it('dispatches selectNote on selection', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.onSelect('note-2');

    expect(dispatchSpy).toHaveBeenCalledWith(notesActions.selectNote({ id: 'note-2' }));
  });

  it('dispatches deleteNote on delete', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.onDelete('note-1');

    expect(dispatchSpy).toHaveBeenCalledWith(notesActions.deleteNote({ id: 'note-1' }));
  });
});
