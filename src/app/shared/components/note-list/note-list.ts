import { Component, input } from '@angular/core';

@Component({
  selector: 'app-note-list',
  imports: [],
  templateUrl: './note-list.html',
})
export class NoteList {
  isSelected = input(false);
}
