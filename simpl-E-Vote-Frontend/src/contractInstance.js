import { ethers } from 'ethers';
import { ABI } from './Abi';
async function contractInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = '0xB9f1fDA4e09BE731b80F1A258a33a14dfbB9E216';
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  localStorage.setItem('nid', networkId);
  return { contract, networkId, signerAddress };
}

export default contractInstance;
