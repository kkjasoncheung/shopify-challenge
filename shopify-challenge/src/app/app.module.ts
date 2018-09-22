import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavouritesComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
