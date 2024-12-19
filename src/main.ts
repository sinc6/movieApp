import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MoviesComponent } from './app/movies/movies.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { MovieDetailComponent } from './app/movie-detail/movie-detail.component';

const routes = [
  { path: '', component: DashboardComponent }, // Ana component'inizi yönlendirin
  { path: 'movies', component: MoviesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
