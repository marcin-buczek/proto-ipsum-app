import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Event, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PrelineService } from './services/preline.service';
import { IStaticMethods } from 'preline/preline';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title: string = "IPSUM App";

  constructor(
    private router: Router,
    private prelineService: PrelineService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.prelineService.init();
        }, 100);
      }
    });
  }
}
