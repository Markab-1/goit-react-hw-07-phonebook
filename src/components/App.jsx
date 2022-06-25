import PropTypes from 'prop-types';
import { useState } from 'react';

import Container from './Container/Container';
import Section from './Section/Section';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useGetContactByNameQuery } from 'services/contacts';

export const App = () => {
  function PhoneBook() {
    const [filter, setFilter] = useState('');

    const handleFilter = e => {
      const { value } = e.target;
      setFilter(value);

      console.log(e.target, 'filter:', filter);
    };

    const { visibleContacts, error } = useGetContactByNameQuery(undefined, {
      selectFromResult: ({ data, error }) => ({
        visibleContacts: data?.filter(item =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        ),
        error: error,
      }),
    });

    console.log('filter contacts: ', visibleContacts, error);

    return (
      <div>
        <Section title="Phonebook">
          <Form />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={handleFilter} />
          <ContactList visibleContacts={visibleContacts} error={error} />
        </Section>
      </div>
    );
  }

  return (
    <Container>
      <PhoneBook />
    </Container>
  );
};

App.propTypes = {
  state: PropTypes.shape({
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      })
    ),
    filter: PropTypes.string,
  }),
};
