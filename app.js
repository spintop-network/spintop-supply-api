const express = require("express");
const app = express();
const ethers = require("ethers");
const cors = require("cors");
const abi = require("./ERC20_ABI.json");

const address = "0x6aa217312960a21adbde1478dc8cbcf828110a67";
const bscProvider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);
const contract = new ethers.Contract(address, abi, bscProvider);

app.use(cors());

app.get("/totalSupply", async (req, res) => {
  let totalSupply = await contract.totalSupply();
  res.send(ethers.utils.formatEther(totalSupply));
});

app.get("/circSupply", async (req, res) => {
  let totalSupply = await contract.CirculatingSupply();
  res.send(ethers.utils.formatEther(totalSupply));
});
app.listen(80, () => {
  console.log("listening on port 80");
});
