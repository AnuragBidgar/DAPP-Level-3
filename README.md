# Proof of Skill Badge

A decentralized application (dApp) that allows users to connect their Stellar wallet using Freighter and issue digital skill badges. 

## Features
- **Wallet Connection:** Connects securely using the Freighter Wallet extension for Stellar.
- **Issue Badges:** Users can create custom digital skill badges specifying the skill name and issuer.
- **Dashboard:** View all issued badges linked to your wallet address.
- **Data Persistence:** Badges are stored locally based on your wallet address.
- **Modern UI:** Professional Web3 design with dark theme, gradient accents, and smooth animations.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** CSS (Custom variables, modern layout)
- **Web3:** `@stellar/freighter-api`
- **Testing:** Vitest, React Testing Library
- **Icons:** Lucide React

## Setup Instructions

### 1. Install Freighter Wallet
To use this application, you need the Freighter wallet extension:
1. Visit [Freighter.app](https://freighter.app/)
2. Install the extension for your browser (Chrome/Firefox/Brave).
3. Create a new wallet or import an existing one.
4. Ensure you are connected to the Stellar Testnet/Mainnet.

### 2. Run the Application
1. Clone this repository or navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser (usually `http://localhost:5173`).

### 3. Run Tests
To run the automated tests:
```bash
npx vitest run
```

## Usage
1. Click **Connect Wallet to Start** on the landing page.
2. Approve the connection request in your Freighter wallet extension.
3. On the dashboard, fill in the "Skill Name", "Category", and "Issuer Identity".
4. Click **Mint Badge**. The badge will be added to your profile and you will see it in your portfolio.
