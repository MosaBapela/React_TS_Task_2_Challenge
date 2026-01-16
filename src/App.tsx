import { useEffect, useState } from 'react';
import type { Link } from './Types/Link/Link';
import { Modal } from './Components/Modal/Modal';
import { getLinksFromStorage, saveLinksToStorage } from './Types/LocalStorage/LocalStorage';
import { Footer } from './Components/Footer/Footer'
import { MainContent } from './Components/MainContent/MainContent';
import { FormModal } from './Components/FormModal/FormModal';
import { LinkForm } from './Components/LinkForm/LinkForm';
// sidebar removed

function App() {
  const [links, setLinks] = useState<Link[]>(getLinksFromStorage);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDeleteId, setLinkToDeleteId] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Save links to local storage whenever the 'links' state changes
  useEffect(() => {
    saveLinksToStorage(links);
  }, [links]);

  const handleSaveLink = (newLink: Link) => {
    if (editingLink) {
      setLinks(links.map(link => (link.id === newLink.id ? newLink : link)));
    } else {
      setLinks([...links, newLink]);
    }
    setEditingLink(null);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    // open the modal form for editing
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowDeleteModal = (id: string) => {
    setLinkToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (linkToDeleteId) {
      setLinks(links.filter(link => link.id !== linkToDeleteId));
      if (selectedLink && selectedLink.id === linkToDeleteId) setSelectedLink(null);
    }
    setShowDeleteModal(false);
    setLinkToDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setLinkToDeleteId(null);
  };

  // filteredLinks is computed in MainContent so the full links array is passed down

  // no sidebar: keep selectedLink state for highlighting items

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title"><svg className="brand-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 8c2-3 6-4 9-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 16c-2 3-6 4-9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> Link Storage</h1>
        <div className="header-action">
          <button className="addButton _edit-button_t76q2_155" onClick={() => { setEditingLink(null); setShowForm(true); }}>Add Link</button>
        </div>
      </header>

      <main className="main-content">
        <MainContent
          links={links}
          onEdit={handleEditLink}
          onDelete={handleShowDeleteModal}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onSelectFromList={(link) => setSelectedLink(link)}
        />
      </main>

      {showForm && (
        <FormModal onClose={() => setShowForm(false)} title="Add New Link">
          <LinkForm
            onSave={(link) => { handleSaveLink(link); setShowForm(false); }}
            editingLink={editingLink}
            onCancelEdit={() => setShowForm(false)}
          />
        </FormModal>
      )}

      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this link?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;