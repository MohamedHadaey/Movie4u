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
  productionCompanies:any[]=[];
  moviesTrailers:any[] = [];
  TvTrailers:any[] = [];
  trailerKey:any="";
  currentKey:any = "";
  finalkey:string ="";
  fixedLink:any="https://www.youtube.com/embed/"


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
          this.productionCompanies = this.movieDetails.production_companies;
          this.productionCompanies = this.productionCompanies.filter( (element:any) => element.logo_path != null);
         // to get movie trailers
          this._TrendingService.getMovieTrailer(this.currentId).subscribe( (response) => {
            this.moviesTrailers = response.results;
            this.moviesTrailers = this.moviesTrailers.filter( (trail:any) => trail.type == "Trailer" && trail.site == "YouTube");
            this.trailerKey = this.moviesTrailers.filter( (key:any) => {
              this.currentKey = key;
              this.finalkey = this.currentKey.key
            })
          } )
        });
        this.spinner.hide();
    } else if(this.currentValue == 'tv') {
      this._TrendingService
        .getTvDetails(this.currentId)
        .subscribe((response) => {
          this.tvDetails = response;
          this.productionCompanies = this.tvDetails.production_companies;
          this.productionCompanies = this.productionCompanies.filter( (element:any) => element.logo_path != null);
          // to gret tv trailers
          this._TrendingService.getTvTrailer(this.currentId).subscribe( (response) => {
            this.TvTrailers = response.results;
            this.trailerKey = this.TvTrailers.filter( (key:any) => {
              this.currentKey = key;
              this.finalkey = this.currentKey.key
            })
          } )
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
