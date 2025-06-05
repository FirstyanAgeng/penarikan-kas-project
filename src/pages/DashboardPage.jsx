import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import {
  addMember,
  updateMember,
  deleteMember,
} from "../redux/actions/membersActions"; // Impor aksi anggota
import { addTransaction } from "../redux/actions/transactionsActions"; // Impor aksi transaksi
import { useNavigate } from "react-router-dom";
import PaymentInputForm from "../components/Payments/PaymentInputForm";
import MemberListTable from "../components/Members/MemberListTable";
import TransactionHistoryList from "../components/Payments/TransactionHIstoryList";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const members = useSelector((state) => state.members.members);
  const targetPaymentPerMember = useSelector(
    (state) => state.members.targetPaymentPerMember
  );
  const transactions = useSelector((state) => state.transactions.transactions);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Hitung ringkasan kas
  const totalKasTerkumpul = members.reduce(
    (sum, member) => sum + member.totalPaid,
    0
  );
  const anggotaSudahBayar = members.filter(
    (member) => member.status === "LUNAS"
  ).length;
  const anggotaBelumBayar = members.filter(
    (member) =>
      member.status === "BELUM LUNAS" || member.status === "BELUM BAYAR"
  ).length;

  const handleAddTransaction = (transactionData) => {
    // Disini kita memanggil action Redux untuk menambahkan transaksi
    dispatch(addTransaction(transactionData));
  };

  // Placeholder functions for member management (akan dipanggil dari MemberListTable atau modal)
  const handleAddMember = (newMember) => {
    dispatch(addMember(newMember));
  };
  const handleEditMember = (id, updates) => {
    dispatch(updateMember(id, updates));
  };
  const handleDeleteMember = (id) => {
    dispatch(deleteMember(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white p-6 rounded-b-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold flex items-center">
            💰 <span className="ml-2">Kas Kelas XII-A</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg">
              Selamat datang, {user ? user.name : "Admin"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-purple-500">
            <p className="text-4xl font-extrabold text-purple-700 mb-2">
              Rp {totalKasTerkumpul.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 text-lg">Total Kas Terkumpul</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-green-500">
            <p className="text-4xl font-extrabold text-green-700 mb-2">
              {anggotaSudahBayar}
            </p>
            <p className="text-gray-600 text-lg">Anggota Sudah Bayar</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-red-500">
            <p className="text-4xl font-extrabold text-red-700 mb-2">
              {anggotaBelumBayar}
            </p>
            <p className="text-gray-600 text-lg">Anggota Belum Bayar</p>
          </div>
        </div>

        {/* Input Pembayaran Kas */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="text-purple-500 mr-3">💳</span> Input Pembayaran
            Kas
          </h2>
          <PaymentInputForm
            members={members}
            targetPaymentPerMember={targetPaymentPerMember}
            onSavePayment={handleAddTransaction}
          />
        </div>

        {/* Daftar Anggota Kelas */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="text-purple-500 mr-3">👥</span> Daftar Anggota
            Kelas
          </h2>
          <MemberListTable
            members={members}
            onAddMember={handleAddMember}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
          />
        </div>

        {/* Riwayat Transaksi Terbaru */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="text-purple-500 mr-3">📄</span> Riwayat Transaksi
            Terbaru
          </h2>
          <TransactionHistoryList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
