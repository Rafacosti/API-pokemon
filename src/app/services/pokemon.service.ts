import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`);
  }

  getPokemonSpecies(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${name}`);
  }
}
