import { QrCodeRepositoryInterface } from '@/domain/interfaces/qrcode-repository-interface'
import { getQrCodeGateway } from '@/infrastructure/gateways/get-qr-code'

export class QrCodeRepositoryHttp implements QrCodeRepositoryInterface {
  async getQrCode(url: string, size: string): Promise<Blob> {
    try {
      const response = await getQrCodeGateway.load(url, size)

      return response.data as Blob
    } catch (error) {
      throw new Error(
        'Something went wrong on get qr code: ' + (error as Error).message
      )
    }
  }
}
