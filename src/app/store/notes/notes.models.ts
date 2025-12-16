export interface Note {
  id: string;
  title: string;
  content: string;
  lastEditedAt: string;
}

export interface NotesState {
  notes: Note[];
  selectedNoteId: string | null;
}
