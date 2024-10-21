import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { itemCarrito } from '../../interfaces/interfaces';



@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  disiplinas: Observable<Disciplina[]> = new Observable<Disciplina[]>();

  constructor( private dataService: DataService,
              private alertCtrl: AlertController,
              private storageService: StorageService 
  ) { }

  ngOnInit() {
    this.disiplinas = this.dataService.getDisciplinas();
  }

  async alertaDisciplina(item:Disciplina){
    const alert = await this.alertCtrl.create({
      header: 'Pase de '+ item.name+' agregado correctamente.',
      
      buttons: [
      {
        text: 'Aceptar',
        handler: () =>{
        
          this.storageService.obtenerItemCarrito(item.id).then(paseActual => {
            if (paseActual) {
              const cantidadActualizada = (paseActual.cantidad + 1);
              const costoTotalActualizada = (cantidadActualizada * (item.precio_sin_IVA * 1.16) )

              const pase : itemCarrito = {
                id: item.id,
                cantidad: cantidadActualizada,
                costoTotalItems: costoTotalActualizada
              }
              this.storageService.actualizarItemCarrito(pase);
              
            } else {
              console.log('El ítem se agrego al carrito.');

              const pase : itemCarrito = {
                id: item.id,
                cantidad: 1,
                costoTotalItems: (item.precio_sin_IVA * 1.16)
              }
              this.storageService.actualizarItemCarrito(pase);
            }

          });

        }
      }]
    });

    await alert.present();
  }


}
