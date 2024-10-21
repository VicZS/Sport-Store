import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { itemCarrito } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _Carrito: itemCarrito[] = [];

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    
    const carrito = await this._storage.get('Carrito');
    this._Carrito = carrito || [];
  }

  async actualizarItemCarrito(item: itemCarrito) {
    if (await this.existeItemCarrito(item.id)) {
      if (item.cantidad > 0) {
        this._Carrito = this._Carrito.map(itemCarrito => 
          itemCarrito.id === item.id 
            ? { ...itemCarrito, cantidad: item.cantidad, costoTotalItems: item.costoTotalItems } 
            : itemCarrito
        );

        console.log('Se actualizó el Producto');
      } else {
        this._Carrito = this._Carrito.filter(itemCarrito => itemCarrito.id !== item.id);
        console.log('Se eliminó el Producto');
      }
    } else {
      this._Carrito = [item, ...this._Carrito];
      console.log('Se agregó el Producto');
    }

    await this._storage?.set('Carrito', this._Carrito);
  }

  async mostrarItemCarrito(id: number) {
    if (await this.existeItemCarrito(id)) {
      return this._Carrito;
    } else {
      return [];
    }
  }

  async existeItemCarrito(id: number) {
    const exists = this._Carrito.find(itemCarrito => itemCarrito.id === id);
    return !!exists;
  }

  async obtenerItemCarrito(id: number) {
    const itemEncontrado = this._Carrito.find(itemCarrito => itemCarrito.id === id);
    return itemEncontrado || null;
  }
}
