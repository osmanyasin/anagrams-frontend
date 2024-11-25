import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnagramCount {
  length: number;
  anagramCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnagramsService {
  private apiUrl = 'http://localhost:8080/anagrams';

  constructor(private http: HttpClient) {}

  getAnagrams(word: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${word}`);
  }

  addNewWord(word: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${word}`, {});
  }

  deleteWord(word: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${word}`);
  }

  getWords(limit: number, offset: number): Observable<string[]> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());
    return this.http.get<string[]>(`${this.apiUrl}/words`, { params });
  }

  getAnagramCountSummary(): Observable<AnagramCount[]> {
    return this.http.get<AnagramCount[]>(`${this.apiUrl}/summary`);
  }

  getAllWords(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/all`);
  }
}
