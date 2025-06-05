import { ADD_TRANSACTION } from "../constants";

const initialState = {
  transactions: [
    {
      id: "t1",
      memberId: "m10",
      memberName: "Rini Susanti",
      amount: 15000,
      date: "25 Januari 2025",
      description: "Kas bulan Januari",
    },
    {
      id: "t2",
      memberId: "m8",
      memberName: "Lina Marlina",
      amount: 20000,
      date: "22 Januari 2025",
      description: "Kas bulan Januari",
    },
  ],
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [
          { ...action.payload, id: `t${state.transactions.length + 1}` },
          ...state.transactions,
        ],
      };
    default:
      return state;
  }
};

export default transactionsReducer;
