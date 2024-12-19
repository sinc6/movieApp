import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Movies } from './movie.datasource';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private loggingService: LoggingService) {}

  /*  getMovies(): Observable<Movie[]> {
    this.loggingService.add('MovieService: listing movies');
    return of(Movies);
  }
  
  getMovies(): Movie[] {
    return Movies;
  }

  getMovies(): Observable<any> {
    return this.http
      .get<any>('/api/movies') // Beklenen veri tipini belirtin
      .pipe(
        retry(1), // 1 kere daha denemek için
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Bir istemci tarafı veya ağ hatası meydana geldi. Duruma göre ele alın.
      console.error('Bir hata oluştu:', error.error);
    } else {
      // Sunucu geri dönüş kodu başarısız oldu.
      console.error(`Sunucu ${error.status} kodu döndü, yanıt: `, error.error);
      if (error.error && error.error.message) {
        // Örneğin - hata mesajı kontrolü
        alert('Sunucudan gelen hata: ' + error.error.message);
      }
    }
    return throwError(
      () => new Error('Bir şeyler yanlış gitti, lütfen tekrar deneyin.')
    );
  }*/

  private loadMoviesFromStorage(): Movie[] {
    const movies = localStorage.getItem('movies');
    return movies ? JSON.parse(movies) : Movies; // localStorage'dan veri al, yoksa default veriyi kullan
  }

  // localStorage'a Movies dizisini kaydet
  private saveMoviesToStorage(movies: Movie[]): void {
    localStorage.setItem('movies', JSON.stringify(movies)); // Movies dizisini kaydet
  }

  getMovie(id: number): Observable<Movie> {
    this.loggingService.add('MovieService: get detail by id=' + id);

    const movie = Movies.find((movie) => movie.id === id);

    if (!movie) {
      // Eğer movie bulunamazsa, hata mesajı döndürebiliriz
      return throwError('Movie not found');
    }

    // Eğer movie bulunduysa, Observable olarak döndürüyoruz
    return of(movie);
  }

  update(movie: Movie): Observable<any> {
    const index = Movies.findIndex((m) => m.id === movie.id);
    if (index === -1) {
      // Eğer film bulunamazsa hata fırlat
      return throwError(() => new Error('Movie not found'));
    }

    // Eğer film bulunduysa, Movies dizisindeki öğeyi güncelle
    Movies[index] = movie;
    this.loggingService.add(`MovieService: updated movie id=${movie.id}`);
    return of(movie); // Güncellenen filmi Observable olarak döndür
  }

  add(movie: Movie): Observable<Movie> {
    // Yeni bir ID oluştur
    const newId = Math.max(...Movies.map((m) => m.id)) + 1;
    movie.id = newId;

    // Movies dizisine ekle
    Movies.push(movie);
    this.loggingService.add(`MovieService: added movie id=${movie.id}`);

    // Eklenen filmi Observable olarak döndür
    return of(movie);
  }

  delete(movie: Movie): Observable<Movie[]> {
    const index = Movies.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      // Filmi diziden sil
      Movies.splice(index, 1);
      this.loggingService.add(`MovieService: deleted movie id=${movie.id}`);
    }
    this.saveMoviesToStorage(Movies);
    // Silinen film bilgisi döndürülür
    return of(Movies);
  }

  // Movies'i localStorage'dan al
  getMovies(): Observable<Movie[]> {
    this.loggingService.add('MovieService: listing movies');
    const savedMovies = localStorage.getItem('movies');
    if (savedMovies) {
      return of(JSON.parse(savedMovies)); // localStorage'dan alınan veriyi Observable olarak döndür
    }
    return of(Movies); // Eğer localStorage'da veri yoksa, sabit veri döndür
  }
}
