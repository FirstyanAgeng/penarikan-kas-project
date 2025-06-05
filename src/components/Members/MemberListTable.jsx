import React, { useState } from "react";

function MemberListTable({
  members,
  onAddMember,
  onEditMember,
  onDeleteMember,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMemberData, setEditMemberData] = useState(null); // State untuk data anggota yang diedit

  const handleOpenAddModal = () => {
    setEditMemberData(null); // Pastikan tidak ada data edit saat buka modal tambah
    setShowAddModal(true);
  };

  const handleOpenEditModal = (member) => {
    setEditMemberData(member);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditMemberData(null);
  };

  const handleSaveMember = (memberData) => {
    if (editMemberData) {
      onEditMember(editMemberData.id, memberData); // Jika mode edit
    } else {
      onAddMember(memberData); // Jika mode tambah
    }
    handleCloseModal();
  };

  return (
    <div className="overflow-x-auto">
      <button
        onClick={handleOpenAddModal}
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300 flex items-center space-x-2"
      >
        <span className="text-xl">➕</span> <span>Tambah Anggota Baru</span>
      </button>

      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">No</th>
            <th className="py-3 px-6 text-left">Nama</th>
            <th className="py-3 px-6 text-left">Total Bayar</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-left">Terakhir Bayar</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {members.length > 0 ? (
            members.map((member, index) => (
              <tr
                key={member.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-left">{member.name}</td>
                <td className="py-3 px-6 text-left">
                  Rp {member.totalPaid.toLocaleString("id-ID")}
                </td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${
                      member.status === "LUNAS"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  {member.lastPaid || "-"}
                </td>
                <td className="py-3 px-6 text-center flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(member)}
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                    title="Edit Anggota"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(`Yakin ingin menghapus ${member.name}?`)
                      ) {
                        onDeleteMember(member.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                    title="Hapus Anggota"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500">
                Belum ada anggota. Tambahkan anggota baru!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Member Modal */}
      {showAddModal && (
        <AddEditMemberModal
          onClose={handleCloseModal}
          onSave={handleSaveMember}
          memberToEdit={editMemberData}
        />
      )}
    </div>
  );
}

// Modal untuk tambah/edit anggota
function AddEditMemberModal({ onClose, onSave, memberToEdit }) {
  const [name, setName] = useState(memberToEdit ? memberToEdit.name : "");
  const [initialPaid, setInitialPaid] = useState(
    memberToEdit ? memberToEdit.totalPaid : 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Nama anggota tidak boleh kosong.");
      return;
    }
    onSave({
      name,
      totalPaid: parseFloat(initialPaid) || 0,
      status: "",
      lastPaid: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {memberToEdit ? "Edit Anggota" : "Tambah Anggota Baru"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="member-name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nama Anggota:
            </label>
            <input
              type="text"
              id="member-name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="initial-paid"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Bayar Awal (jika ada):
            </label>
            <input
              type="number"
              id="initial-paid"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={initialPaid}
              onChange={(e) => setInitialPaid(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              {memberToEdit ? "Simpan Perubahan" : "Tambah Anggota"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemberListTable;
