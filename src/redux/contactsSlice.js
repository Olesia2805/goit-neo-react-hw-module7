import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

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

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const visibleContacts = contacts?.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return visibleContacts;
  }
);
