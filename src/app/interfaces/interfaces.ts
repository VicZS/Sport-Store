export interface Componente{
    icon: string;
    name: string;
    redirectTo: string;
}

export interface Disciplina{
  id: Int32Array;
  img: string;
  name: string;
  description: string;
  precio_sin_IVA: Float64Array;
}