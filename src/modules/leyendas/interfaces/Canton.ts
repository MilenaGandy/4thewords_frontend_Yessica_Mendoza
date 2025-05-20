import type { Provincia } from './Provincia'


export interface CantonCreate {
  nombre: string
  provincia_id: number
}


export interface Canton {
  nombre: string
  id: number
  provincia: Provincia
}