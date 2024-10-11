export interface GetQrCodeServiceInterface {
  getQrCode(url: string, size: string): Promise<Blob>
}
