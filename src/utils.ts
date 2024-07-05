import { ethers } from 'ethers';

export const formatBalance = (balance: bigint): string => {
  return ethers.formatEther(balance);
};

export const parseEther = (amount: string): bigint => {
  return ethers.parseEther(amount);
};