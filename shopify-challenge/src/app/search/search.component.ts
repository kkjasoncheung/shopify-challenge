import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Repo } from '../services/Repo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keyword: string;
  public repos: Repo[] = [];

  constructor(private githubService: GithubService) { }

  ngOnInit() {
  }

  /** Method to call GitHub service to fetch repos with keyword as query */
  public search(): void {
    console.log('Search repo with keyword', this.keyword);
    this.githubService.getRepos(this.keyword).subscribe((result) => {
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

}
