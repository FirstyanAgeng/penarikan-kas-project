import React from 'react';
import { useSelector } from 'react-redux';

function PaymentMethodsModal({ isOpen, onClose, onSelectPayment, amount }) {
  if (!isOpen) return null;

  const settings = useSelector(state => state.settings);
  const paymentMethods = Object.values(settings.paymentMethods).filter(method => method.enabled);

  const handleSelectPayment = (method, option) => {
    if (method.id === 'cash') {
      // For cash payments, we don't need account details
      onSelectPayment({
        methodId: method.id,
        methodName: method.name,
        optionId: 'cash',
        optionName: 'Pembayaran Tunai',
        status: 'pending' // Cash payments need verification
      });
    } else {
      // For other payment methods
      onSelectPayment({
        methodId: method.id,
        methodName: method.name,
        optionId: option.id,
        optionName: option.name,
        accountNumber: option.accountNumber,
        status: 'verified' // Non-cash payments are auto-verified
      });
    }
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
          {/* Cash Payment Option - Always First */}
          <div className="border rounded-lg p-4 bg-green-50">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">💵</span>
              <h3 className="text-lg font-semibold">Tunai</h3>
            </div>
            <button
              onClick={() => handleSelectPayment(settings.paymentMethods.cash, null)}
              className="flex items-center justify-between w-full p-3 text-left border rounded-lg bg-white hover:bg-purple-50 transition-colors"
            >
              <div>
                <span className="font-medium">Pembayaran Tunai</span>
                <p className="text-sm text-gray-500">Pembayaran langsung ke bendahara</p>
              </div>
              <span className="text-gray-500">→</span>
            </button>
          </div>

          {/* Other Payment Methods */}
          {paymentMethods.filter(method => method.id !== 'cash').map((method) => (
            <div key={method.id} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{method.icon}</span>
                <h3 className="text-lg font-semibold">{method.name}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {method.options.filter(opt => opt.enabled).map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectPayment(method, option)}
                    className="flex items-center justify-between w-full p-3 text-left border rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <div>
                      <span className="font-medium">{option.name}</span>
                      {option.accountNumber && (
                        <p className="text-sm text-gray-500">{option.accountNumber}</p>
                      )}
                    </div>
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