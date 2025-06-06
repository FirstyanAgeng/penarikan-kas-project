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
  const memberStats = useSelector((state) => state.members.statistics) || {
    totalMembers: 0,
    paidMembers: 0,
    unpaidMembers: 0,
    totalCollected: 0,
    targetTotal: 0
  };
  const targetPaymentPerMember = useSelector(
    (state) => state.members.targetPaymentPerMember
  ) || 0;
  const transactions = useSelector((state) => state.transactions.transactions) || [];
  const settings = useSelector((state) => state.settings) || {
    classInfo: {
      name: '',
      academicYear: '',
      semester: ''
    }
  };
  const { classInfo } = settings;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddTransaction = (transactionData) => {
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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {classInfo.name || "Kas Kelas"}
            </h1>
            <p className="text-gray-600">
              {classInfo.academicYear
                ? `Tahun Akademik ${classInfo.academicYear} - Semester ${classInfo.semester}`
                : "Silakan atur informasi kelas di halaman pengaturan"}
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Target per Anggota: Rp {targetPaymentPerMember.toLocaleString("id-ID")}</p>
            <p>Total Target: Rp {memberStats.targetTotal.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Terkumpul</p>
              <p className="text-2xl font-bold text-purple-600">
                Rp {memberStats.totalCollected.toLocaleString("id-ID")}
              </p>
            </div>
            <span className="text-3xl">💰</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sudah Lunas</p>
              <p className="text-2xl font-bold text-green-600">
                {memberStats.paidMembers} Anggota
              </p>
            </div>
            <span className="text-3xl">✅</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Belum Lunas</p>
              <p className="text-2xl font-bold text-red-600">
                {memberStats.unpaidMembers} Anggota
              </p>
            </div>
            <span className="text-3xl">⚠️</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Anggota</p>
              <p className="text-2xl font-bold text-blue-600">
                {memberStats.totalMembers} Anggota
              </p>
            </div>
            <span className="text-3xl">👥</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Payment Input Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="text-purple-500 mr-3">💳</span> Input Pembayaran
            </h2>
            <PaymentInputForm
              members={members}
              targetPaymentPerMember={targetPaymentPerMember}
              onSavePayment={handleAddTransaction}
            />
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="text-purple-500 mr-3">📄</span> Riwayat Transaksi
            </h2>
            <TransactionHistoryList transactions={transactions} />
          </div>
        </div>

        {/* Right Column - Member List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="text-purple-500 mr-3">👥</span> Daftar Anggota
          </h2>
          <MemberListTable
            members={members}
            onAddMember={handleAddMember}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
