import styles from './LinkList.module.css';
import type { Link } from '../../Types/Link/Link';
import { LinkItem } from '../LinkItem/LinkItem'


interface LinkListProps {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

export const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
  return (
    <div className={styles['link-list-container']}>
      {links.length === 0 ? (
        <p className={styles['no-links-message']}>No links found. Add your first link!</p>
      ) : (
        links.map((link) => (
          <LinkItem key={link.id} link={link} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};
