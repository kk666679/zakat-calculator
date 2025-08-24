# Zakat Crypto

A modern decentralized application (dApp) for calculating and fulfilling zakat obligations on cryptocurrency holdings across multiple blockchains. Built with the latest Web3 technologies, Zakat Crypto provides a transparent, secure, and user-friendly platform for Muslims to manage their zakat calculations and payments.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js Version](https://img.shields.io/badge/node-22%2B-green)
![Next.js](https://img.shields.io/badge/Next.js-15-blue)
![Web3](https://img.shields.io/badge/Web3-Enabled-brightgreen)
![Multi-Chain](https://img.shields.io/badge/Multi--Chain-8A2BE2)
![TypeScript](https://img.shields.io/badge/TypeScript-Full%20Support-3178C6)

## 📋 Table of Contents

- [Zakat Crypto](#zakat-crypto)
  - [🌟 Highlights](#-highlights)
  - [🚨 Important Notice](#-important-notice)
  - [📋 Table of Contents](#-table-of-contents)
  - [🏗️ System Architecture](#️-system-architecture)
  - [🚀 Quick Start](#-quick-start)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [⚙️ Configuration](#️-configuration)
  - [🛠️ Technology Stack](#️-technology-stack)
  - [⛓️ Cross-Chain Functionality](#️-cross-chain-functionality)
  - [📡 API Reference](#-api-reference)
    - [Calculate Zakat](#calculate-zakat)
    - [Process Payment](#process-payment)
    - [Cross-Chain Operations](#cross-chain-operations)
  - [🔗 Supported Networks](#-supported-networks)
  - [🌍 Deployment](#-deployment)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [📜 Code of Conduct](#-code-of-conduct)
  - [💬 Support](#-support)

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Frontend
        UI[Next.js 15 UI]
        WC[WalletConnect v2]
        ZC[Zakat Calculator]
        CCUI[Cross-Chain UI]
    end
    
    subgraph Backend [Backend - Node.js 22]
        API[Node.js API]
        DB[(PostgreSQL Neon)]
        CC[Cross-Chain Service]
        OR[Offchain Resolver]
    end
    
    subgraph Blockchain Layer
        SC[Smart Contracts]
        PM[Payment Processor]
        TC[Transaction Certificates]
        BR[Bridge Router]
    end
    
    subgraph Networks
        POL[Polygon]
        BAS[Base]
        ARB[Arbitrum]
        OPT[Optimism]
        ZKEVM[Polygon zkEVM]
    end
    
    UI --> API
    UI --> WC
    WC --> SC
    API --> DB
    API --> SC
    API --> CC
    CC --> BR
    BR --> POL
    BR --> BAS
    BR --> ARB
    BR --> OPT
    BR --> ZKEVM
    SC --> PM
    PM --> TC
    CC --> OR
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js v22** or higher
- **Yarn** (v1.22+ recommended) or **npm** (v10+)
- **Web3 wallet** (MetaMask, Rabby, or WalletConnect compatible)
- **PostgreSQL database** ([Neon.tech](https://neon.tech) recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/zakat-crypto.git
cd zakat-crypto

# Install dependencies using Node.js 22
nvm use 22 # if using nvm
yarn install

# Set up environment variables
cp .env.example .env.local

# Generate cryptographic keys for cross-chain operations
yarn generate:keys

# Start development server
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to access the application.

## ⚙️ Configuration

Update `.env.local` with your configuration:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# RPC Providers
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_INFURA_ID=your_infura_project_id
NEXT_PUBLIC_QUICKNODE_API_KEY=your_quicknode_api_key

# Cross-Chain Configuration
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_SUPPORTED_CHAINS=137,8453,42161,10,1101
NEXT_PUBLIC_CROSS_CHAIN_BRIDGE_ADDRESS=0x...

# Security
JWT_SECRET=your_jwt_secret_here
CROSS_CHAIN_PRIVATE_KEY=your_cross_chain_private_key

# External APIs
NISAB_API_KEY=your_nisab_api_key
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
```

## 🛠️ Technology Stack

| Component               | Technology                                    |
|-------------------------|-----------------------------------------------|
| **Frontend**            | Next.js 15, React 18, TypeScript              |
| **Web3 Integration**    | Wagmi 2.x, RainbowKit 2.x, WalletConnect v2   |
| **Backend**             | Node.js 22, Express.js, TypeScript            |
| **Database**            | PostgreSQL (Neon serverless)                  |
| **Blockchain**          | Solidity 0.8.x, Hardhat                       |
| **Cross-Chain**         | LayerZero, Wormhole, CCIP                     |
| **Deployment**          | Vercel (Frontend), Railway (Backend)          |

## ⛓️ Cross-Chain Functionality

Zakat Crypto implements advanced cross-chain capabilities using the latest protocols:

### Key Features:
- **Multi-Chain Zakat Payments**: Pay zakat on any supported network
- **Cross-Chain Asset Swaps**: Convert assets between chains for optimal zakat payment
- **Unified Certificate System**: Zakat certificates are minted on all supported chains
- **Gas Optimization**: Automatic gas estimation across chains
- **Chain-Agnostic API**: Consistent experience regardless of chain

### Supported Cross-Chain Protocols:
1. **LayerZero** - For omnichain contracts and messaging
2. **Wormhole** - For token bridging and cross-chain transfers
3. **Chainlink CCIP** - For secure cross-chain communication
4. **SocketDL** - For liquidity routing across chains

## 📡 API Reference

### Calculate Zakat

```http
POST /api/calculate-zakat
Content-Type: application/json

{
  "country": "MY",
  "assets": 50000,
  "debts": 5000,
  "currency": "MYR",
  "preferredChain": 137
}
```

**Response:**
```json
{
  "nisabThreshold": 21500,
  "netAssets": 45000,
  "nisabStatus": "above",
  "zakatAmount": 1125,
  "zakatTokens": 112500,
  "currency": "MYR",
  "currencySymbol": "RM",
  "recommendedChains": [137, 8453, 42161],
  "gasEstimates": {
    "137": "0.0012 MATIC",
    "8453": "0.0008 ETH",
    "42161": "0.0005 ETH"
  }
}
```

### Process Payment

```http
POST /api/pay-zakat
Content-Type: application/json

{
  "amount": 1125,
  "currency": "MYR",
  "charityId": "JAKIM-001",
  "userToken": "user_jwt_token_here",
  "sourceChain": 137,
  "targetChain": 8453
}
```

**Response:**
```json
{
  "paymentId": "zkt2025-abc123",
  "status": "bridging",
  "sourceTransaction": "0xabcdef1234567890abcdef1234567890abcdef12",
  "bridgeTransaction": "0x1234567890abcdef1234567890abcdef12345678",
  "targetTransaction": "pending",
  "zakatCertificateUrl": "https://certificates.zakatcrypto.com/zkt2024-abc123.pdf",
  "crossChainStatus": {
    "sourceConfirmed": true,
    "bridgeInProgress": true,
    "targetPending": true
  },
  "timestamp": "2025-01-15T12:00:00Z"
}
```

### Cross-Chain Operations

```http
POST /api/cross-chain/quote
Content-Type: application/json

{
  "fromChain": 137,
  "toChain": 8453,
  "tokenIn": "MATIC",
  "tokenOut": "ETH",
  "amountIn": "1.5"
}
```

**Response:**
```json
{
  "quoteId": "quote_abc123",
  "amountOut": "0.0024",
  "processingTime": "120",
  "fee": "0.0005",
  "route": [
    {
      "protocol": "SocketDL",
      "steps": [
        {"action": "Swap", "protocol": "UniswapV3", "pool": "MATIC/USDC"},
        {"action": "Bridge", "protocol": "Socket", "bridge": "Polygon->Base"},
        {"action": "Swap", "protocol": "UniswapV3", "pool": "USDC/ETH"}
      ]
    }
  ],
  "expiry": "2025-01-15T12:05:00Z"
}
```

## 🔗 Supported Networks

| Network | Chain ID | Native Token | Status | Cross-Chain Support |
|---------|----------|--------------|--------|---------------------|
| Polygon | 137 | MATIC | ✅ Live | ✅ Full |
| Base | 8453 | ETH | ✅ Live | ✅ Full |
| Arbitrum One | 42161 | ETH | ✅ Live | ✅ Full |
| Optimism | 10 | ETH | 🔄 Testing | ✅ Full |
| Polygon zkEVM | 1101 | ETH | 🔄 Testing | ✅ Full |
| BNB Chain | 56 | BNB | 🚧 Planned | 🚧 Partial |

## 🌍 Deployment

### Frontend Deployment (Vercel)
```bash
# Build and deploy to Vercel
yarn build
vercel --prod
```

### Backend Deployment (Railway)
```bash
# Deploy backend to Railway
railway up
```

### Smart Contract Deployment
```bash
# Deploy to all supported networks
npx hardhat deploy --network polygon
npx hardhat deploy --network base
npx hardhat deploy --network arbitrum
# ... additional networks
```

## 🤝 Contributing

We welcome contributions from the community! Please review our contributing guidelines before submitting:

- 🐛 Report bugs via GitHub Issues
- 💡 Suggest new features or enhancements
- 📝 Improve documentation
- 🔧 Submit pull requests for bug fixes or features
- ⛓️ Help with cross-chain integrations

See our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

## 📜 Code of Conduct

We are committed to fostering an inclusive and respectful community. All contributors and participants are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## 💬 Support

For technical support, please open a GitHub issue. For questions about zakat calculations or religious guidance, please consult with qualified Islamic scholars at recognized religious authorities.

---

**Disclaimer**: Zakat Crypto provides computational tools for educational purposes only. Users are responsible for verifying all calculations with qualified religious authorities before making zakat payments. Cross-chain transactions may involve additional risks including bridge risks, liquidity risks, and smart contract risks.
