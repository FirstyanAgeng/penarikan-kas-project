import React from 'react';

function PaymentInstructionsModal({ isOpen, onClose, paymentDetails, amount }) {
  if (!isOpen) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Berhasil disalin!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Instruksi Pembayaran</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <p className="text-gray-600 mb-1">Total Pembayaran:</p>
          <p className="text-2xl font-bold text-purple-600 mb-2">
            Rp {parseInt(amount).toLocaleString('id-ID')}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Metode Pembayaran:</p>
            <p className="font-medium">{paymentDetails.optionName}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">Nomor Rekening/Akun:</p>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <code className="font-mono text-lg">{paymentDetails.accountNumber}</code>
              <button
                onClick={() => copyToClipboard(paymentDetails.accountNumber)}
                className="text-purple-600 hover:text-purple-700"
              >
                📋 Salin
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-medium mb-3">Langkah Pembayaran:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {paymentDetails.methodId === 'bank_transfer' && (
                <>
                  <li>Buka aplikasi m-banking {paymentDetails.optionName}</li>
                  <li>Pilih menu Transfer</li>
                  <li>Masukkan nomor rekening tujuan</li>
                  <li>Masukkan nominal transfer Rp {parseInt(amount).toLocaleString('id-ID')}</li>
                  <li>Periksa kembali detail transfer</li>
                  <li>Masukkan PIN dan konfirmasi transfer</li>
                  <li>Simpan bukti transfer</li>
                </>
              )}
              {paymentDetails.methodId === 'ewallet' && (
                <>
                  <li>Buka aplikasi {paymentDetails.optionName}</li>
                  <li>Pilih menu Transfer/Kirim Uang</li>
                  <li>Masukkan nomor tujuan</li>
                  <li>Masukkan nominal Rp {parseInt(amount).toLocaleString('id-ID')}</li>
                  <li>Periksa detail pembayaran</li>
                  <li>Konfirmasi pembayaran</li>
                  <li>Simpan bukti pembayaran</li>
                </>
              )}
              {paymentDetails.methodId === 'qris' && (
                <>
                  <li>Buka aplikasi e-wallet pilihan Anda</li>
                  <li>Pilih menu Scan/Pay</li>
                  <li>Scan kode QR yang ditampilkan</li>
                  <li>Masukkan nominal Rp {parseInt(amount).toLocaleString('id-ID')}</li>
                  <li>Periksa detail pembayaran</li>
                  <li>Konfirmasi pembayaran</li>
                  <li>Simpan bukti pembayaran</li>
                </>
              )}
            </ol>
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Saya Sudah Membayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInstructionsModal; 