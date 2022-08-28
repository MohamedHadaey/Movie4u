import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../trending.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor( private _TrendingService: TrendingService,
    private spinner: NgxSpinnerService) { }

  imgPrifix: string = 'https://image.tmdb.org/t/p/w500';
  moviesSearchArray: any = {};
  tvshowsSearchArray: any = {};
  movieSearchingWord:string="";
  tvSearchingWord:string="";
  resultMoviesTrending:any =null;
  resultTvshowsTrending:any =null;

  getMovieSearching(){
    this._TrendingService.getTrendingMovieBySearch(this.movieSearchingWord).subscribe( (response) => {
        this.moviesSearchArray = response;
        this.resultMoviesTrending = this.moviesSearchArray.results;
        this.resultMoviesTrending = this.resultMoviesTrending.filter( (elem:any) => elem.poster_path != null )

    } )
  }

  getTvshowsSearching(){
    this._TrendingService.getTrendingTvshowsBySearch(this.tvSearchingWord).subscribe( (response) => {
        this.tvshowsSearchArray = response;
        this.resultTvshowsTrending = this.tvshowsSearchArray.results;
        this.resultTvshowsTrending = this.resultTvshowsTrending.filter( (elem:any) => elem.poster_path != null )

    } )
  }

  ngOnInit(): void {
  }

}
