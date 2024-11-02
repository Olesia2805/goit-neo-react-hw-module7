import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const initialState = { items: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(el => el.id !== payload.id);
      })
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.error = false;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          state.isLoading = false;
          state.error = true;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = state => state.contacts.items;
export const selectLoadingContacts = state => state.contacts.isLoading;
export const selectErrorContacts = state => state.contacts.error;

// TODO:
/* У файлі слайсу контактів contactsSlice.js створи та експортуй 
мемоізований селектор selectFilteredContacts за допомогою функції createSelector.

Селектор повинен залежати від поточних масиву контактів і значення фільтра,
та повертати відфільтрований масив контактів.

Селектор selectFilteredContacts імпортується у компонент
списка контактів ContactList.jsx та використовується у useSelector.*/
