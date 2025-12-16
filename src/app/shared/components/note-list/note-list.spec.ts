import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';

import { NoteList } from './note-list';
import { notesFeature } from '@store/notes/notes.reducer';

describe('NoteList', () => {
  let component: NoteList;
  let fixture: ComponentFixture<NoteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteList],
      providers: [provideStore({ notes: notesFeature.reducer })],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
