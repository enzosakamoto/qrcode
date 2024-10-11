import { useState } from 'react'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { useQrCode } from '../hooks/use-qrcode'
import { Skeleton } from '../components/ui/skeleton'
import { useToast } from '../hooks/use-toast'

export function Home() {
  const { fetchQrCode } = useQrCode()
  const { toast } = useToast()
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [qrCode, setQrCode] = useState<Blob | undefined>(undefined)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const qrCode = await fetchQrCode(
        url,
        window.innerWidth < 640 ? '200x200' : '300x300'
      )
      setQrCode(qrCode)
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Alguma coisa deu errado...',
        description: 'Tente novamente mais tarde.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-12 px-6 py-12 md:p-0">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Gerador de QR Code
      </h1>
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-xl">Digite uma URL</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="https://enzosakamoto.com.br"
            onChange={(e) => setUrl(e.target.value)}
          />
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={url ? handleSubmit : undefined}>Enviar</Button>
        </CardFooter>
      </Card>
      {isLoading ? (
        <Skeleton className="h-[250px] w-[250px] rounded-xl sm:h-[350px] sm:w-[350px]" />
      ) : (
        qrCode && (
          <Card className="h-[250px] w-[250px] p-6 sm:h-[350px] sm:w-[350px]">
            <img
              src={URL.createObjectURL(qrCode)}
              alt="QR Code"
              className="h-full w-full object-contain"
            />
          </Card>
        )
      )}
    </main>
  )
}
