const express = require("express");
const app = express();
const ethers = require("ethers");
const cors = require("cors");
const abi = require("./ERC20_ABI.json");

const address = "0x6aa217312960a21adbde1478dc8cbcf828110a67";
const bscProvider = new ethers.providers.JsonRpcProvider(
  "https://delicate-holy-sea.bsc.quiknode.pro/805724f094ab3267a2c7f380c5948052738576b9/"
);
const contract = new ethers.Contract(address, abi, bscProvider);

app.use(cors());

app.get("/totalSupply", async (req, res) => {
  let totalSupply = await contract.totalSupply();
  res.send(ethers.utils.formatEther(totalSupply));
});

app.get("/circSupply", async (req, res) => {
  let totalSupply = await contract.balanceOf("0x89c68051543Fa135B31c2CE7BD8Cdf392345FF01");
  res.send(ethers.utils.formatEther(totalSupply));
});
app.listen(80, () => {
  console.log("listening on port 80");
});
