import listCss from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={listCss.listCards}>
      {visibleContacts.map(contact => (
        <li className={listCss.listItem} key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
