import '@utils/dayjs.config';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { Notes } from './notes';
import { notesActions } from '@store/notes/notes.actions';
import { notesFeature } from '@store/notes/notes.reducer';
import { NotesState } from '@store/notes/notes.models';

const createState = (): { notelist: NotesState } => ({
  notelist: {
    notes: [
      {
        id: 'note-1',
        title: 'First',
        content: 'Content',
        lastEditedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
    selectedNoteId: 'note-1',
  },
});

describe('Notes', () => {
  let fixture: ComponentFixture<Notes>;
  let component: Notes;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notes],
      providers: [
        provideStore({ notelist: notesFeature.reducer }, { initialState: createState() }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Notes);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('dispatches addNote with default values', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-01T00:00:00.000Z'));
    vi.stubGlobal('crypto', { randomUUID: () => 'note-2' });

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.addNote();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    expect(dispatchSpy).toHaveBeenCalledWith(
      notesActions.addNote({
        note: {
          id: 'note-2',
          title: 'Untitled note',
          content: '',
          lastEditedAt: '2024-02-01T00:00:00.000Z',
        },
      }),
    );
  });

  it('dispatches updateNote when title changes', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-02T00:00:00.000Z'));

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.onTitleChange('Updated title');

    expect(dispatchSpy).toHaveBeenCalledWith(
      notesActions.updateNote({
        id: 'note-1',
        changes: {
          title: 'Updated title',
          lastEditedAt: '2024-02-02T00:00:00.000Z',
        },
      }),
    );
  });

  it('dispatches updateNote when content changes', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-03T00:00:00.000Z'));

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.onContentChange('New content');

    expect(dispatchSpy).toHaveBeenCalledWith(
      notesActions.updateNote({
        id: 'note-1',
        changes: {
          content: 'New content',
          lastEditedAt: '2024-02-03T00:00:00.000Z',
        },
      }),
    );
  });

  it('updates the search term signal', () => {
    component.onSearchChange('query');
    expect(component.searchTerm()).toBe('query');
  });
});
