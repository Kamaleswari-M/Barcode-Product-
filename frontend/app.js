// ================== CONTRACT DETAILS ==================
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_id", "type": "string" },
      { "internalType": "string", "name": "_name", "type": "string" }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_id", "type": "string" }
    ],
    "name": "verifyProduct",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_id", "type": "string" }
    ],
    "name": "getProduct",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// ================== GLOBAL VARIABLES ==================
let contract;
let html5QrCode;

// ================== METAMASK CONNECTION ==================
async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  contract = new ethers.Contract(contractAddress, contractABI, signer);
  alert("MetaMask connected successfully!");
}

// ================== ADD PRODUCT (MANUFACTURER) ==================
async function addProduct() {
  if (!contract) {
    alert("Please connect MetaMask first");
    return;
  }

  const id = document.getElementById("addId").value;
  const name = document.getElementById("addName").value;

  if (!id || !name) {
    alert("Enter Product ID and Name");
    return;
  }

  try {
    const tx = await contract.addProduct(id, name);
    alert("Transaction submitted. Waiting for confirmation...");
    await tx.wait();

    alert("Product added successfully!");

    // Generate QR Code
    const qrDiv = document.getElementById("qrcode");
    if (qrDiv) {
      qrDiv.innerHTML = "";
      new QRCode(qrDiv, {
        text: id,
        width: 150,
        height: 150
      });
    }

  } catch (error) {
    console.error(error);
    alert("Transaction failed or rejected");
  }
}

// ================== VERIFY PRODUCT (CONSUMER) ==================
async function verifyProduct() {
 const id = document.getElementById("verifyId").value.trim();

  const resultBox = document.getElementById("result");

  if (!id) {
    alert("Enter Product ID");
    return;
  }

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const readContract = new ethers.Contract(contractAddress, contractABI, provider);

  try {
    const [name, exists] = await readContract.getProduct(id);

    if (exists) {
      resultBox.innerHTML = `
        <div class="genuine">
          🟢 Genuine Product<br>
          <strong>ID:</strong> ${id}<br>
          <strong>Name:</strong> ${name}
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="fake">
          🔴 Fake Product<br>
          Product not found on blockchain
        </div>
      `;
    }
  } catch (err) {
    console.error(err);
    alert("Error verifying product");
  }
}

// ================== QR SCAN (OPTIONAL / MAY BE BLOCKED) ==================
function startScan() {
  const reader = document.getElementById("reader");
  if (!reader) {
    alert("Scanner area not found");
    return;
  }

  reader.innerHTML = "";
  html5QrCode = new Html5Qrcode("reader");

  Html5Qrcode.getCameras().then(cameras => {
    if (!cameras || cameras.length === 0) {
      alert("No camera found");
      return;
    }

    html5QrCode.start(
      cameras[0].id,
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        document.getElementById("verifyId").value = decodedText.trim();

        html5QrCode.stop().then(() => {
          reader.innerHTML = "";
        });

        alert("QR Code scanned successfully!");
      }
    );
  }).catch(err => {
    console.error(err);
    alert("Camera permission denied or unavailable");
  });
}
