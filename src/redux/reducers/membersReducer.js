import { ADD_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from "../constants";

const initialState = {
  members: [
    {
      id: "m1",
      name: "Ahmad Fauzi",
      totalPaid: 50000,
      status: "LUNAS",
      lastPaid: "15 Jan 2025",
    },
    {
      id: "m2",
      name: "Siti Nurhaliza",
      totalPaid: 30000,
      status: "BELUM LUNAS",
      lastPaid: "10 Jan 2025",
    },
    {
      id: "m3",
      name: "Budi Santoso",
      totalPaid: 50000,
      status: "LUNAS",
      lastPaid: "20 Jan 2025",
    },
    {
      id: "m4",
      name: "Dewi Sartika",
      totalPaid: 25000,
      status: "BELUM LUNAS",
      lastPaid: "05 Jan 2025",
    },
    {
      id: "m5",
      name: "Rizki Pratama",
      totalPaid: 50000,
      status: "LUNAS",
      lastPaid: "18 Jan 2025",
    },
    {
      id: "m6",
      name: "Maya Putri",
      totalPaid: 0,
      status: "BELUM BAYAR",
      lastPaid: "-",
    },
    {
      id: "m7",
      name: "Andi Wijaya",
      totalPaid: 40000,
      status: "BELUM LUNAS",
      lastPaid: "12 Jan 2025",
    },
    {
      id: "m8",
      name: "Lina Marlina",
      totalPaid: 50000,
      status: "LUNAS",
      lastPaid: "22 Jan 2025",
    },
    {
      id: "m9",
      name: "Doni Setiawan",
      totalPaid: 35000,
      status: "BELUM LUNAS",
      lastPaid: "08 Jan 2025",
    },
    {
      id: "m10",
      name: "Rini Susanti",
      totalPaid: 50000,
      status: "LUNAS",
      lastPaid: "25 Jan 2025",
    },
  ],
  targetPaymentPerMember: 50000, // Contoh: Target pembayaran per anggota
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return {
        ...state,
        members: [
          ...state.members,
          { ...action.payload, id: `m${state.members.length + 1}` },
        ],
      };
    case UPDATE_MEMBER:
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.payload.id
            ? { ...member, ...action.payload.updates }
            : member
        ),
      };
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
      };
    // Tambahkan logic untuk update totalPaid dan status saat ada transaksi
    case "UPDATE_MEMBER_PAYMENT_STATUS": // Ini akan dipanggil dari action transaksi
      return {
        ...state,
        members: state.members.map((member) => {
          if (member.id === action.payload.memberId) {
            const newTotalPaid = member.totalPaid + action.payload.amount;
            const newStatus =
              newTotalPaid >= state.targetPaymentPerMember
                ? "LUNAS"
                : "BELUM LUNAS";
            return {
              ...member,
              totalPaid: newTotalPaid,
              status: newStatus,
              lastPaid: action.payload.date,
            };
          }
          return member;
        }),
      };
    default:
      return state;
  }
};

export default membersReducer;
