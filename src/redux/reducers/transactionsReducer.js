import { ADD_TRANSACTION, DELETE_TRANSACTION, CLEAR_TRANSACTIONS, VERIFY_PAYMENT, REJECT_PAYMENT } from '../constants/index';

const initialState = {
  transactions: [],
  statistics: {
    totalTransactions: 0,
    totalAmount: 0,
    averageAmount: 0,
    lastTransactionDate: null
  }
};

const calculateStatistics = (transactions) => {
  const stats = {
    totalTransactions: transactions.length,
    totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
    averageAmount: transactions.length > 0 
      ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length 
      : 0,
    lastTransactionDate: transactions.length > 0 
      ? transactions[0].date 
      : null
  };
  return stats;
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION: {
      const newTransactions = [
        { 
          ...action.payload, 
          id: `t${state.transactions.length + 1}`,
          timestamp: new Date().toISOString()
        },
        ...state.transactions
      ];

      return {
        ...state,
        transactions: newTransactions,
        statistics: calculateStatistics(newTransactions)
      };
    }

    case DELETE_TRANSACTION: {
      const remainingTransactions = state.transactions.filter(
        transaction => transaction.id !== action.payload
      );

      return {
        ...state,
        transactions: remainingTransactions,
        statistics: calculateStatistics(remainingTransactions)
      };
    }

    case CLEAR_TRANSACTIONS:
      return {
        ...initialState
      };

    case VERIFY_PAYMENT:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.transactionId
            ? {
                ...transaction,
                status: 'verified',
                verificationDate: action.payload.verificationDate
              }
            : transaction
        )
      };

    case REJECT_PAYMENT:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.transactionId
            ? {
                ...transaction,
                status: 'rejected',
                verificationDate: action.payload.rejectionDate
              }
            : transaction
        )
      };

    default:
      return state;
  }
};

export default transactionsReducer;
