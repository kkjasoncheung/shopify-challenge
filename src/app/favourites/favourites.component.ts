import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../favourites.service';
import { Repo } from '../services/Repo';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public favourites: Repo[];
  
  constructor(private favouritesService: FavouritesService) {

  }

  ngOnInit() {
    this.updateFavourites();
    this.favouritesService.updatedFavourites.subscribe((result: string) => {
      console.log(result);
      this.updateFavourites();
    })
  }

  /** Update repo favourites list */
  public updateFavourites(): void {
    this.favourites = this.favouritesService.favourites;
    console.log(this.favourites);
  }

  /** Remove a repo from favourites list */
  public removeFavourite(repo: Repo): void {
    this.favouritesService.remove(repo);
  }
}
