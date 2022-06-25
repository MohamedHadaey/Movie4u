import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  constructor(
    private _TrendingService: TrendingService,
    private spinner: NgxSpinnerService
  ) {}

  imgPrifix: string = 'https://image.tmdb.org/t/p/w500';
  trendingPeople: any[] = [];

  changePage(eventInfo: any) {
    this.spinner.show();
    this.currentPage = eventInfo.target.innerHTML;
    this._TrendingService
      .getTrending('person', this.currentPage)
      .subscribe((response) => {
        this.trendingPeople = response.results;
        this.spinner.hide();
      });
  }
  currentPage: number = 1;

  getNextPage() {
    this.currentPage++;
    this.spinner.show();
    this._TrendingService
      .getTrending('person', this.currentPage)
      .subscribe((response) => {
        this.trendingPeople = response.results;
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
        .getTrending('person', this.currentPage)
        .subscribe((response) => {
          this.trendingPeople = response.results;
        });
      this.spinner.hide();
    }
  }

  getTrendingPeople(pageNum: any) {
    this.spinner.show();
    this._TrendingService
      .getTrending('person', pageNum)
      .subscribe((response) => {
        this.trendingPeople = response.results;
      });
    this.spinner.hide();
  }

  ngOnInit(): void {
    this.getTrendingPeople(1);
  }
}
