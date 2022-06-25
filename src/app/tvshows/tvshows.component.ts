import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss'],
})
export class TvshowsComponent implements OnInit {
  constructor(
    private _TrendingService: TrendingService,
    private spinner: NgxSpinnerService
  ) {}

  imgPrifix: string = 'https://image.tmdb.org/t/p/w500';
  trendingTvShows: any[] = [];

  changePage(eventInfo: any) {
    this.spinner.show();
    this.currentPage = eventInfo.target.innerHTML;
    this._TrendingService
      .getTrending('tv', this.currentPage)
      .subscribe((response) => {
        this.trendingTvShows = response.results;
        this.spinner.hide();
      });
  }

  currentPage: number = 1;

  getNextPage() {
    this.currentPage++;
    this.spinner.show();
    this._TrendingService
      .getTrending('tv', this.currentPage)
      .subscribe((response) => {
        this.trendingTvShows = response.results;
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
        .getTrending('tv', this.currentPage)
        .subscribe((response) => {
          this.trendingTvShows = response.results;
        });
      this.spinner.hide();
    }
  }

  getTrendingTvShows(pageNum: any) {
    this.spinner.show();
    this._TrendingService
      .getTrending('tv', this.currentPage)
      .subscribe((response) => {
        this.trendingTvShows = response.results;
      });
    this.spinner.hide();
  }

  ngOnInit(): void {
    this.getTrendingTvShows(1);
  }
}
