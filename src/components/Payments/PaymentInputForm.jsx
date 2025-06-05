import React, { useState, useEffect } from "react";

function PaymentInputForm({ members, targetPaymentPerMember, onSavePayment }) {
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // YYYY-MM-DD
  const [description, setDescription] = useState("");
  const [changeOrDeficiency, setChangeOrDeficiency] = useState("");

  useEffect(() => {
    if (paymentAmount) {
      const amount = parseFloat(paymentAmount);
      const selectedMember = members.find((m) => m.id === selectedMemberId);
      const amountToPay =
        targetPaymentPerMember -
        (selectedMember ? selectedMember.totalPaid : 0);

      if (!isNaN(amount) && selectedMember) {
        const remainingOrChange = amount - amountToPay;
        if (remainingOrChange > 0) {
          setChangeOrDeficiency(
            `Kembalian: Rp ${remainingOrChange.toLocaleString("id-ID")}`
          );
        } else if (remainingOrChange < 0) {
          setChangeOrDeficiency(
            `Kekurangan: Rp ${Math.abs(remainingOrChange).toLocaleString(
              "id-ID"
            )}`
          );
        } else {
          setChangeOrDeficiency("Pas!");
        }
      } else {
        setChangeOrDeficiency("");
      }
    } else {
      setChangeOrDeficiency("");
    }
  }, [paymentAmount, selectedMemberId, members, targetPaymentPerMember]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedMemberId ||
      !paymentAmount ||
      isNaN(parseFloat(paymentAmount))
    ) {
      alert("Silakan pilih anggota dan masukkan jumlah pembayaran yang valid.");
      return;
    }

    const selectedMember = members.find((m) => m.id === selectedMemberId);
    if (!selectedMember) {
      alert("Anggota tidak ditemukan.");
      return;
    }

    const newTransaction = {
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      amount: parseFloat(paymentAmount),
      date: new Date(paymentDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      description: description || `Pembayaran kas ${selectedMember.name}`,
    };

    onSavePayment(newTransaction);

    // Reset form
    setSelectedMemberId("");
    setPaymentAmount("");
    setDescription("");
    setChangeOrDeficiency("");
    setPaymentDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="member-select"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Pilih Anggota:
        </label>
        <select
          id="member-select"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
          required
        >
          <option value="">-- Pilih Anggota --</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="payment-amount"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Jumlah Pembayaran:
        </label>
        <input
          type="number"
          id="payment-amount"
          placeholder="Masukkan jumlah (Rp)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          required
        />
        {changeOrDeficiency && (
          <p
            className={`mt-2 text-sm font-semibold ${
              changeOrDeficiency.includes("Kembalian")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {changeOrDeficiency}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="payment-date"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Tanggal Pembayaran:
        </label>
        <div className="relative">
          <input
            type="date"
            id="payment-date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            📅
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Keterangan (Opsional):
        </label>
        <textarea
          id="description"
          placeholder="Contoh: Kas bulan Januari"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 resize-y"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition duration-300 flex items-center justify-center space-x-2"
      >
        <span className="text-xl">💾</span> <span>Simpan Pembayaran</span>
      </button>
    </form>
  );
}

export default PaymentInputForm;
