import { Component, OnInit } from '@angular/core';
import { AnagramsService } from '../services/anagrams.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-anagrams',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinner
  ],
  templateUrl: './anagrams.component.html',
  styleUrls: ['./anagrams.component.css'],
})
export class AnagramsComponent implements OnInit {
  word: string = '';
  anagrams: string[] = [];
  anagramCounts: { length: number; anagramCount: number }[] = [];
  loading: boolean = false;
  loadingSummary: boolean = false;

  constructor(private anagramsService: AnagramsService) {}

  ngOnInit(): void {}

  // Get anagrams for a word
  getAnagrams(): void {
    if (this.word.trim()) {
      this.loading = true;
      this.anagramsService.getAnagrams(this.word).subscribe(
        (data) => {
          this.anagrams = data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error('Error fetching anagrams:', error);
        }
      );
    }
  }

  // Get anagram count summary
  getAnagramCountSummary(): void {
    this.loadingSummary = true;
    this.anagramsService.getAnagramCountSummary().subscribe(
      (data) => {
        this.anagramCounts = data;
        this.loadingSummary = false;
      },
      (error) => {
        this.loadingSummary = false;
        console.error('Error fetching anagram count summary:', error);
      }
    );
  }
}
