import { ChangeDetectorRef, Component } from '@angular/core';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { MovieService } from '../movie.service';
import { Movies } from '../movie.datasource';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class MoviesComponent {
  title = 'Movie List';
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // localStorage'dan veriyi kontrol et
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      // localStorage'da veri varsa, JSON.parse ile al
      this.movies = JSON.parse(storedMovies);
    } else {
      // localStorage'da veri yoksa, orijinal veri kaynağını kullan
      this.getMovies();
    }
  }

  resetMovies(): void {
    // Movies dizisini orijinal veri kaynağıyla sıfırlama
    this.movies = [...Movies]; // MoviesData, orijinal veri kaynağınız
    // localStorage'ı güncelle
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      // Verileri localStorage'a kaydet
      localStorage.setItem('movies', JSON.stringify(this.movies));
    });
    /*this.movies = this.movieService.getMovies();*/
  }

  add(name: string, imageUrl: string, description: string): void {
    this.movieService
      .add({ name, imageUrl, description } as Movie)
      .subscribe((movie) => this.movies?.push(movie));
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }

  delete(movie: Movie): void {
    this.movieService.delete(movie).subscribe((movies) => {
      this.movies = movies;
      // Güncellenmiş Movies dizisini al
      localStorage.setItem('movies', JSON.stringify(this.movies));
    });
  }
}
