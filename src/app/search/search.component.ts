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
  searchArray: any = {};
  searchingWord:string="";
  resultTrending:any =null;

  getSearching(){
    this._TrendingService.getTrendingBySearch(this.searchingWord).subscribe( (response) => {
        this.searchArray = response;
        this.resultTrending = this.searchArray.results;
        this.resultTrending = this.resultTrending.filter( (elem:any) => elem.poster_path != null )
        
    } )
  }

  ngOnInit(): void {
  }

}
