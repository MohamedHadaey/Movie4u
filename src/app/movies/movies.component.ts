import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  constructor(
    private _TrendingService: TrendingService,
    private spinner: NgxSpinnerService
  ) {}

  imgPrifix: string = 'https://image.tmdb.org/t/p/w500';
  trendingMovies: any[] = [];

  changePage(eventInfo: any) {
    this.currentPage = eventInfo.target.innerHTML;
    this.spinner.show();
    this._TrendingService
      .getTrending('movie', this.currentPage)
      .subscribe((response) => {
        this.trendingMovies = response.results;
      });
      this.spinner.hide();
  }

  currentPage: number = 1;

  getNextPage() {
    this.currentPage++;
    this.spinner.show();
    this._TrendingService
      .getTrending('movie', this.currentPage)
      .subscribe((response) => {
        this.trendingMovies = response.results;
      });
      this.spinner.hide();
  }

  getPrviousPage() {
    if (this.currentPage == 1) {
      return;
    } else {
      this.currentPage--;
      this.spinner.show();
      this._TrendingService
        .getTrending('movie', this.currentPage)
        .subscribe((response) => {
          this.trendingMovies = response.results;
        });
        this.spinner.hide();
    }
  }

  getTrendingMovies(pageNum: any) {
    this.spinner.show();
    this._TrendingService
      .getTrending('movie', this.currentPage)
      .subscribe((response) => {
        this.trendingMovies = response.results;
        this.spinner.hide();
      });
  }

  ngOnInit(): void {
    this.getTrendingMovies(1);
  }
}
