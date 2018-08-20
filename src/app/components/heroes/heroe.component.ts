import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"Marvel"
  }
  nuevo:boolean = false;
  id:string;

  constructor(
    private heroeService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(
      parametros => {
        //console.log(parametros);
        this.id = parametros['id'];
        if(this.id != "nuevo"){
          this.heroeService.verHeroe(this.id).subscribe(
            (heroe:any) => {
              //console.log(heroe);
              this.heroe = heroe;
            }
          )
        }
      }
    )
  }

  ngOnInit() {
  }
  
  guardar(){
    //console.log(this.heroe);
    if(this.id == "nuevo"){
      this.heroeService.nuevoHeroe(this.heroe).subscribe(
        (data:any) => {
          this.router.navigate(['/hero', data.name]);
        }
      )
    }else{
      this.heroeService.editarHeroe(this.heroe, this.id).subscribe(
        (data:any) => {
          this.router.navigate([`/hero`, data.name]);
        }
      )
    }
  }

  agregarNuevo(forma: NgForm){
    this.router.navigate(['/hero','nuevo']);
    forma.reset({
      casa:"Marvel"
    })
  }

}
