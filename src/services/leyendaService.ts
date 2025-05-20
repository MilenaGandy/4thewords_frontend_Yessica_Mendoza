import type { SimpleSuccessCallback, SimpleErrorCallback } from '@/interfaces/apiInterfaces'
import { createOne, deleteOne, getMany, getOne, updateOne } from '@/services/apiService'

import type { Leyenda, LeyendaCreate } from '@/modules/leyendas/interfaces/Leyenda'

const baseUrl: string = 'http://192.168.1.4:8080'
const endpoint: string = `${baseUrl}/leyendas`



export function getLeyendas(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
) {
  const url: string = `${endpoint}/`
  getMany(
    url,
    successCallback,
    errorCallback,
  )
}


export function getLeyendaById(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  leyenda_id: number,
) {
  const url: string = `${endpoint}/${leyenda_id}/`
  getOne(
    url,
    successCallback,
    errorCallback,
  )
}


export function createLeyenda(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  leyenda: LeyendaCreate,
) {
  const url: string = `${endpoint}/`
  createOne(
    url,
    successCallback,
    errorCallback,
    leyenda,
  )
}

export function updateLeyenda(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  leyenda: Leyenda,
) {
  const url: string = `${endpoint}/${leyenda.id}/`
  updateOne(
    url,
    successCallback,
    errorCallback,
    leyenda,
  )
}


export function deleteLeyenda(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  leyenda_id: number,
) {
  const url: string = `${endpoint}/${leyenda_id}/`
  deleteOne(
    url,
    successCallback,
    errorCallback,
  )
}
