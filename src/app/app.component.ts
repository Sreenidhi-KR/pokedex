import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokemon';
  pokemons = [];
  initpokemons = [];
  categories = [];
  checkoutForm: FormGroup;
  loading = true;
  constructor(apollo: Apollo, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      catagory: '',
      name: '',
    });
    apollo
      .query({
        query: gql`
          {
            query {
              pokemons(first: 550) {
                name
                types
                classification
                image
              }
            }
          }
        `,
      })
      .subscribe(({ data, loading }: { data: any; loading: boolean }) => {
        this.initpokemons = data.query.pokemons;
        this.pokemons = this.initpokemons;
        this.loading = loading;
        this.categories = this.initpokemons
          .map((c) => c.types)
          .reduce((acc, val) => acc.concat(val), []);
        this.categories = [...new Set(this.categories)];
      });
  }
  onSubmit(cat) {
    this.pokemons = this.initpokemons;
    const filteredPokemon = this.pokemons.filter((poke) => {
      return poke.types.includes(cat.catagory);
    });
    this.pokemons = filteredPokemon;
  }
  onChange(event) {
    this.pokemons = this.initpokemons;
    const searchedPokemons = this.pokemons.filter((poke) => {
      return poke.name.toLowerCase().includes(event.toLowerCase());
    });
    this.pokemons = searchedPokemons;
  }
}
