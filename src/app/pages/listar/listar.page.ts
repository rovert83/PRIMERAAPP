import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  arregloNoticias: any;

  constructor(private servicioBD: BdserviceService, private router: Router) { }

  eliminar(x:any){
    this.servicioBD.eliminarNoticias(x.id_noticia).then(res=>{
      this.servicioBD.presentAlert("Noticia Eliminada");
    })

  }

  obtenerTexto($event:any){

  }

  modificar(x:any){
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id_noticia,
        tituloEnviado: x.titulo,
        textoEnviado: x.texto
      }
    }

    this.router.navigate(['/modificar'], navigationExtras);

  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchNoticias().subscribe(item=>{
          //obteniendo los datos dle observable
          this.arregloNoticias = item;
        })
      }
    })
  }

}
