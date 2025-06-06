import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_PAYMENT_METHODS, UPDATE_CLASS_INFO, SET_TARGET_PAYMENT } from '../../redux/constants/index';

function SettingsPage() {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const targetPayment = useSelector(state => state.members.targetPaymentPerMember);
  const fileInputRef = useRef(null);
  
  const [classInfo, setClassInfo] = useState(settings.classInfo);
  const [paymentTarget, setPaymentTarget] = useState(targetPayment);
  const [paymentMethods, setPaymentMethods] = useState(settings.paymentMethods);

  const handleClassInfoChange = (e) => {
    const { name, value } = e.target;
    setClassInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (methodId, optionId, field, value) => {
    setPaymentMethods(prev => ({
      ...prev,
      [methodId]: {
        ...prev[methodId],
        options: prev[methodId].options.map(option =>
          option.id === optionId
            ? { ...option, [field]: value }
            : option
        )
      }
    }));
  };

  const handleMethodToggle = (methodId) => {
    setPaymentMethods(prev => ({
      ...prev,
      [methodId]: {
        ...prev[methodId],
        enabled: !prev[methodId].enabled
      }
    }));
  };

  const handleOptionToggle = (methodId, optionId) => {
    setPaymentMethods(prev => ({
      ...prev,
      [methodId]: {
        ...prev[methodId],
        options: prev[methodId].options.map(option =>
          option.id === optionId
            ? { ...option, enabled: !option.enabled }
            : option
        )
      }
    }));
  };

  const handleQRImageUpload = (e, methodId, optionId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePaymentMethodChange(methodId, optionId, 'qrCodeImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    // Update class info
    dispatch({
      type: UPDATE_CLASS_INFO,
      payload: classInfo
    });

    // Update payment methods
    dispatch({
      type: UPDATE_PAYMENT_METHODS,
      payload: paymentMethods
    });

    // Update target payment
    dispatch({
      type: SET_TARGET_PAYMENT,
      payload: parseInt(paymentTarget)
    });

    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengaturan</h1>

      {/* Class Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Informasi Kelas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Kelas
            </label>
            <input
              type="text"
              name="name"
              value={classInfo.name}
              onChange={handleClassInfoChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Contoh: XII IPA 1"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tahun Akademik
            </label>
            <input
              type="text"
              name="academicYear"
              value={classInfo.academicYear}
              onChange={handleClassInfoChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Contoh: 2024/2025"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Semester
            </label>
            <select
              name="semester"
              value={classInfo.semester}
              onChange={handleClassInfoChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Pilih Semester</option>
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Target Pembayaran per Anggota
            </label>
            <input
              type="number"
              value={paymentTarget}
              onChange={(e) => setPaymentTarget(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Contoh: 50000"
            />
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Metode Pembayaran</h2>
        
        {Object.values(paymentMethods).map(method => (
          <div key={method.id} className="mb-6 border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{method.icon}</span>
                <h3 className="text-lg font-semibold">{method.name}</h3>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={method.enabled}
                  onChange={() => handleMethodToggle(method.id)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span className="ml-2 text-gray-700">Aktif</span>
              </label>
            </div>

            <div className="space-y-4">
              {method.options.map(option => (
                <div key={option.id} className="pl-4 border-l-4 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{option.name}</span>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={option.enabled}
                        onChange={() => handleOptionToggle(method.id, option.id)}
                        className="form-checkbox h-5 w-5 text-purple-600"
                      />
                      <span className="ml-2 text-gray-700">Aktif</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {method.id === 'qris' ? (
                      <>
                        <div className="col-span-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            QR Code
                          </label>
                          <div className="flex items-center space-x-4">
                            {option.qrCodeImage ? (
                              <div className="relative">
                                <img 
                                  src={option.qrCodeImage} 
                                  alt="QRIS Code" 
                                  className="w-48 h-48 object-contain border rounded-lg"
                                />
                                <button
                                  onClick={() => handlePaymentMethodChange(method.id, option.id, 'qrCodeImage', '')}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <button
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                                >
                                  Upload QR Code
                                </button>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleQRImageUpload(e, method.id, option.id)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={option.accountNumber}
                            onChange={(e) => handlePaymentMethodChange(
                              method.id,
                              option.id,
                              'accountNumber',
                              e.target.value
                            )}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            placeholder="ID QRIS (Opsional)"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={option.accountNumber}
                          onChange={(e) => handlePaymentMethodChange(
                            method.id,
                            option.id,
                            'accountNumber',
                            e.target.value
                          )}
                          className="px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Nomor Rekening/Akun"
                        />
                        {option.accountName !== undefined && (
                          <input
                            type="text"
                            value={option.accountName}
                            onChange={(e) => handlePaymentMethodChange(
                              method.id,
                              option.id,
                              'accountName',
                              e.target.value
                            )}
                            className="px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Nama Pemilik Rekening"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}

export default SettingsPage; 