import { createSlice } from '@reduxjs/toolkit';
import phoneBook from '../../../src/phoneBook.json';

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: phoneBook,
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      if (index !== -1) {
        state.contacts.splice(index, 1);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = phonebookSlice.actions;

export const selectContacts = state => state.phonebook.contacts;

export const selectFilter = state => state.phonebook.filter;

export const selectVisibleContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilter(state);
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

export default phonebookSlice.reducer;
