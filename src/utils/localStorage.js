// Keys for localStorage
const STORAGE_KEYS = {
  TRANSACTIONS: 'kas_transactions',
  MEMBERS: 'kas_members',
  SETTINGS: 'kas_settings'
};

// Load data from localStorage
export const loadState = () => {
  try {
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const members = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

    return {
      transactions: transactions ? JSON.parse(transactions) : { transactions: [] },
      members: members ? JSON.parse(members) : { members: [], targetPaymentPerMember: 0, statistics: {} },
      settings: settings ? JSON.parse(settings) : null
    };
  } catch (err) {
    console.error('Error loading from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    // Save transactions
    localStorage.setItem(
      STORAGE_KEYS.TRANSACTIONS,
      JSON.stringify(state.transactions)
    );

    // Save members
    localStorage.setItem(
      STORAGE_KEYS.MEMBERS,
      JSON.stringify(state.members)
    );

    // Save settings
    if (state.settings) {
      localStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(state.settings)
      );
    }
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}; 