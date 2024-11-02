import Section from './components/Section/Section';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import Notification from './components/Notification/Notification';
import appCss from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import {
  selectContacts,
  selectLoadingContacts,
  selectErrorContacts,
} from './redux/contactsSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoadingContacts);
  const error = useSelector(selectErrorContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Section>
        <h1 className={appCss.header}>Phonebook</h1>
      </Section>
      <Section className="form">
        <ContactForm />
      </Section>
      <Section className="searchInput">
        <SearchBox />
      </Section>
      <Section>
        {contacts.length > 0 ? <ContactList /> : <Notification />}
      </Section>
    </Container>
  );
};

export default App;
