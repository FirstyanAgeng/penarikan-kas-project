import { ADD_TRANSACTION, VERIFY_PAYMENT, REJECT_PAYMENT } from "../constants";
import { updateMemberPaymentStatus } from "./membersActions";

export const addTransaction = (transaction) => (dispatch) => {
  // For cash payments, set initial status as pending
  const transactionWithStatus = {
    ...transaction,
    status: transaction.paymentMethod === 'Tunai' ? 'pending' : 'verified',
    verificationDate: null
  };

  dispatch({
    type: ADD_TRANSACTION,
    payload: transactionWithStatus,
  });

  // Only update member payment status for non-cash or verified payments
  if (transactionWithStatus.paymentMethod !== 'Tunai') {
    dispatch(
      updateMemberPaymentStatus(
        transaction.memberId,
        transaction.amount,
        transaction.date
      )
    );
  }
};

export const verifyPayment = (transactionId, verificationDate) => (dispatch, getState) => {
  dispatch({
    type: VERIFY_PAYMENT,
    payload: { transactionId, verificationDate }
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

export const rejectPayment = (transactionId, rejectionDate) => ({
  type: REJECT_PAYMENT,
  payload: { transactionId, rejectionDate }
});
