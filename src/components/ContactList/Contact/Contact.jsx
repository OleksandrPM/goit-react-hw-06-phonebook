import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/contactsSlice';
import css from './Contact.module.css';

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();

  const sendDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <p className={css.name}>{name}:</p>
      <p className={css.number}>{number}</p>
      <button
        name="deleteBtn"
        className={css.delete_btn}
        onClick={sendDeleteContact}
      >
        Delete
      </button>
    </>
  );
}
