# Proof of Skill Badge

A decentralized application (dApp) that allows users to connect their Stellar wallet using Freighter and issue digital skill badges. 

## Features
- **Wallet Connection:** Connects securely using the Freighter Wallet extension for Stellar.
- **Issue Badges:** Users can create custom digital skill badges specifying the skill name and issuer.
- **Share Badges:** Transfer certificates to another wallet securely using Freighter on-chain signatures.
- **Dashboard:** View all issued badges linked to your wallet address.
- **Data Persistence:** Badges are stored locally based on your wallet address.
- **Modern UI:** Professional Web3 design with dark theme, gradient accents, and smooth animations.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** CSS (Custom variables, modern layout)
- **Web3:** `@stellar/freighter-api`, `@stellar/stellar-sdk`
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

## Screenshots
*(Save your images into the `screenshots` folder to display them here)*
- **Landing Page:** <img width="1873" height="902" alt="Screenshot 2026-04-25 213526" src="https://github.com/user-attachments/assets/0d73a692-dd3e-4646-b573-0ba4358ff9fd" />

- **Dashboard:** <img width="1863" height="900" alt="Screenshot 2026-04-25 213550" src="https://github.com/user-attachments/assets/a56cff31-7dcb-40c9-99a4-2bc5cbc7204d" />

- **Share Prompt:** <img width="566" height="463" alt="Screenshot 2026-04-25 213637" src="https://github.com/user-attachments/assets/7cbcc3af-1d6d-46af-b6e8-0a433646b830" />

- **Confirm Transaction:** <img width="1858" height="897" alt="Screenshot 2026-04-25 213757" src="https://github.com/user-attachments/assets/d1cdb3c7-1465-4f48-af3b-bf62ea99824c" />


## Usage
1. Click **Connect Wallet to Start** on the landing page.
2. Approve the connection request in your Freighter wallet extension.
3. On the dashboard, fill in the "Skill Name", "Category", and "Issuer Identity".
4. Click **Mint Badge**. The badge will be added to your profile and you will see it in your portfolio.
5. Click **Share Badge** to securely transfer a badge to another person's wallet address.

## Project Submission Links
- **Live Demo:** [http://localhost:5175/]
- **Demo Video:** []

