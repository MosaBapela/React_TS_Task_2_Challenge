import styles from './LinkList.module.css';
import type { Link } from '../../Types/Link/Link';
import { LinkItem } from '../LinkItem/LinkItem'
import { AnimatePresence, motion } from 'framer-motion';
const M: any = motion;


interface LinkListProps {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onSelect?: (link: Link) => void;
  selectedId?: string | null;
}

export const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete, onSelect, selectedId = null }) => {
  return (
    <M.div className={styles['link-list-container']} layout>
      {links.length === 0 ? (
        <p className={styles['no-links-message']}>No links found. Add your first link!</p>
      ) : (
        <AnimatePresence>
          {links.map((link) => (
            <LinkItem key={link.id} link={link} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} selected={selectedId === link.id} />
          ))}
        </AnimatePresence>
      )}
    </M.div>
  );
};
