import type { SimpleSuccessCallback, SimpleErrorCallback } from '@/interfaces/apiInterfaces'
import { getMany, getOne, } from '@/services/apiService'

const baseUrl: string = 'http://192.168.1.4:8080'
const endpoint: string = `${baseUrl}/provincias`



export function getCantones(
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

export function getCantonById(
  successCallback: SimpleSuccessCallback,
  errorCallback: SimpleErrorCallback,
  provincia_id: number,
  canton_id: number,
) {
  const url: string = `${endpoint}/${provincia_id}/cantones/${canton_id}/`
  getOne(
    url,
    successCallback,
    errorCallback,
  )
}

