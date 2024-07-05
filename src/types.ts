export interface Transaction {
    to: string;
    value: string;
    data?: string;
  }
  
  export interface WalletInfo {
    address: string;
    balance: string;
  }