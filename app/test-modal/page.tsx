'use client';

import { useState } from 'react';
import StyledTransactionModal from '@/components/modals/StyledTransactionModal';
import { Button } from '@/components/ui/button';

export default function TestModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw'>('deposit');

  const openModal = (type: 'deposit' | 'withdraw') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Vault Modal Test</h1>
        <p className="text-gray-400 mb-8">
          Test the new styled modal with 3D samurai renders
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => openModal('deposit')}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-3 transition-all duration-200 hover:scale-105"
        >
          Test Deposit Modal
        </Button>

        <Button
          onClick={() => openModal('withdraw')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-3 transition-all duration-200 hover:scale-105"
        >
          Test Withdraw Modal
        </Button>
      </div>

      <StyledTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
}
