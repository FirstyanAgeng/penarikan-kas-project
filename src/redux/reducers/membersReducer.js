import {
  ADD_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER_PAYMENT_STATUS,
  SET_TARGET_PAYMENT
} from '../constants/index';

const initialState = {
  members: [],
  targetPaymentPerMember: 0,
  statistics: {
    totalMembers: 0,
    paidMembers: 0,
    unpaidMembers: 0,
    totalCollected: 0,
    targetTotal: 0
  }
};

const calculateStatistics = (members, targetPaymentPerMember) => {
  const stats = {
    totalMembers: members.length,
    paidMembers: members.filter(m => m.status === 'LUNAS').length,
    unpaidMembers: members.filter(m => m.status !== 'LUNAS').length,
    totalCollected: members.reduce((sum, m) => sum + m.totalPaid, 0),
    targetTotal: members.length * targetPaymentPerMember
  };
  return stats;
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER: {
      const newMembers = [
        ...state.members,
        {
          ...action.payload,
          id: `m${state.members.length + 1}`,
          totalPaid: action.payload.totalPaid || 0,
          status: action.payload.totalPaid >= state.targetPaymentPerMember ? 'LUNAS' : 'BELUM BAYAR',
          lastPaid: action.payload.totalPaid > 0 ? new Date().toLocaleDateString('id-ID') : '-'
        }
      ];
      
      return {
        ...state,
        members: newMembers,
        statistics: calculateStatistics(newMembers, state.targetPaymentPerMember)
      };
    }

    case UPDATE_MEMBER: {
      const updatedMembers = state.members.map(member =>
        member.id === action.payload.id
          ? { ...member, ...action.payload.updates }
          : member
      );

      return {
        ...state,
        members: updatedMembers,
        statistics: calculateStatistics(updatedMembers, state.targetPaymentPerMember)
      };
    }

    case DELETE_MEMBER: {
      const remainingMembers = state.members.filter(
        member => member.id !== action.payload
      );

      return {
        ...state,
        members: remainingMembers,
        statistics: calculateStatistics(remainingMembers, state.targetPaymentPerMember)
      };
    }

    case UPDATE_MEMBER_PAYMENT_STATUS: {
      const updatedMembers = state.members.map(member => {
        if (member.id === action.payload.memberId) {
          const newTotalPaid = member.totalPaid + action.payload.amount;
          return {
            ...member,
            totalPaid: newTotalPaid,
            status: newTotalPaid >= state.targetPaymentPerMember ? 'LUNAS' : 'BELUM LUNAS',
            lastPaid: action.payload.date
          };
        }
        return member;
      });

      return {
        ...state,
        members: updatedMembers,
        statistics: calculateStatistics(updatedMembers, state.targetPaymentPerMember)
      };
    }

    case SET_TARGET_PAYMENT: {
      return {
        ...state,
        targetPaymentPerMember: action.payload,
        statistics: calculateStatistics(state.members, action.payload)
      };
    }

    default:
      return state;
  }
};

export default membersReducer;
