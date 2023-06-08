import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import {
  pushToLocalStorage,
  getFromLocalStorage,
  clearStorage,
} from 'localStorage/local-storage';

import css from './App.module.css';

export default App;

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const phonebook = getFromLocalStorage();

    if (phonebook !== null) {
      setContacts(phonebook);
    }
  }, []);

  useEffect(() => {
    updateStorage(contacts);
  }, [contacts]);

  const addContact = inputData => {
    const { name, number } = inputData;

    if (!isContactPresent(name, number, contacts)) {
      setContacts([...contacts, createContactObj(inputData)].sort());
    } else {
      alert(`${name} is already in the contacts`);
    }
  };

  const onChangeFilterInput = debounce(event => {
    setFilter(event.target.value.trim().toLowerCase());
  }, 300);

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const clearPhonebook = () => {
    setContacts([]);
  };

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <section className={css.contacts}>
        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <Filter value={filter} onChange={onChangeFilterInput} />
        )}
        <ContactList
          contacts={contacts}
          filter={filter}
          onBtnClick={deleteContact}
          clearPhonebook={clearPhonebook}
        />
      </section>
    </div>
  );
}

function updateStorage(contacts) {
  if (contacts.length > 0) {
    pushToLocalStorage(contacts);
  }
  if (contacts.length === 0) {
    clearStorage();
  }
}

function createContactObj(inputData) {
  const id = nanoid();
  return { id, ...inputData };
}

function isContactPresent(name, number, contacts) {
  if (contacts.length > 0) {
    return contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number === number
    );
  } else {
    return false;
  }
}
