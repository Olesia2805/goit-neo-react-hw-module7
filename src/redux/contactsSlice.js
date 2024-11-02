import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.items.push(payload);
    },
    deleteContact: (state, { payload }) => {
      state.items = state.items.filter(item => item.id !== payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

export const selectContacts = state => state.contacts.items;

// TODO:
/* Обробку усіх трьох екшенів(fulfilled, rejected, pending) та зміну даних у стані Redux
 зроби у властивості extraReducers слайсу контактів, а от властивість reducers з нього — прибери. */

// TODO:
/* У файлі слайсу контактів contactsSlice.js створи та експортуй 
мемоізований селектор selectFilteredContacts за допомогою функції createSelector.

Селектор повинен залежати від поточних масиву контактів і значення фільтра,
та повертати відфільтрований масив контактів.

Селектор selectFilteredContacts імпортується у компонент
списка контактів ContactList.jsx та використовується у useSelector.*/
