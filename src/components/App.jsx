import { useSelector, useDispatch } from 'react-redux';
import NameForm from './NameForm/NameForm';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import Layout from './Layout';
import { addContact, deleteContact, setFilter, selectContacts, selectFilter } from './redux/phonebookSlice';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const handleSave = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Layout>
      <NameForm onSave={handleSave} />
      <Filter value={filter} onChange={handleFilterChange} />
      <Contacts contacts={visibleContacts} onDelete={handleDelete} />
    </Layout>
  );
}

export default App;