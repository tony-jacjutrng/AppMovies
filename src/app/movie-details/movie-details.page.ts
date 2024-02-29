import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesmovService, MovieDetails } from 'src/app/servicesmov.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: MovieDetails | null = null;
  imageBaseUrl = environment.images;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: ServicesmovService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.movieService.getMovieDetails(id).subscribe((res: MovieDetails) => {
        console.log(res);
        this.movie = res;
      });
    } else {
      console.error("ID is null");
    }
  }

  openHomepage() {
    if (this.movie && this.movie.homepage) {
      window.open(this.movie.homepage);
    } else {
      console.error("Lo sentimos, este servicio no está disponible para esta película.");
    }
  }
}
