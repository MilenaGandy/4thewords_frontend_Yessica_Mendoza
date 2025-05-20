import type { SimpleSuccessCallback, SimpleErrorCallback } from '@/interfaces/apiInterfaces'
import { createOne, deleteOne, getMany, getOne, updateOne } from '@/services/apiService'

import type { Provincia, ProvinciaCreate } from '@/modules/leyendas/interfaces/Leyenda'

const baseUrl: string = 'http://192.168.1.4:8080'
const endpoint: string = `${baseUrl}/provincias`



export function getProvincias(
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

export function getProvinciaById(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  provincia_id: number,
) {
  const url: string = `${endpoint}/${provincia_id}/`
  getOne(
    url,
    successCallback,
    errorCallback,
  )
}


export function createProvincia(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  provincia: ProvinciaCreate,
) {
  const url: string = `${endpoint}/`
  createOne(
    url,
    successCallback,
    errorCallback,
    provincia,
  )
}

export function updateProvincia(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  provincia: Provincia,
) {
  const url: string = `${endpoint}/${provincia.id}/`
  updateOne(
    url,
    successCallback,
    errorCallback,
    provincia,
  )
}

export function deleteProvincia(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  id: number,
) {
  const url: string = `${endpoint}/${id}/`
  deleteOne(
    url,
    successCallback,
    errorCallback,
  )
}
