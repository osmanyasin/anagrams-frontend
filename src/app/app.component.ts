import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>BSG Anagrams Application</h1>
    <nav>
      <ul>
        <li><a routerLink="/word-list">word-list</a></li>
        <li><a routerLink="/anagrams">anagrams</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {}
