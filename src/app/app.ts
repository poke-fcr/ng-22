import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, CommonModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  navigationToolBar = [
    {
      name: 'signal form v1',
      route: 'signal-form-v1',
    },
    {
      name: 'signal form v2',
      route: 'signal-form-v2',
    },
  ];
}
