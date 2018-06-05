import {
  NavController,
  NavParams
} from 'ionic-angular';
import {
  ApiPokemonProvider
} from '../../providers/api-pokemon/api-pokemon';
import {
  Pokemon
} from '../../providers/models/pokemon';
import {
  every
} from 'rxjs/operators';

import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  Content
} from 'ionic-angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  @ViewChild(Content) content: Content;
  private pokemons: Array < Pokemon > = new Array < Pokemon > ();

  private offset = 0;

  searchTerm: string = '';
  searchControl: FormControl;


  constructor(public navCtrl: NavController, public navParams: NavParams, public apiPokemon: ApiPokemonProvider) {
    this.searchControl = new FormControl();
    this.apiPokemon.getPokemons(this.offset).subscribe((val) => {
      this.pokemons = val;
      console.log(this.pokemons);
    }, (err) => {
      console.log(err);
    })

    

  }

  ngOnInit(){
    this.searchControl.valueChanges.subscribe(search => {
      /*this.pokemons = this.pokemons.filter((p)=> {
        console.log(this.searchTerm)
        p.name.includes(this.searchTerm);
      })*/
  });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.offset += 21;
    this.loadPokemons (this.offset);
    infiniteScroll.complete();
  }

  onInput() {
    

  }

  onCancel($even: Event) {
    this.offset = 21
    this.loadPokemons(this.offset);
  }

  loadPokemons(offset) {
    this.offset = offset;
    console.log(this.offset)
    this.apiPokemon.getPokemons(this.offset).subscribe((val: Pokemon[]) => {
      console.log(this.pokemons, val);
      this.pokemons.push.apply(this.pokemons, val);
      console.log(this.pokemons)
    }, (err) => {
      console.log(err);
    })
  }

  getImg(index) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + index + ".png";
  }
}
