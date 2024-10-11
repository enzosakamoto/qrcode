import { qrCodeService } from '@/services/qrcode-service'

export const useQrCode = () => {
  const fetchQrCode = async (
    url: string,
    size: string = '300x300'
  ): Promise<Blob | undefined> => {
    try {
      const qrCode = await qrCodeService.getQrCode(url, size)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return qrCode
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return { fetchQrCode }
}
