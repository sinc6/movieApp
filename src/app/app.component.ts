import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { LoggingComponent } from './logging/logging.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieService } from './movie.service';
import { LoggingService } from './logging.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, // Ana component'inizi yönlendirin
  { path: 'movies', component: MoviesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
];

@Component({
  selector: 'app-root',
  imports: [CommonModule, LoggingComponent, NavbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService, LoggingService],
  standalone: true,
})
export class AppComponent {
  title = 'movieApp';
}
