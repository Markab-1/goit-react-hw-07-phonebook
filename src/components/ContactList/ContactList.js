import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import s from './ContactList.module.css';
import { useDeleteContactMutation } from 'services/contacts';

const ContactList = ({ visibleContacts, error }) => {
  const [deleteContact] = useDeleteContactMutation();

  return (
    <div>
      {error && alert('There are no contacts to display')}
      {visibleContacts && (
        <ul className={s.list}>
          {visibleContacts.map(({ id, name, phone }) => (
            <li key={id} className={s.item}>
              <span className={s.contactsName}>{name}: </span>
              <span className={s.number}>{phone}</span>
              <button
                type="button"
                onClick={() => deleteContact(id)}
                className={s.btn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};

export default connect()(ContactList);
