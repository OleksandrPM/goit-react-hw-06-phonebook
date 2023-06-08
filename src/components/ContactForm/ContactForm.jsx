import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default ContactForm;

ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = event => {
    const { name, value } = event.currentTarget;

    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const onFormBtnClick = event => {
    event.preventDefault();
    const form = event.currentTarget;
    setName(form.elements.name.value.trim());
    setNumber(form.elements.number.value.trim());
    onSubmit({ name, number });
    form.reset();
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
