import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  public rootUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) { }

  public getRepos(keyword: string): Observable<any> {
    var url: string = this.rootUrl + 'search/repositories?q=' + keyword;
    return this.http.get(url);
  }

  public getLatestTag(tags_url: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.get(tags_url).toPromise().then((res) => {
        resolve(res);
      }, (msg) => {
        reject(msg);
      });
    });

    return promise;
  }
}
