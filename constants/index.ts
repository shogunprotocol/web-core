export const USDC_ADDRESS = '0xb3a8f0f0da9ffc65318aa39e55079796093029ad';
export const CONTRACT_ADDRESS = '0x8fDE7A649c782c96e7f4D9D88490a7C5031F51a9';
export const VAULT_ABI = [
  {
    name: 'deposit',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'shares', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'totalAssets',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'getPoolAddress',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'poolName', type: 'string' }],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    name: 'getPoolBalance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'poolName', type: 'string' },
      { name: 'asset', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;
