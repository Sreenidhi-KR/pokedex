import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    ReactiveFormsModule,
    HttpLinkModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'https://graphql-pokemon.now.sh/' }),
      cache: new InMemoryCache(),
    });
  }
}
