import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendingService } from '../trending.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  currentId: number = 0;
  currentValue: any = '';
  movieDetails: any = [];
  tvDetails: any = [];
  peopleDetails: any = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TrendingService: TrendingService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.currentId = this._ActivatedRoute.snapshot.params?.['id'];
    this.currentValue = this._ActivatedRoute.snapshot.params?.['mm'];

    if (this.currentValue == 'movie') {
      this._TrendingService
        .getMovieDetails(this.currentId)
        .subscribe((response) => {
          this.movieDetails = response;
        });
        this.spinner.hide();
    } else if(this.currentValue == 'tv') {
      this._TrendingService
        .getTvDetails(this.currentId)
        .subscribe((response) => {
          this.tvDetails = response;
        });
        this.spinner.hide();
    }else{
      this._TrendingService
        .getPeopleDetails(this.currentId)
        .subscribe((response) => {
          this.peopleDetails = response;
        });
        this.spinner.hide();
    }
  }
}
