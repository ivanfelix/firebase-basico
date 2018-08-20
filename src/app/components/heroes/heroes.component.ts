import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes:any;

  constructor(
    private heroesService: HeroesService
  ) {
    this.heroesService.verHeroes().subscribe(
      heroes => this.heroes = heroes
    )
  }

  ngOnInit() {
  }

  eliminarHeroe(id:string){
    this.heroesService.eliminarHeroes(id)
    .subscribe(res =>{

      if(res){
        res => console.log(res)
      }else{
        delete this.heroes[id];
      }  
    }
    )
  }

}
