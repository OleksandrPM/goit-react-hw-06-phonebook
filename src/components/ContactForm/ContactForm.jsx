import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/contactsSlice';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onFormBtnClick = event => {
    event.preventDefault();
    const form = event.currentTarget;
    setName(form.elements.name.value.trim());
    setNumber(form.elements.number.value.trim());
    sendAddContact();
    form.reset();
  };

  const sendAddContact = () => {
    if (!isContactPresent(name, number, contacts)) {
      dispatch(addContact(name, number));
    } else {
      alert(`${name} is already in the contacts`);
    }
  };

  const onInputChange = event => {
    const { name, value } = event.currentTarget;

    if (name === 'name') {
      setName(value.trim());
    }
    if (name === 'number') {
      setNumber(value.trim());
    }
  };

  return (
    <form onSubmit={onFormBtnClick} className={css.form}>
      <label className={css.form_label}>
        <span>Name</span>
        <input
          type="text"
          name="name"
          onChange={onInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.form_label}>
        <span>Number</span>
        <input
          type="tel"
          name="number"
          onChange={onInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
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
