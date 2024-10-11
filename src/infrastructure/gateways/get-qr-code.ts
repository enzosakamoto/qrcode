import { HttpClient, HttpResponse } from '../http/http'
import { api } from '../http/api'

interface GetQrCode {
  load(url: string, size: string): Promise<HttpResponse<Blob>>
}

class GetQrCodeGateway implements GetQrCode {
  constructor(private readonly httpClient: HttpClient<HttpResponse<Blob>>) {}

  async load(url: string, size: string): Promise<HttpResponse<Blob>> {
    return await this.httpClient.request({
      method: 'get',
      url: `/?size=${size}&data=${url}`
    })
  }
}

const axiosHttpClient: HttpClient<HttpResponse<Blob>> = {
  async request(data) {
    try {
      const response = await api.request<Blob>({
        method: data.method,
        url: data.url,
        responseType: 'blob'
      })

      return {
        statusCode: response.status,
        data: response.data
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}

export const getQrCodeGateway = new GetQrCodeGateway(axiosHttpClient)
