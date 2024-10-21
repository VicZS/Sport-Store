export interface Componente{
    icon: string;
    name: string;
    redirectTo: string;
}

export interface Disciplina{
  id: number;
  img: string;
  name: string;
  description: string;
  precio_sin_IVA: number;
}

export interface itemCarrito{
  id: number;
  cantidad: number;
  costoTotalItems: number;
}

export interface carrito{
  idCarrito: number;
  itemComprado: itemCarrito;
  totalCarrito: number;
}