import { ADD_TRANSACTION, VERIFY_PAYMENT, REJECT_PAYMENT } from "../constants/index";
import { updateMemberPaymentStatus } from "./membersActions";

// Helper to generate unique ID
const generateTransactionId = () => {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const addTransaction = (transaction) => (dispatch) => {
  // For cash payments, set initial status as pending
  const transactionWithDetails = {
    ...transaction,
    id: generateTransactionId(),
    status: transaction.paymentMethod === 'Tunai' ? 'pending' : 'verified',
    verificationDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  dispatch({
    type: ADD_TRANSACTION,
    payload: transactionWithDetails,
  });

  // Only update member payment status for non-cash or verified payments
  if (transactionWithDetails.paymentMethod !== 'Tunai') {
    dispatch(
      updateMemberPaymentStatus(
        transaction.memberId,
        transaction.amount,
        transaction.date
      )
    );
  }
};

export const verifyPayment = (transactionId) => (dispatch, getState) => {
  const verificationDate = new Date().toISOString();
  
  dispatch({
    type: VERIFY_PAYMENT,
    payload: { 
      transactionId, 
      verificationDate,
      updatedAt: verificationDate
    }
  });

  // Get the transaction details to update member status
  const transaction = getState().transactions.transactions.find(t => t.id === transactionId);
  if (transaction) {
    dispatch(
      updateMemberPaymentStatus(
        transaction.memberId,
        transaction.amount,
        transaction.date
      )
    );
  }
};

export const rejectPayment = (transactionId) => ({
  type: REJECT_PAYMENT,
  payload: { 
    transactionId, 
    rejectionDate: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
});
