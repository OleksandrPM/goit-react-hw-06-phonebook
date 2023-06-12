import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/selectors';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './App.module.css';

export default App;

function App() {
  const contacts = useSelector(getContacts);

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm />
      <section className={css.contacts}>
        <h2>Contacts</h2>
        {contacts.length > 0 && <Filter />}
        <ContactList />
      </section>
    </div>
  );
}
