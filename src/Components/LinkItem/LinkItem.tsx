import type { Link } from '../../Types/Link/Link';
import styles from './LinkItem.module.css';

interface LinkItemProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

export const LinkItem: React.FC<LinkItemProps> = ({ link, onEdit, onDelete }) => {
  const { title, url, description, tags } = link;

  return (
    <div className={styles['link-item']}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles['link-title']}>
        {title}
      </a>
      <p className= {styles['link-url']}>{url}</p>
      {description && <p className= {styles['link-description']}>{description}</p>}
      <div className={styles['link-tags']}>
        {tags.map((tag, index) => (
          <span key={index} className={styles['tag']}>{tag}</span>
        ))}
      </div>
      <div className= {styles['link-actions']} >
        <button className= {styles['edit-button']} onClick={() => onEdit(link)}>Edit</button>
        <button className={styles['delete-button']}  onClick={() => onDelete(link.id)}>Delete</button>
      </div>
    </div>
  );
};