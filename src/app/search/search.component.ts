import { Component, OnInit, Output } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Repo } from '../services/Repo';
import { FormControl, Validators } from '@angular/forms';
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public repos: Repo[] = [];
  public keyword = new FormControl('', [Validators.required]);

  constructor(private githubService: GithubService, private favouritesService: FavouritesService) { }

  ngOnInit() {
  }

  /** Method to call GitHub service to fetch repos with keyword as query */
  public search(): void {
    this.githubService.getRepos(this.keyword.value).subscribe((result) => {
      this.repos = [];
      var newRepo: Repo;
      // Get repo info
      for (let i = 0; i < 10; i++) {
        if (result.items[i] == undefined) {
          break;
        }

        newRepo = {
          name: result.items[i].full_name,
          language: result.items[i].language,
          tag: '-',
          tags_url: result.items[i].tags_url,
          link: result.items[i].html_url
        }
        this.repos.push(newRepo);
      }
      this.getLatestTags();
    });
  }

  /** Get the latest tags for repos */
  public getLatestTags(): void {
    // Get tags for each repo
    for (let repo of this.repos) {
      this.githubService.getLatestTag(repo.tags_url).then((tags) => {
        if (tags.length > 0) {
          repo.tag = tags[0].name;
        }
      });
    }
  }

  /** Given a repo, adds it to a favourites list */
  public addFavourite(repo: Repo): void {
    this.favouritesService.add(repo);
  }

}
