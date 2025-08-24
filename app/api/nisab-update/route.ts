import { type NextRequest, NextResponse } from "next/server"

interface NisabUpdateRequest {
  effectiveDate: string
  values: Record<string, number>
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.headers.get("x-secret")
    const expectedSecret = process.env.WEBHOOK_SECRET || "default-secret"

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid webhook secret" }, { status: 401 })
    }

    const body: NisabUpdateRequest = await request.json()
    const { effectiveDate, values } = body

    // Validate input
    if (!effectiveDate || !values || Object.keys(values).length === 0) {
      return NextResponse.json({ error: "Invalid nisab update data" }, { status: 400 })
    }

    // Log nisab update
    console.log("Nisab values updated:", {
      effectiveDate,
      values,
      timestamp: new Date().toISOString(),
    })

    // In a real implementation, you would update the database here
    // For now, we'll just acknowledge the update

    return NextResponse.json({
      success: true,
      message: "Nisab values updated successfully",
      effectiveDate,
      updatedCurrencies: Object.keys(values),
    })
  } catch (error) {
    console.error("Error updating nisab values:", error)
    return NextResponse.json({ error: "Failed to update nisab values" }, { status: 500 })
  }
}
