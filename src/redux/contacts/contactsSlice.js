import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        return [...state, action.payload];
      },
      prepare(name, number) {
        return { payload: { id: nanoid(), name: name, number: number } };
      },
    },
    deleteContact: {
      reducer(state, action) {
        return state.filter(contact => contact.id !== action.payload);
      },
      prepare(contactId) {
        return { payload: contactId };
      },
    },
    deleteAll: {
      reducer(state, action) {
        return [];
      },
    },
  },
});

export const { addContact, deleteContact, deleteAll } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
