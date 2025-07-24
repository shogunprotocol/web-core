'use client';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Tooltip,
} from '@nextui-org/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../lunar/Button';
import {
  useAccount,
  useWriteContract,
  usePublicClient,
  useReadContract,
} from 'wagmi';
import { erc20Abi, parseUnits, formatUnits } from 'viem';
import { useToast } from '../../hooks/use-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CONTRACT_ADDRESS, USDC_ADDRESS, VAULT_ABI } from '../../constants';
import AnimatedViewer from '../AnimatedViewer';
import { SpotlightCard } from '../lunar/SpotlightCard';
import { GridPattern } from '../lunar/GridPattern';

const strategies = [
  {
    name: 'deBridge',
    description: 'Cross-chain bridging from CoreDao to Arbitrum for Aave yield',
    icon: 'Bridge',
    details:
      'Secure cross-chain asset transfer to access higher Aave yields on Arbitrum',
    status: 'Active',
    protocol: 'CoreDao to Arbitrum',
  },
  {
    name: 'Beefy Finance',
    description: 'Auto-compounding yield optimizer across multiple protocols',
    icon: 'Beefy',
    details:
      'Automated yield compounding to maximize returns with minimal gas costs',
    status: 'Active',
    protocol: 'Beefy',
  },
  {
    name: 'Silo Finance',
    description: 'Isolated lending markets with optimized risk management',
    icon: 'Silo',
    details: 'AI-driven position management for maximum capital efficiency',
    status: 'Active',
    protocol: 'Silo',
  },
];

interface StyledTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'deposit' | 'withdraw';
}

