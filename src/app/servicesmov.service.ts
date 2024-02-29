import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, map } from 'rxjs/operators';


export interface ApiResult{
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  title: string;
  poster_path: string;
  tagline: string;
  genres: { id: number, name: string }[];
  overview: string;
  release_date: string;
  budget: number; 
  homepage: string;
  actors: { id: number; name: string,profile_path:string }[];

}


@Injectable({
  providedIn: 'root'
})
export class ServicesmovService {

  constructor(private http: HttpClient) { }

  getTopRateMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
      );
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    const movieUrl = `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`;
    const creditsUrl = `${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`;

    // Combina las solicitudes HTTP para obtener detalles de la película y los actores
    return this.http.get<MovieDetails>(movieUrl).pipe(
      switchMap((movie: MovieDetails) => {
        return this.http.get<any>(creditsUrl).pipe(
          map((credits) => {
            // Agrega la lista de actores a los detalles de la película
            movie.actors = credits.cast;
            return movie;
          })
        );
      })
    );
  }
  
}