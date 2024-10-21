import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disciplina } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http:HttpClient) { }

  getDisciplinas(){
    return this.http.get<Disciplina[]>('/assets/data/disciplinas.json')
  }


}
