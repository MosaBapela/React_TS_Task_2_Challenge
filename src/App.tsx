import './App.css';
import { useEffect, useState } from 'react';
import type { Link } from './Types/Link/Link';
import { Modal } from './Components/Modal/Modal';
import { getLinksFromStorage, saveLinksToStorage } from './Types/LocalStorage/LocalStorage';
import { Footer } from './Components/Footer/Footer';
import { MainContent } from './Components/MainContent/MainContent';
import { FormModal } from './Components/FormModal/FormModal';
import { LinkForm } from './Components/LinkForm/LinkForm';

function App() {
  const [links, setLinks] = useState<Link[]>(getLinksFromStorage);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDeleteId, setLinkToDeleteId] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [showForm, setShowForm] = useState(false);

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

  const openAddForm = () => {
    setEditingLink(null);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      {/* ── Navbar ── */}
      <header className="header">
        <div className="header-brand">
          <div className="brand-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="header-title">Link Vault</h1>
        </div>

        <div className="header-action">
          <button className="addButton" onClick={openAddForm}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Link
          </button>
        </div>
      </header>

      {/* ── Main page ── */}
      <main className="main-content">
        <MainContent
          links={links}
          onEdit={handleEditLink}
          onDelete={handleShowDeleteModal}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onSelectFromList={(link) => setSelectedLink(link)}
          onAddLink={openAddForm}
        />
      </main>

      {/* ── Add / Edit modal ── */}
      {showForm && (
        <FormModal
          onClose={() => { setShowForm(false); setEditingLink(null); }}
          title={editingLink ? 'Edit Link' : 'Add New Link'}
        >
          <LinkForm
            onSave={(link) => { handleSaveLink(link); setShowForm(false); }}
            editingLink={editingLink}
            onCancelEdit={() => { setShowForm(false); setEditingLink(null); }}
          />
        </FormModal>
      )}

      {/* ── Delete confirm modal ── */}
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
