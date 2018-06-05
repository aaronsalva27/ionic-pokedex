import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the ApiPokemonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiPokemonProvider {
  baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=';

  constructor(public http: HttpClient) {
  }

  getPokemons(offset): Observable<Array<Pokemon>> {
    console.log('entra api')
    return this.http.get<Pokemon>(this.baseURL+offset).map((res: Response) => {
      console.log(res)
      return res['results'];
    }).catch((err) =>{
      return Observable.throw(err)
    });
  }

}
