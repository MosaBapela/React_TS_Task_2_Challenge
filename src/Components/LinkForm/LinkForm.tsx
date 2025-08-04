import { useEffect, useState } from 'react';
import type { Link } from '../../Types/Link/Link';
import styles from './LinkForm.module.css';

interface LinkFormProps {
  onSave: (link: Link) => void;
  editingLink: Link | null;
  onCancelEdit: () => void;
}

export const LinkForm: React.FC<LinkFormProps> = ({ onSave, editingLink, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setTags(editingLink.tags.join(', '));
    } else {
      setTitle('');
      setUrl('');
      setDescription('');
      setTags('');
    }
  }, [editingLink]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      return;
    }

    const newLink: Link = {
      id: editingLink ? editingLink.id : Date.now().toString(),
      title,
      url,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    onSave(newLink);
    onCancelEdit();
  };

  return (
    <form className={styles['link-form']} onSubmit={handleSubmit}>
      <h2>{editingLink ? 'Edit Link' : 'Add New Link'}</h2>
      <div className= {styles['form-group']}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className= {styles['form-group']}>
        <label htmlFor="url">Link (URL)</label>
        <input type="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="tags">Tags (comma separated)</label>
        <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className= {styles['form-actions']}>
        <button type="submit" className= {styles['save-button']}>{editingLink ? 'Update Link' : 'Save Link'}</button>
        {editingLink && <button type="button" className= {styles['cancel-button']} onClick={onCancelEdit}>Cancel</button>}
      </div>
    </form>
  );
};