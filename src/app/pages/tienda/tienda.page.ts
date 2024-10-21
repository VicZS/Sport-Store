import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  disiplinas: Observable<Disciplina[]> = new Observable<Disciplina[]>();

  constructor( private dataService: DataService,
              private alertCtrl: AlertController
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
          console.log('click en agregar')
        }
      }]
    });

    await alert.present();
  }


}
