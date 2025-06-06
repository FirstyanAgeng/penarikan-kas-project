import { UPDATE_PAYMENT_METHODS, UPDATE_CLASS_INFO } from '../constants/index';

const initialState = {
  classInfo: {
    name: '',
    description: '',
    academicYear: '',
    semester: ''
  },
  paymentMethods: {
    cash: {
      id: 'cash',
      name: 'Tunai',
      icon: '💵',
      enabled: true,
      options: [
        { id: 'cash', name: 'Pembayaran Tunai', accountNumber: '-', enabled: true }
      ]
    },
    bank_transfer: {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      icon: '🏦',
      enabled: true,
      options: [
        { id: 'bca', name: 'BCA', accountNumber: '', accountName: '', enabled: true },
        { id: 'mandiri', name: 'Mandiri', accountNumber: '', accountName: '', enabled: true },
        { id: 'bni', name: 'BNI', accountNumber: '', accountName: '', enabled: true }
      ]
    },
    ewallet: {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: '📱',
      enabled: true,
      options: [
        { id: 'gopay', name: 'GoPay', accountNumber: '', accountName: '', enabled: true },
        { id: 'ovo', name: 'OVO', accountNumber: '', accountName: '', enabled: true },
        { id: 'dana', name: 'DANA', accountNumber: '', accountName: '', enabled: true }
      ]
    },
    qris: {
      id: 'qris',
      name: 'QRIS',
      icon: '📲',
      enabled: true,
      options: [
        { id: 'qris', name: 'Scan QRIS', accountNumber: '', qrCodeImage: '', enabled: true }
      ]
    }
  }
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: {
          ...state.paymentMethods,
          ...action.payload
        }
      };
    
    case UPDATE_CLASS_INFO:
      return {
        ...state,
        classInfo: {
          ...state.classInfo,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

export default settingsReducer; 