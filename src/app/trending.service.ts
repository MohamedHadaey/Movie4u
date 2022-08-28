import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  constructor(private _HttpClient: HttpClient) {}

  getTrending(mediaType: any, pageNum: any): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/${mediaType}/popular?api_key=6561cb2930d16b56c3b86696d0405426&language=en-US&page=${pageNum}`
    );
  }

  getMovieDetails(currentId: number): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${currentId}?api_key=6561cb2930d16b56c3b86696d0405426&language=en-US`
    );
  }

  getTvDetails(currentId: number): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${currentId}?api_key=6561cb2930d16b56c3b86696d0405426&language=en-US`
    );
  }

  getPeopleDetails(currentId: number): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/person/${currentId}?api_key=6561cb2930d16b56c3b86696d0405426&language=en-US`
    );
  }

  getTrendingMovieBySearch(searchingWord:string){
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/search/movie?api_key=6561cb2930d16b56c3b86696d0405426&query=${searchingWord}`
    );
  }

  getTrendingTvshowsBySearch(searchingWord:string){
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/search/tv?api_key=6561cb2930d16b56c3b86696d0405426&query=${searchingWord}`
    );
  }

  getMovieTrailer(currentId: any):Observable<any>{
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=6561cb2930d16b56c3b86696d0405426&language=en-US`
    );
  }

  getTvTrailer(currentId: any):Observable<any>{
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${currentId}/videos?api_key=6561cb2930d16b56c3b86696d0405426&language=en-US`
    );
  }
}
