import { Injectable, EventEmitter } from '@angular/core';
import { Repo } from './services/Repo';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  public updatedFavourites: EventEmitter<any> = new EventEmitter();
  public favourites: Repo[] = [];

  constructor() { }

  /** Given a repo, adds it to a list of favourites */
  public add(repo: Repo) {
    this.favourites.push(repo);
    this.updatedFavourites.emit('Favourites list updated.');
    console.log('current favourites: ' + JSON.stringify(this.favourites));
  }

  /** Return a list of favourite repos */
  public getFavourites(): Repo[] {
    return this.favourites;
  }

  public remove(repo: Repo): void {
    let index = this.favourites.indexOf(repo);
    if (index > -1) {
      this.favourites.splice(index, 1); 
      this.updatedFavourites.emit('Favourites list updated.');
    }
  }
}
