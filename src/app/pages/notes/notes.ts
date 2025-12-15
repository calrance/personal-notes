import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NoteList } from '@components/note-list/note-list';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-notes',
  imports: [FormsModule, DatePipe, NoteList, ButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './notes.html',
})
export class Notes {
  noteTitle = 'Getting Started';
  noteBody = 'Start writing...'
  lastEditeDate = new Date();

}
