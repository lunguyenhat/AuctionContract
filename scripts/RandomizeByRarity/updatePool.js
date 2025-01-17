const { ethers, upgrades, hardhatArguments } = require('hardhat');
const { addresses: contractAddresses } = require('./proxyAddresses');

const { pe,fe,fu,pu, sleep } = require('../../utils');

async function main() {
  const [deployer] = await ethers.getSigners();

  const network = hardhatArguments.network;
  const contractAddress = contractAddresses[network];

  console.log("With the account:", deployer.address);
  console.log("With RandomizeByRarity address:", contractAddress);
  const beforeDeploy = fe(await deployer.getBalance());

  const RandomizeByRarity = await ethers.getContractAt("RandomizeByRarity",contractAddress);

  // TODO: Fill your poolId
  const poolId = 2; // 2 Auction Token
  const title = "Token Box - Auction";
  const rarity = [1000,10,10,3,3,3,2,2,2,1,1,1];
  const rarityIds = [1,2,3,4,5,6,7,8,9,10,11,12];

  await RandomizeByRarity.updatePool(poolId, title, rarity, rarityIds);
  console.log("updatePool "+poolId+" success");

  const afterDeploy = fe(await deployer.getBalance());
  console.log("Cost spent:", (beforeDeploy-afterDeploy));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });