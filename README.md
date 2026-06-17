## Barcode Product Verification

This project is a decentralized product authentication system designed to combat counterfeit products using blockchain technology. Manufacturers can securely register products through MetaMask, and product information is stored on the blockchain using smart contracts. Each registered product is assigned a unique QR code that can be scanned by consumers for authenticity verification.

When a consumer scans the QR code or enters the product ID, the system retrieves product details from the blockchain and verifies whether the product is genuine or fake. By leveraging blockchain's immutability and transparency, the system ensures secure, tamper-proof, and trustworthy product verification.

## Technology Stack

Solidity
Hardhat
Ethers.js
MetaMask
HTML, CSS, JavaScript
QR Code Library

##Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kamaleswari-M/Barcode-Product.git

   cd Fake_Products
   ```

2.Open a terminal
  ```bash
  npx hardhat node
  ```
Keep this terminal open

3.Open a new terminal
  ```bash
  npx hardhat compile

  npx hardhat run scripts/deploy.ts --network localhost
  ```
You will get something like

Deploying contract with account: 0x...
Contract deployed to: 0x...

Repplace the old address with new address in frontend/app.js

## Run the frontend

## In VS Code:

Right-click frontend/role.html
Open with Live Server
MetaMask

Make sure:

Network = Hardhat Localhost (8545)
Account = your imported Hardhat account

<img width="1536" height="770" alt="Screenshot 2026-06-16 220417" src="https://github.com/user-attachments/assets/b4fff43e-7336-448e-bf35-7363f961696b" />







