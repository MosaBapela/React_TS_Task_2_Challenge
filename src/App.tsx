import { useEffect, useState } from 'react';
import type { Link } from './Types/Link/Link';
import { Modal } from './Components/Modal/Modal';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { LinkForm } from './Components/LinkForm/LinkForm';
import { LinkList } from './Components/LinkList/LinkList';
import { getLinksFromStorage, saveLinksToStorage } from './Types/LocalStorage/LocalStorage';
import { Footer } from './Components/Footer/Footer'

function App() {
  const [links, setLinks] = useState<Link[]>(getLinksFromStorage);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDeleteId, setLinkToDeleteId] = useState<string | null>(null);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowDeleteModal = (id: string) => {
    setLinkToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (linkToDeleteId) {
      setLinks(links.filter(link => link.id !== linkToDeleteId));
    }
    setShowDeleteModal(false);
    setLinkToDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setLinkToDeleteId(null);
  };

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Link Storage</h1>
      </header>
      <main className="main-content">
        <div className="sidebar">
          <LinkForm onSave={handleSaveLink} editingLink={editingLink} onCancelEdit={() => setEditingLink(null)} />
        </div>
        <div className="content">
          <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
          <LinkList links={filteredLinks} onEdit={handleEditLink} onDelete={handleShowDeleteModal} />
        </div>
      </main>

      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this link?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

    <Footer/>  
    </div>
    
      
  );
}

export default App;