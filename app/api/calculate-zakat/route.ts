import { type NextRequest, NextResponse } from "next/server"

interface CalculateZakatRequest {
  country: string
  assets: number
  debts: number
  currency: string
}

interface ZakatResult {
  nisabThreshold: number
  netAssets: number
  nisabStatus: "above" | "below"
  zakatAmount: number
  zakatTokens: number
  currency: string
  currencySymbol: string
}

const nisabValues: Record<string, number> = {
  MYR: 21500,
  SGD: 7225,
  IDR: 14500000,
  THB: 54000,
  PHP: 128000,
  BND: 7225,    // Brunei Dollar (pegged to SGD)
  KHR: 29000000, // Cambodian Riel
  LAK: 460000000, // Lao Kip
  MMK: 45000000,  // Myanmar Kyat
  VND: 540000000, // Vietnamese Dong
}

const tokenRates: Record<string, number> = {
  MYR: 100,
  SGD: 330,
  IDR: 0.009,
  THB: 13,
  PHP: 0.18,
  BND: 330,     // Same as SGD (pegged)
  KHR: 0.0024,  // Cambodian Riel
  LAK: 0.00012, // Lao Kip
  MMK: 0.0015,  // Myanmar Kyat
  VND: 0.00004, // Vietnamese Dong
}

const currencySymbols: Record<string, string> = {
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

export async function POST(request: NextRequest) {
  try {
    const body: CalculateZakatRequest = await request.json()
    const { country, assets, debts, currency } = body

    // Validate input
    if (!country || !currency || assets < 0 || debts < 0) {
      return NextResponse.json({ error: "Invalid input parameters" }, { status: 400 })
    }

    const netAssets = assets - debts
    const nisabThreshold = nisabValues[currency] || 0
    const nisabStatus: "above" | "below" = netAssets >= nisabThreshold ? "above" : "below"

    // Calculate zakat (2.5% if above nisab)
    const zakatAmount = nisabStatus === "above" ? netAssets * 0.025 : 0
    const zakatTokens = zakatAmount * (tokenRates[currency] || 1)

    const result: ZakatResult = {
      nisabThreshold,
      netAssets,
      nisabStatus,
      zakatAmount,
      zakatTokens,
      currency,
      currencySymbol: currencySymbols[currency] || currency,
    }

    // Log calculation for analytics
    console.log("Zakat calculation:", {
      timestamp: new Date().toISOString(),
      country,
      currency,
      netAssets,
      zakatAmount,
      nisabStatus,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error calculating zakat:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
