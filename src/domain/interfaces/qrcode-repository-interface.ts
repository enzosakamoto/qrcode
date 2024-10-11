export interface QrCodeRepositoryInterface {
  getQrCode(url: string, size: string): Promise<Blob>
}
