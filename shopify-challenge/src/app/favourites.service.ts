import { Injectable, EventEmitter } from '@angular/core';
import { Repo } from './services/Repo';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  public updatedFavourites: EventEmitter<any> = new EventEmitter();
  public favourites: Repo[] = [];
  

  constructor() { 
    this.getFavouritesLocalStorage();
  }

  /** Given a repo, adds it to a list of favourites */
  public add(repo: Repo) {
    this.favourites.push(repo);
    localStorage.setItem(String(repo.name), JSON.stringify(repo));

    this.updatedFavourites.emit('Favourites list updated.');
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

    localStorage.removeItem(repo.name);
  }

  public getFavouritesLocalStorage(): void {
    let keys = Object.keys(localStorage);
    
    for (let key of keys) {
      this.favourites.push(JSON.parse(localStorage.getItem(key)));
    }
  }
}
