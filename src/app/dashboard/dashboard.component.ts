import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesComponent } from '../movies/movies.component';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  movieLength!: number;
  constructor(private movieSerice: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieSerice.getMovies().subscribe((movies) => {
      this.movies = movies.slice(0, 4);
      this.movieLength = movies.length;
    });
  }
}
