import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { AnagramsService } from '../services/anagrams.service';

interface Word {
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
    MatIconModule,
  ],
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  displayedColumns: string[] = ['word', 'actions'];
  dataSource = new MatTableDataSource<Word>();
  newWord: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private anagramService: AnagramsService) { }

  ngOnInit() {
    this.loadWords();
  }

  loadWords() {
    this.anagramService.getWords(10, 0).subscribe({
      next: (words: string[]) => {
        const wordData: Word[] = words.map(word => ({ word }));
        this.dataSource.data = wordData;
        this.refreshTable();
      },
      error: (error) => {
        console.error('Error fetching words:', error);
      }
    });
  }

  addWord() {
    if (this.newWord.trim() !== '') {
      this.anagramService.addNewWord(this.newWord).subscribe({
        next: () => {
          this.loadWords();  // Reload the word list after adding a new word
          this.newWord = '';  // Clear the input field
        },
        error: (error) => {
          console.error('Error adding word:', error);
        }
      });
    }
  }

  deleteWord(word: string) {
    console.log('!!!!!!!!! -> ', word)
    this.anagramService.deleteWord(word).subscribe({
      next: () => {
        this.loadWords();
      },
      error: (error) => {
        console.error('Error deleting word:', error);
      }
    });
  }

  refreshTable() {
    this.dataSource.paginator = this.paginator;
  }
}