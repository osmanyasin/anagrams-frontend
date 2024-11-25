// words-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

interface Word {
  id: number;
  word: string;
}

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  displayedColumns: string[] = ['word', 'actions'];
  dataSource = new MatTableDataSource<Word>([
    {id: 1, word: 'hello'},
    {id: 2, word: 'world'},
    // ... more words
  ]);
  newWord: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  addWord() {
    if (this.newWord.trim() !== '') {
      const newId = this.dataSource.data.length + 1;
      this.dataSource.data = [...this.dataSource.data, { id: newId, word: this.newWord }];
      this.newWord = '';
    }
  }

  deleteWord(id: number) {
    this.dataSource.data = this.dataSource.data.filter(word => word.id !== id);
  }
}