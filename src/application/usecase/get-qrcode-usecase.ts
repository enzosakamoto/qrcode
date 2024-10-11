import { QrCodeRepositoryInterface } from '@/domain/interfaces/qrcode-repository-interface'

interface GetQrCodeUseCaseInterface {
  execute(url: string, size: string): Promise<Blob>
}

export class GetQrCodeUseCase implements GetQrCodeUseCaseInterface {
  private readonly qrCodeRepository: QrCodeRepositoryInterface

  constructor(qrCodeRepository: QrCodeRepositoryInterface) {
    this.qrCodeRepository = qrCodeRepository
  }

  async execute(url: string, size: string) {
    return this.qrCodeRepository.getQrCode(url, size)
  }
}
