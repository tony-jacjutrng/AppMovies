import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import {ServicesmovService} from 'src/app/servicesmov.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies : any[] = [];
  currrentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: ServicesmovService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner:'bubbles',
    });
    await loading.present();

    this.movieService.getTopRateMovies(this.currrentPage).subscribe((res)=> {
      loading.dismiss();
      this.movies.push(...res.results)
      console.log(res);

      event?.target.complete();
      if (event){
        event.target.disabled = res.total_pages === this.currrentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currrentPage++;
    this.loadMovies(event);
  }
}
