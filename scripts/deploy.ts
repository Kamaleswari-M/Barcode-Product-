import { ethers } from "ethers";
import hardhat from "hardhat";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer = await provider.getSigner(0);

  console.log("Deploying contract with account:", await signer.getAddress());

  const artifact = await hardhat.artifacts.readArtifact("FakeProductDetection");

  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    signer
  );

  const contract = await factory.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
