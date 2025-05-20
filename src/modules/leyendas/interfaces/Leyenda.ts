import { Provincia } from './Provincia'
import { Canton } from './Canton'


export interface Leyenda {
  id: number
  nombre: string
  image: string
  creacion: string
  categoria: string
  epoca: string
  Descripcion: string
  Provincia: string
  Canton: string
  Distrito: string
}


export interface LeyendaCreate {
  nombre: string
  image: string
  creacion: string
  categoria: string
  epoca: string
  Descripcion: string
  Provincia: number
  Canton: number
  Distrito: number
}