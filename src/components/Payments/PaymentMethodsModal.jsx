import React from 'react';

const paymentMethods = [
  {
    id: 'cash',
    name: 'Tunai',
    icon: '💵',
    options: [
      { id: 'cash', name: 'Pembayaran Tunai', accountNumber: '-' }
    ]
  },
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    icon: '🏦',
    options: [
      { id: 'bca', name: 'BCA', accountNumber: '1234567890' },
      { id: 'mandiri', name: 'Mandiri', accountNumber: '0987654321' },
      { id: 'bni', name: 'BNI', accountNumber: '1122334455' }
    ]
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    icon: '📱',
    options: [
      { id: 'gopay', name: 'GoPay', accountNumber: '081234567890' },
      { id: 'ovo', name: 'OVO', accountNumber: '081234567890' },
      { id: 'dana', name: 'DANA', accountNumber: '081234567890' }
    ]
  },
  {
    id: 'qris',
    name: 'QRIS',
    icon: '📲',
    options: [
      { id: 'qris', name: 'Scan QRIS', accountNumber: 'ID1020304050' }
    ]
  }
];

function PaymentMethodsModal({ isOpen, onClose, onSelectPayment, amount }) {
  if (!isOpen) return null;

  const handleSelectPayment = (method, option) => {
    onSelectPayment({
      methodId: method.id,
      methodName: method.name,
      optionId: option.id,
      optionName: option.name,
      accountNumber: option.accountNumber
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Pilih Metode Pembayaran</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">Total Pembayaran:</p>
          <p className="text-2xl font-bold text-purple-600">
            Rp {parseInt(amount).toLocaleString('id-ID')}
          </p>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{method.icon}</span>
                <h3 className="text-lg font-semibold">{method.name}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {method.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectPayment(method, option)}
                    className="flex items-center justify-between w-full p-3 text-left border rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <span className="font-medium">{option.name}</span>
                    <span className="text-gray-500">→</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodsModal; 