const StyledTransactionModal = ({
  isOpen,
  onClose,
  type = 'deposit',
}: StyledTransactionModalProps) => {
  const { address: userAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStrategies, setShowStrategies] = useState(false);
  const { toast } = useToast();

  // Add both success and error sound refs
  const successAudioRef = useRef(new Audio('/audio/samurai-sword.mp3'));
  const errorAudioRef = useRef(new Audio('/audio/error.mp3'));

  // Contract read hooks for balances
  const { data: userBalance, refetch: refetchUserBalance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'balanceOf',
    args: [userAddress as `0x${string}`],
  });

  const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'totalAssets',
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    if (!amount || isLoading) return;

    try {
      setIsLoading(true);
      const parsedAmount = parseUnits(amount, 6);

      if (type === 'deposit') {
        // First approve USDC spending
        const approveTxHash = await writeContractAsync({
          address: USDC_ADDRESS as `0x${string}`,
          abi: erc20Abi,
          functionName: 'approve',
          args: [CONTRACT_ADDRESS as `0x${string}`, parsedAmount],
        });

        await publicClient?.waitForTransactionReceipt({
          hash: approveTxHash,
        });

        const txHash = await writeContractAsync({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: VAULT_ABI,
          functionName: 'deposit',
          args: [parsedAmount],
        });

        await publicClient?.waitForTransactionReceipt({ hash: txHash });
        successAudioRef.current.play();

        toast({
          title: 'Deposit Successful',
          description: `${amount} USDC successfully powered up`,
          variant: 'success',
        });
      } else {
        const txHash = await writeContractAsync({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: VAULT_ABI,
          functionName: 'withdraw',
          args: [parsedAmount],
        });

        await publicClient?.waitForTransactionReceipt({ hash: txHash });
        successAudioRef.current.play();

        toast({
          title: 'Withdrawal Successful',
          description: `${amount} USDC successfully withdrawn`,
          variant: 'success',
        });
      }

      await Promise.all([refetchUserBalance(), refetchTotalAssets()]);

      setAmount('');
      onClose();
    } catch (error: any) {
      console.error(error);
      errorAudioRef.current.play();

      if (
        error.message?.includes('User rejected') ||
        error.message?.includes('User denied')
      ) {
        toast({
          title: 'Transaction Cancelled',
          description: 'You rejected the transaction',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Transaction Failed',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      Promise.all([refetchUserBalance(), refetchTotalAssets()]);
    }
  }, [isOpen, refetchUserBalance, refetchTotalAssets]);

  const gridBlocks = [
    [2, 5],
    [3, 1],
    [4, 3],
  ];

  if (!userAddress) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="bg-transparent"
        size="3xl"
        backdrop="blur"
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900/90 to-zinc-900/50 backdrop-blur-md',
        }}
      >
        <ModalContent className="bg-transparent border-0 overflow-visible">
          <div className="relative overflow-visible">
            {/* 3D Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <AnimatedViewer />
            </div>

            {/* Modal Content */}
            <SpotlightCard
              from="#1cd1c6"
              size={400}
              className="relative mx-auto w-full max-w-lg rounded-[--radius] bg-zinc-900/95 backdrop-blur-xl p-8 [--radius:theme(borderRadius.2xl)] z-10"
            >
              <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex items-center text-white uppercase hover:text-basement-cyan font-basement z-50 transition-colors duration-200"
              >
                Close | X
              </button>

              <div className="relative">
                <ModalHeader className="flex flex-col gap-1 font-basement text-basement-cyan pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">Join the Ronin Council</span>
                  </div>
                </ModalHeader>

                <ModalBody className="flex flex-col items-center justify-center py-8">
                  <h3 className="text-2xl font-basement text-white mb-6">
                    Connect Your Wallet
                  </h3>

                  <div className="w-full flex justify-center mb-8">
                    <div className="transform hover:scale-105 transition-transform duration-200">
                      <ConnectButton chainStatus="icon" showBalance={false} />
                    </div>
                  </div>

                  <div className="space-y-4 w-full">
                    <p className="text-gray-400 text-center text-sm">
                      Join the future of DeFi. Access AI-powered yield
                      optimization and start earning smarter returns.
                    </p>

                    <div className="bg-gradient-to-r from-basement-cyan/5 to-transparent border border-basement-cyan/20 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-basement-cyan/10 text-sm font-bold text-basement-cyan">
                          AI
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            <span className="text-basement-cyan font-bold">
                              AI Advantage:
                            </span>{' '}
                            Our AI automatically manages your position across
                            multiple strategies for optimal yields.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {strategies.map((strategy, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center hover:border-basement-cyan/50 transition-colors duration-200"
                        >
                          <span className="text-xs font-bold text-basement-cyan mb-2">
                            {strategy.icon}
                          </span>
                          <span className="text-xs text-gray-400">
                            {strategy.protocol}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ModalBody>
              </div>
            </SpotlightCard>
          </div>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="full"
      onClose={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeIn' },
          },
        },
      }}
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900/90 to-zinc-900/50 backdrop-blur-md',
      }}
      className="bg-transparent"
    >
      <ModalContent className="bg-transparent border-0 overflow-visible">
        <div className="relative w-full h-screen overflow-visible">
          {/* 3D Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <AnimatedViewer />
          </div>

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex items-center justify-center h-full py-8 px-4"
          >
            <SpotlightCard
              from="#1cd1c6"
              size={400}
              className="relative mx-auto w-full max-w-xl rounded-[--radius] bg-zinc-900/95 backdrop-blur-xl p-8 [--radius:theme(borderRadius.2xl)]"
            >
              <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

              <GridPattern
                size={64}
                offsetX={0}
                offsetY={0}
                className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]"
              >
                {gridBlocks.map(([row, column], index) => (
                  <GridPattern.Block
                    key={index}
                    row={row}
                    column={column}
                    className="fill-white/2.5 transition duration-500 hover:fill-white/5"
                  />
                ))}
              </GridPattern>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex items-center text-white uppercase hover:text-basement-cyan font-basement z-50 transition-colors duration-200"
              >
                Close | X
              </button>

              <div className="relative">
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-basement-cyan/10 text-sm font-bold text-basement-cyan">
                      {type === 'deposit' ? 'DEPOSIT' : 'WITHDRAW'}
                    </div>
                    <div>
                      <h2 className="font-basement text-basement-cyan text-2xl">
                        {type === 'deposit'
                          ? 'Power Up Your Assets'
                          : 'Strategic Withdraw'}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {type === 'deposit'
                          ? 'Your funds will be optimally distributed by our AI'
                          : 'Withdraw your optimized assets'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Tooltip content="Your current share of the vault's total assets">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 cursor-help transition-all duration-200 hover:border-basement-cyan/50">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-gray-400">Your Position</p>
                          <div className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <span className="text-xs text-green-400">
                              Active
                            </span>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-basement-cyan font-basement">
                          {userBalance
                            ? formatUnits(userBalance as bigint, 6)
                            : '0'}{' '}
                          shares
                        </p>
                      </div>
                    </Tooltip>

                    <Tooltip content="Total value locked in the vault">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 cursor-help transition-all duration-200 hover:border-basement-cyan/50">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-gray-400">Vault TVL</p>
                          <div className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                            <span className="text-xs text-purple-400">
                              Growing
                            </span>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-basement-cyan font-basement">
                          {totalAssets
                            ? formatUnits(totalAssets as bigint, 6)
                            : '0'}{' '}
                          USDC
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                </ModalHeader>

                <ModalBody className="font-aeonik text-white">
                  <div className="relative">
                    <Input
                      autoFocus
                      type="number"
                      label={`${type === 'deposit' ? 'Deposit' : 'Withdraw'} Amount`}
                      placeholder="Enter amount in USDC"
                      variant="bordered"
                      value={amount}
                      onChange={handleAmountChange}
                      classNames={{
                        label: 'text-xs font-basement text-basement-cyan pb-8',
                        input: 'bg-white/5',
                        inputWrapper:
                          'border-white/10 hover:border-basement-cyan/50 transition-colors duration-200',
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 p-3 bg-white/5 hover:bg-white/10 text-basement-cyan font-basement group transition-all duration-200 rounded-lg border border-white/10 hover:border-basement-cyan/50"
                    onClick={() => setShowStrategies(!showStrategies)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className={`transform transition-transform duration-200 ${showStrategies ? 'rotate-180' : ''}`}
                      >
                        ▼
                      </span>
                      AI Strategy Overview
                      <span className="text-xs text-gray-500 ml-2 group-hover:text-basement-cyan">
                        {showStrategies ? 'Hide Details' : 'View Details'}
                      </span>
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {showStrategies && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-3 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-3">
                          {strategies.map((strategy, index) => (
                            <motion.div
                              key={strategy.name}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-200 hover:border-basement-cyan/20"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-white/5 text-xs font-bold text-basement-cyan shrink-0">
                                  <span>{strategy.icon}</span>
                                </div>
                                <div>
                                  <h3 className="font-basement text-basement-cyan flex items-center gap-2">
                                    {strategy.name}
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                                      {strategy.status}
                                    </span>
                                  </h3>
                                  <p className="text-xs text-gray-500">
                                    {strategy.protocol}
                                  </p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400">
                                {strategy.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/10">
                                {strategy.details}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        <div className="p-3 rounded-lg bg-gradient-to-r from-basement-cyan/5 to-transparent border border-basement-cyan/20">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-basement-cyan/10 text-sm font-bold text-basement-cyan shrink-0">
                              AI
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">
                                <span className="text-basement-cyan font-bold">
                                  AI Security Guarantee:
                                </span>{' '}
                                Your assets never leave our secure smart
                                contracts.
                              </p>
                              <p className="text-xs text-gray-500">
                                The AI only optimizes allocation between vetted
                                strategies while maintaining full asset
                                security.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ModalBody>

                <ModalFooter>
                  <Button
                    text={
                      isLoading
                        ? `${type === 'deposit' ? 'Processing...' : 'Processing...'}`
                        : `${type === 'deposit' ? 'Deposit' : 'Strategic Withdraw'}`
                    }
                    onClick={!amount || isLoading ? undefined : handleSubmit}
                  />
                </ModalFooter>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default StyledTransactionModal;
