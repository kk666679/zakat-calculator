"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Coins, Info, QrCode, Download, Share2, ExternalLink, FileText, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LanguageSwitcher } from "@/components/language-switcher"

interface ZakatResult {
  netAssets: number
  nisabStatus: "above" | "below"
  zakatAmount: number
  zakatTokens: number
  currency: string
  currencySymbol: string
}

const nisabValues = {
  MYR: 21500,
  SGD: 7225,
  IDR: 14500000,
  THB: 54000,
  PHP: 128000,
  BND: 7225,
  KHR: 29000000,
  LAK: 460000000,
  MMK: 45000000,
  VND: 540000000,
}

const tokenRates = {
  MYR: 100,
  SGD: 330,
  IDR: 0.009,
  THB: 13,
  PHP: 0.18,
  BND: 330,
  KHR: 0.0024,
  LAK: 0.00012,
  MMK: 0.0015,
  VND: 0.00004,
}

const currencySymbols = {
  MYR: "RM",
  SGD: "S$",
  IDR: "Rp",
  THB: "฿",
  PHP: "₱",
  BND: "B$",
  KHR: "៛",
  LAK: "₭",
  MMK: "K",
  VND: "₫",
}

const countries = [
  { code: "MYR", name: "Malaysia", flag: "🇲🇾" },
  { code: "SGD", name: "Singapore", flag: "🇸🇬" },
  { code: "IDR", name: "Indonesia", flag: "🇮🇩" },
  { code: "THB", name: "Thailand", flag: "🇹🇭" },
  { code: "PHP", name: "Philippines", flag: "🇵🇭" },
  { code: "BND", name: "Brunei", flag: "🇧🇳" },
  { code: "KHR", name: "Cambodia", flag: "🇰🇭" },
  { code: "LAK", name: "Laos", flag: "🇱🇦" },
  { code: "MMK", name: "Myanmar", flag: "🇲🇲" },
  { code: "VND", name: "Vietnam", flag: "🇻🇳" },
]

