import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  disiplinas: Observable<Disciplina[]> = new Observable<Disciplina[]>();

  constructor( private dataService: DataService) { }

  ngOnInit() {
    this.disiplinas = this.dataService.getDisciplinas();

  }

}
