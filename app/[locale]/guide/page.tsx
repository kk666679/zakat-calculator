"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Calculator, CreditCard, FileText } from "lucide-react"

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

export default function Guide({ params }: { params: { locale: string } }) {
  const t = useTranslations()
  const router = useRouter()

  const handleBack = () => {
    router.push(`/${params.locale}`)
  }

  const formatNumber = (num: number, currency: string) => {
    const symbol = currencySymbols[currency as keyof typeof currencySymbols]

    if (currency === "IDR") {
      return `${symbol} ${Math.round(num).toLocaleString("id-ID")}`
    }

    return `${symbol} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('guide.backButton')}
      </Button>

      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('guide.title')}</h1>
          <p className="text-gray-600">Panduan lengkap untuk mengira dan membayar zakat kripto</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t('guide.sections.whatIsZakat.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {t('guide.sections.whatIsZakat.content')}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {t.raw('guide.sections.whatIsZakat.points').map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {t('guide.sections.howToCalculate.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {t.raw('guide.sections.howToCalculate.steps').map((step: string, index: number) => {
                if (index % 2 === 0) {
                  return (
                    <div key={index}>
                      <h4 className="font-semibold mb-2">{step}</h4>
                    </div>
                  )
                } else {
                  return (
                    <p key={index} className="mb-4">{step}</p>
                  )
                }
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {t('guide.sections.howToPay.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Organisasi Zakat Rasmi</h4>
                <ul className="list-disc list-inside space-y-1">
                  {t.raw('guide.sections.howToPay.organizations').map((org: string, index: number) => (
                    <li key={index}>{org}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Kaedah Pembayaran</h4>
                <ul className="list-disc list-inside space-y-1">
                  {t.raw('guide.sections.howToPay.methods').map((method: string, index: number) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('guide.sections.nisabValue.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">{t('guide.sections.nisabValue.mainASEAN')}</h4>
                <ul className="space-y-1">
                  {countries.slice(0, 5).map((c) => (
                    <li key={c.code}>
                      {c.flag} {t(`countries.${c.code}`)}: {formatNumber(nisabValues[c.code as keyof typeof nisabValues], c.code)}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('guide.sections.nisabValue.otherASEAN')}</h4>
                <ul className="space-y-1">
                  {countries.slice(5).map((c) => (
                    <li key={c.code}>
                      {c.flag} {t(`countries.${c.code}`)}: {formatNumber(nisabValues[c.code as keyof typeof nisabValues], c.code)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {t('guide.sections.nisabValue.note')}
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={handleBack} className="bg-green-600 hover:bg-green-700">
            Mula Mengira Zakat
          </Button>
        </div>
      </div>
    </div>
  )
}
