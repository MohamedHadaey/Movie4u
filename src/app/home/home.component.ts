import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _TrendingService: TrendingService,
    private _Router: Router,
    private spinner: NgxSpinnerService
  ) {}

  imgPrifix: string = 'https://image.tmdb.org/t/p/w500';
  trendingMovies: any[] = [];
  trendingTvShows: any[] = [];
  trendingPeople: any[] = [];
  error: string = '';

  toMovies() {
    this._Router.navigate(['/movies']);
  }

  toTvShows() {
    this._Router.navigate(['/tvshows']);
  }

  toPeople() {
    this._Router.navigate(['/people']);
  }

  getTrendingMovies(pageNum: any) {
    this.spinner.show();
    this._TrendingService.getTrending('movie', pageNum).subscribe(
      (response) => {
        this.trendingMovies = response.results.slice(0, 10);
        this.spinner.hide();
      },

      // in case of any problem in api link
      (err) => (this.error = err.message)
    );
  }

  getTrendingTvShows(pageNum: any) {
    this.spinner.show();
    this._TrendingService.getTrending('tv', pageNum).subscribe((response) => {
      this.trendingTvShows = response.results.slice(0, 10);
      this.spinner.hide();
    });
  }

  getTrendingPeople(pageNum: any) {
    this.spinner.show();
    this._TrendingService
      .getTrending('person', pageNum)
      .subscribe((response) => {
        this.trendingPeople = response.results.slice(0, 10);
      });
      this.spinner.hide();
  }

  ngOnInit(): void {
    this.getTrendingMovies(1);
    this.getTrendingTvShows(1);
    this.getTrendingPeople(1);
  }
}
