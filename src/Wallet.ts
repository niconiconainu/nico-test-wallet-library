import { ethers } from 'ethers';
import { Transaction, WalletInfo } from './types';
import { formatBalance, parseEther } from './utils';

export class Wallet {
  private provider: ethers.BrowserProvider;
  private signer: ethers.Signer | null;

  constructor(provider: ethers.BrowserProvider) {
    this.provider = provider;
    this.signer = null;  // 初期値として null を設定
  }

  async initialize(): Promise<void> {
    this.signer = await this.provider.getSigner();
  }

  private ensureInitialized(): void {
    if (!this.signer) {
      throw new Error('Wallet is not initialized. Call initialize() first.');
    }
  }

  async getInfo(): Promise<WalletInfo> {
    this.ensureInitialized();
    const address = await this.signer!.getAddress();
    const balance = await this.provider.getBalance(address);
    return {
      address,
      balance: formatBalance(balance),
    };
  }

  async sendTransaction(transaction: Transaction): Promise<string> {
    this.ensureInitialized();
    const tx = await this.signer!.sendTransaction({
      to: transaction.to,
      value: parseEther(transaction.value),
      data: transaction.data,
    });
    return tx.hash;
  }

  async signMessage(message: string): Promise<string> {
    this.ensureInitialized();
    return await this.signer!.signMessage(message);
  }
}