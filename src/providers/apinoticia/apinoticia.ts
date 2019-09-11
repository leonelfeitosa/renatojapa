import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApinoticiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApinoticiaProvider {
  baseApiPath = 'https://newsapi.org/v2/everything?' +
  'q="crossfit"&' +
 ' from=2019-05-08&'+
  'sortBy=popularity&' +
  'apiKey=b85a28475c814377bb8a8d4e1959eb5d';

  constructor(public http: HttpClient) {
    console.log('Hello ApinoticiaProvider Provider');
  }
  getLatestNoticia(){
    return this.http.get(this.baseApiPath+ "");
  }
}
