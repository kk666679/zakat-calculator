// Node.js API Client Example for Zakat Calculator
// This demonstrates how to integrate with the Zakat Calculator API

const fetch = require("node-fetch")

class ZakatCalculatorAPI {
  constructor(baseURL = "https://api.zakatcalculator.asean/v1", apiKey = null) {
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  async calculateZakat(country, assets, debts, currency) {
    try {
      const response = await fetch(`${this.baseURL}/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify({
          country,
          assets,
          debts,
          currency,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error calculating zakat:", error)
      throw error
    }
  }

  async payZakat(amount, currency, charityId, userToken) {
    try {
      const response = await fetch(`${this.baseURL}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          charity_id: charityId,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error processing payment:", error)
      throw error
    }
  }

  async getCurrentNisab(currency) {
    try {
      const response = await fetch(`${this.baseURL}/nisab/${currency}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error fetching nisab:", error)
      throw error
    }
  }

  async getCharityOrganizations(country) {
    try {
      const response = await fetch(`${this.baseURL}/charities?country=${country}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error fetching charities:", error)
      throw error
    }
  }
}

// Example usage
async function demonstrateAPI() {
  const api = new ZakatCalculatorAPI()

  try {
    // Example 1: Calculate zakat for Malaysian user
    console.log("=== Calculating Zakat for Malaysia ===")
    const malaysianCalculation = await api.calculateZakat("MY", 50000, 5000, "MYR")
    console.log("Malaysian Calculation Result:", malaysianCalculation)

    // Example 2: Calculate zakat for Singapore user
    console.log("\n=== Calculating Zakat for Singapore ===")
    const singaporeCalculation = await api.calculateZakat("SG", 15000, 2000, "SGD")
    console.log("Singapore Calculation Result:", singaporeCalculation)

    // Example 3: Get current nisab for Indonesia
    console.log("\n=== Getting Current Nisab for Indonesia ===")
    const indonesiaNisab = await api.getCurrentNisab("IDR")
    console.log("Indonesia Nisab:", indonesiaNisab)

    // Example 4: Get charity organizations for Thailand
    console.log("\n=== Getting Charity Organizations for Thailand ===")
    const thailandCharities = await api.getCharityOrganizations("TH")
    console.log("Thailand Charities:", thailandCharities)

    // Example 5: Process payment (requires user token)
    console.log("\n=== Processing Zakat Payment ===")
    const userToken = "user_jwt_token_here" // This would come from user authentication

    if (malaysianCalculation.zakat_payable > 0) {
      const payment = await api.payZakat(malaysianCalculation.zakat_payable, "MYR", "JAKIM-001", userToken)
      console.log("Payment Result:", payment)
    }
  } catch (error) {
    console.error("API demonstration failed:", error)
  }
}

// Wallet Integration Example
class CryptoWalletIntegration {
  constructor(walletProvider, zakatAPI) {
    this.wallet = walletProvider
    this.zakatAPI = zakatAPI
  }

  async getWalletBalance() {
    // This would integrate with actual wallet APIs
    // Example for MetaMask or other Web3 wallets
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        // Convert from Wei to Ether
        const balanceInEth = Number.parseInt(balance, 16) / Math.pow(10, 18)
        return balanceInEth
      }
    } catch (error) {
      console.error("Error getting wallet balance:", error)
      return 0
    }
  }

  async calculateZakatFromWallet(country, currency, exchangeRate) {
    try {
      const cryptoBalance = await this.getWalletBalance()
      const fiatValue = cryptoBalance * exchangeRate

      const calculation = await this.zakatAPI.calculateZakat(
        country,
        fiatValue,
        0, // Assuming no debts for simplicity
        currency,
      )

      return {
        cryptoBalance,
        fiatValue,
        ...calculation,
      }
    } catch (error) {
      console.error("Error calculating zakat from wallet:", error)
      throw error
    }
  }

  async payZakatFromWallet(amount, charityWalletAddress) {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })

        const transactionParameters = {
          to: charityWalletAddress,
          from: accounts[0],
          value: (amount * Math.pow(10, 18)).toString(16), // Convert to Wei
        }

        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })

        return { transactionHash: txHash, status: "pending" }
      }
    } catch (error) {
      console.error("Error sending crypto payment:", error)
      throw error
    }
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ZakatCalculatorAPI, CryptoWalletIntegration }
}

// Run demonstration if this file is executed directly
if (require.main === module) {
  demonstrateAPI()
}