export default function ZakatCalculator({ params }: { params: { locale: string } }) {
  const t = useTranslations()
  const router = useRouter()
  const [country, setCountry] = useState("MYR")
  const [amount, setAmount] = useState("")
  const [debt, setDebt] = useState("")
  const [result, setResult] = useState<ZakatResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleDownloadApp = () => {
    router.push(`/${params.locale}/mobile`)
  }

  const handlePayZakat = () => {
    if (result && result.zakatAmount > 0) {
      router.push(`/${params.locale}/pay-zakat?amount=${result.zakatAmount}&currency=${result.currency}`)
    } else {
      alert(t('payZakat.alertSelectOrg'))
    }
  }

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: t('appTitle'),
        text: t('appDescription'),
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleViewGuide = () => {
    router.push(`/${params.locale}/guide`)
  }

  const formatNumber = (num: number, currency: string, isCurrency = true) => {
    const symbol = currencySymbols[currency as keyof typeof currencySymbols]

    if (currency === "IDR") {
      return isCurrency
        ? `${symbol} ${Math.round(num).toLocaleString("id-ID")}`
        : Math.round(num).toLocaleString("id-ID")
    }

    return isCurrency
      ? `${symbol} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : Math.round(num).toLocaleString()
  }

  const calculateZakat = async () => {
    setIsCalculating(true)

    try {
      const response = await fetch("/api/calculate-zakat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          assets: Number.parseFloat(amount) || 0,
          debts: Number.parseFloat(debt) || 0,
          currency: country,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      console.error("Error calculating zakat:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Calculator className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold">{t('appTitle')}</h1>
            </div>
            <LanguageSwitcher />
          </div>
          <p className="text-lg md:text-xl mb-6 max-w-3xl">
            {t('appDescription')}
          </p>

          {/* Country Flags */}
          <div className="flex justify-center gap-4 flex-wrap">
            {countries.map((c) => (
              <div key={c.code} className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                <span className="text-2xl">{c.flag}</span>
                <span className="text-sm font-medium">{t(`countries.${c.code}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                {t('calculator.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="country">{t('calculator.countryLabel')}</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.flag} {t(`countries.${c.code}`)} ({c.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">{t('calculator.amountLabel')}</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder={t('calculator.amountLabel')}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debt">{t('calculator.debtLabel')}</Label>
                <Input
                  id="debt"
                  type="number"
                  placeholder={t('calculator.debtLabel')}
                  value={debt}
                  onChange={(e) => setDebt(e.target.value)}
                />
              </div>

              <Button
                onClick={calculateZakat}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isCalculating}
              >
                <Calculator className="h-4 w-4 mr-2" />
                {isCalculating ? t('calculator.calculating') : t('calculator.calculateButton')}
              </Button>

              {/* Results */}
              {result && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">{t('calculator.resultTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t('calculator.netAssets')}</p>
                        <p className="font-bold text-lg">{formatNumber(result.netAssets, result.currency)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t('calculator.nisabStatus')}</p>
                        <Badge variant={result.nisabStatus === "above" ? "default" : "secondary"}>
                          {result.nisabStatus === "above" ? t('calculator.nisabAbove') : t('calculator.nisabBelow')}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t('calculator.zakatAmount')}</p>
                        <p className="font-bold text-lg text-red-600">
                          {formatNumber(result.zakatAmount, result.currency)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t('calculator.tokenValue')}</p>
                        <p className="font-bold text-lg">
                          {formatNumber(result.zakatTokens, result.currency, false)} token
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Guide Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                {t('guide.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">{t('guide.sections.nisabValue.title')}</h3>
                <div className="space-y-2">
                  {countries.map((c) => (
                    <div key={c.code} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>
                        {c.flag} {t(`countries.${c.code}`)}
                      </span>
                      <span className="font-semibold">
                        {formatNumber(nisabValues[c.code as keyof typeof nisabValues], c.code)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">{t('guide.sections.howToCalculate.title')}</h3>
                <div className="flex items-center justify-between text-center">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-green-600">1</span>
                    </div>
                    <p className="text-xs">Aset Kripto</p>
                  </div>
                  <div className="px-2">→</div>
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-green-600">2</span>
                    </div>
                    <p className="text-xs">Tolak Hutang</p>
                  </div>
                  <div className="px-2">→</div>
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-green-600">3</span>
                    </div>
                    <p className="text-xs">Banding Nisab</p>
                  </div>
                  <div className="px-2">→</div>
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-green-600">4</span>
                    </div>
                    <p className="text-xs">Bayar 2.5%</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Syarat Wajib Zakat:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Milik penuh aset
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Melebihi nilai nisab
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Genap haul (354 hari)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Aset berkembang (berpotensi tumbuh)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Akses Mudah & Bayar Zakat</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2">Muat Turun Aplikasi</h3>
                <p className="text-sm text-gray-600">Imbas untuk muat turun aplikasi mobile</p>
                <Button variant="outline" className="mt-3" onClick={handleDownloadApp}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2">{t('payZakat.title')}</h3>
                <p className="text-sm text-gray-600">Bayar zakat secara digital dengan selamat</p>
                <Button className="mt-3 bg-green-600 hover:bg-green-700" onClick={handlePayZakat}>
                  <Coins className="h-4 w-4 mr-2" />
                  {t('payZakat.payButton')}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2">Panduan Lengkap</h3>
                <p className="text-sm text-gray-600">Lihat panduan lengkap zakat kripto</p>
                <Button variant="outline" className="mt-3" onClick={handleViewGuide}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Lihat Panduan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Share Section */}
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={handleShareApp} className="mx-auto">
              <Share2 className="h-4 w-4 mr-2" />
              Kongsi Aplikasi
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 {t('appTitle')}. Disokong oleh JAKIM, MUIS, dan MUI.</p>
          <p className="text-sm opacity-90">{t('guide.sections.nisabValue.note')}</p>
        </div>
      </footer>
    </div>
  )
}
