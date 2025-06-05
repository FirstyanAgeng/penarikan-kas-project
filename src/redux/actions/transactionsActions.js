import { ADD_TRANSACTION } from "../constants";
import { updateMemberPaymentStatus } from "./membersActions";

export const addTransaction = (transaction) => (dispatch) => {
  dispatch({
    type: ADD_TRANSACTION,
    payload: transaction,
  });
  // Update member's total paid and status after adding transaction
  dispatch(
    updateMemberPaymentStatus(
      transaction.memberId,
      transaction.amount,
      transaction.date
    )
  );
};
