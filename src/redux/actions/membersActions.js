import { ADD_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from "../constants";

export const addMember = (member) => ({
  type: ADD_MEMBER,
  payload: member,
});

export const updateMember = (id, updates) => ({
  type: UPDATE_MEMBER,
  payload: { id, updates },
});

export const deleteMember = (id) => ({
  type: DELETE_MEMBER,
  payload: id,
});

export const updateMemberPaymentStatus = (memberId, amount, date) => ({
  type: "UPDATE_MEMBER_PAYMENT_STATUS", // Action baru untuk update status pembayaran anggota
  payload: { memberId, amount, date },
});
