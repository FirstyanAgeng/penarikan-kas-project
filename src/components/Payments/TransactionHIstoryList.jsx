import React from "react";

function TransactionHistoryList({ transactions }) {
  return (
    <div className="space-y-4">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full text-purple-600 text-2xl mr-4">
              {transaction.paymentMethod?.includes('Bank') ? '🏦' : 
               transaction.paymentMethod?.includes('Wallet') ? '📱' :
               transaction.paymentMethod?.includes('QRIS') ? '📲' : '💰'}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-800">
                Pembayaran Kas - {transaction.memberName}
              </p>
              <p className="text-sm text-gray-500">
                {transaction.date} • {transaction.description}
              </p>
              {transaction.paymentMethod && (
                <p className="text-xs text-purple-600 mt-1">
                  via {transaction.paymentMethod}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="font-bold text-green-600">
                + Rp {transaction.amount.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          Belum ada riwayat transaksi.
        </p>
      )}
    </div>
  );
}

export default TransactionHistoryList;
