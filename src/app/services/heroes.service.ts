import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesURL:string = 'https://heroesapp-aa058.firebaseio.com/heroes.json';
  heroeURL:string = 'https://heroesapp-aa058.firebaseio.com/heroes/';
  constructor(
    private http: HttpClient
  ) { }
  nuevoHeroe(heroe: Heroe){
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(this.heroesURL, body, {headers}).pipe(
    map(res => {
      //console.log(res);
      return res;
    }))
  }
  editarHeroe(heroe: Heroe, key$: string){
    let body = JSON.stringify(heroe);
    let url = `${ this.heroeURL }/${ key$ }.json`;
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(url, body, {headers}).pipe(
    map(res => {
      //console.log(res);
      return res;
    }))
  }
  verHeroe(key$:string){
    let url = `${ this.heroeURL }/${ key$ }.json`;
    return this.http.get(url).pipe(
      map(res => {
        //console.log(res);
        return res;
      })
    )
  }
  verHeroes(){
    return this.http.get(this.heroesURL).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    )
  }
  eliminarHeroes(id:string){
    let url = `${this.heroeURL}/${id}.json`;
    return this.http.delete(url).pipe(
      map(res => {
        return res;
      })
    )
  }
}
