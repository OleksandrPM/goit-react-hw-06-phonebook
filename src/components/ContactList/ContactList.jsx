import { useDispatch, useSelector } from 'react-redux';
import { deleteAll } from 'redux/contacts/contactsSlice';
import { getContacts } from 'redux/contacts/selectors';
import { getFilter } from 'redux/filter/selectors';
import Contact from './Contact';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const renderingContacts = filterContacts(contacts, filter);

  const sendDeleteAll = () => {
    dispatch(deleteAll());
  };

  return (
    <>
      {contacts.length > 0 ? (
        renderingContacts.length > 0 ? (
          <>
            <ul className={css.contact_list}>
              {renderingContacts.map(contact => {
                const { id, name, number } = contact;
                return (
                  <li className={css.contact_item} key={id}>
                    <Contact name={name} number={number} id={id} />
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={sendDeleteAll}
              className={css.delete_all_btn}
            >
              Delete all contacts
            </button>
          </>
        ) : (
          <p>No contacts were found for your request</p>
        )
      ) : (
        <p>There are no contacts in contact list</p>
      )}
    </>
  );
}

function filterContacts(contacts, filter) {
  if (filter === '') {
    return contacts;
  } else {
    return contacts.filter(contact =>
      contact['name'].toLowerCase().includes(filter)
    );
  }
}
