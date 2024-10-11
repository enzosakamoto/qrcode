import { GetQrCodeUseCase } from '@/application/usecase/get-qrcode-usecase'
import { GetQrCodeServiceInterface } from '@/domain/interfaces/qrcode-service-interface'
import { QrCodeRepositoryHttp } from '@/infrastructure/repositories/http/qrcode-repository-http'

export class QrCodeService implements GetQrCodeServiceInterface {
  private getQrCodeUseCase: GetQrCodeUseCase

  constructor(
    getQrCodeUseCase: GetQrCodeUseCase = new GetQrCodeUseCase(
      new QrCodeRepositoryHttp()
    )
  ) {
    this.getQrCodeUseCase = getQrCodeUseCase
  }

  async getQrCode(url: string, size: string): Promise<Blob> {
    return await this.getQrCodeUseCase.execute(url, size)
  }
}

export const qrCodeService = new QrCodeService()
