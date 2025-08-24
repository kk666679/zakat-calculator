"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, ArrowLeft, Check } from "lucide-react"
import { Label } from "@/components/ui/label"

const charityOrganizations = {
  MYR: [
    { id: "JAKIM-001", name: "Jabatan Kemajuan Islam Malaysia", code: "JAKIM" },
    { id: "MAIWP-001", name: "Majlis Agama Islam Wilayah Persekutuan", code: "MAIWP" },
  ],
  SGD: [
    { id: "MUIS-001", name: "Majlis Ugama Islam Singapura", code: "MUIS" },
  ],
  IDR: [
    { id: "MUI-001", name: "Majelis Ulama Indonesia", code: "MUI" },
  ],
  THB: [
    { id: "CICOT-001", name: "Central Islamic Committee of Thailand", code: "CICOT" },
  ],
  PHP: [
    { id: "NCMF-001", name: "National Commission on Muslim Filipinos", code: "NCMF" },
  ],
}

export default function PayZakat({ params }: { params: { locale: string } }) {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount") || "0"
  const currency = searchParams.get("currency") || "MYR"
  
  const [selectedCharity, setSelectedCharity] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = async () => {
    if (!selectedCharity) {
      alert(t('payZakat.alertSelectOrg'))
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)

    // Redirect to success page after 1 second
    setTimeout(() => {
      router.push(`/${params.locale}`)
    }, 1000)
  }

  const handleBack = () => {
    router.push(`/${params.locale}`)
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto p-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">{t('payZakat.successTitle')}</h2>
            <p className="text-gray-600 mb-4">
              {t('payZakat.successMessage')}
            </p>
            <Button onClick={handleBack}>{t('payZakat.backButton')}</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('payZakat.backButton')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{t('payZakat.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('payZakat.amountLabel')}</Label>
            <div className="text-2xl font-bold">{currency} {parseFloat(amount).toLocaleString()}</div>
          </div>

          <div className="space-y-2">
            <Label>{t('payZakat.selectOrganization')}</Label>
            <Select value={selectedCharity} onValueChange={setSelectedCharity}>
              <SelectTrigger>
                <SelectValue placeholder={t('payZakat.selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {charityOrganizations[currency as keyof typeof charityOrganizations]?.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {isProcessing ? t('payZakat.processing') : t('payZakat.payButton')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
