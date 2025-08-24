"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Smartphone, QrCode } from "lucide-react"

export default function Mobile({ params }: { params: { locale: string } }) {
  const t = useTranslations()
  const router = useRouter()

  const handleBack = () => {
    router.push(`/${params.locale}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('guide.backButton')}
      </Button>

      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Mobile App Download</h1>
          <p className="text-gray-600">Download our mobile app for easier access to zakat calculations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Android App</h3>
              <p className="text-sm text-gray-600 mb-4">Scan QR code to download from Google Play Store</p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Download for Android
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">iOS App</h3>
              <p className="text-sm text-gray-600 mb-4">Scan QR code to download from App Store</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download for iOS
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              App Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Offline zakat calculation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Multi-language support
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Prayer time notifications
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Secure payment gateway
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Zakat history tracking
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={handleBack} variant="outline">
            Back to Calculator
          </Button>
        </div>
      </div>
    </div>
  )
}
