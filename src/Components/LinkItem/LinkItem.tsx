import type { Link } from '../../Types/Link/Link';
import styles from './LinkItem.module.css';
import { motion } from 'framer-motion';
const M: any = motion;

interface LinkItemProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onSelect?: (link: Link) => void;
  selected?: boolean;
}

export const LinkItem: React.FC<LinkItemProps> = ({ link, onEdit, onDelete, onSelect, selected = false }) => {
  const { title, url, description, tags } = link;
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(link);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(link.id);
  };

  return (
    <M.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`${styles['link-item']} ${selected ? styles['selected'] : ''}`}
      onClick={() => onSelect && onSelect(link)}
      role="button"
      tabIndex={0}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles['link-title']}
        onClick={(e) => e.stopPropagation()}
      >
        {title}
      </a>
      <div className={styles['link-category']}>{link.category}</div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles['link-url']}
        onClick={(e) => e.stopPropagation()}
      >
        {url}
      </a>
      {description && <p className= {styles['link-description']}>{description}</p>}
      <div className={styles['link-tags']}>
        {tags.map((tag, index) => (
          <span key={index} className={styles['tag']}>{tag}</span>
        ))}
      </div>
      <div className= {styles['link-actions']} >
        <button className= {styles['edit-button']} onClick={handleEdit}>Edit</button>
        <button className={styles['delete-button']} onClick={handleDelete}>Delete</button>
      </div>
    </M.div>
  );
};