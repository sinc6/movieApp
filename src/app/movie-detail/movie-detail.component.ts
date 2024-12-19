import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'movie-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie | null = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe((movie) => (this.movie = movie));
  }

  save(): void {
    if (this.movie) {
      // Eğer movie null değilse güncelleme yap
      this.movieService
        .update(this.movie)
        .subscribe(() => this.location.back());
    } else {
      console.error('Movie not found. Update aborted.');
    }
  }
}
