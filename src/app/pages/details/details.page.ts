import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemonName: string = '';
  pokemon: any = null;
  species: any = null;
  descriptions: string[] = [];

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonName = this.route.snapshot.paramMap.get('name') || '';
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.pokemonService.getPokemonDetails(this.pokemonName).subscribe(p => {
      this.pokemon = p;
      this.loadSpecies();
    });
  }

  loadSpecies() {
    this.pokemonService.getPokemonSpecies(this.pokemonName).subscribe(species => {
      this.species = species;
      this.descriptions = this.species.flavor_text_entries
        .filter((entry: any) => entry.language.name === 'en')
        .slice(0, 6)
        .map((entry: any) => entry.flavor_text.replace(/\n|\f/g, ' '));
    });
  }
}