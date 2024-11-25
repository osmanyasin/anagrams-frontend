import { Routes } from '@angular/router';
import { WordListComponent } from './word-list/word-list.component';
import { AnagramsComponent } from './anagrams/anagrams.component';

export const routes: Routes = [
    {
        path: 'word-list',
        component: WordListComponent
    },
    {
        path: 'anagrams',
        component: AnagramsComponent
    },
    { path: '', redirectTo: '/word-list', pathMatch: 'full' },
    { path: '**', redirectTo: '/word-list' },
];
