import styles from './Sidebar.module.css';
import type { Link } from '../../Types/Link/Link';
import { LinkList } from '../LinkList/LinkList';

interface Props {
  open: boolean;
  links: Link[];
  selectedId?: string | null;
  onSelect: (link: Link) => void;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ open, links, selectedId = null, onSelect, onClose }) => {
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`} aria-hidden={!open}>
      <div className={styles.header}>
        <h3>Saved Links</h3>
        <button className={styles.close} onClick={onClose} aria-label="Close sidebar">×</button>
      </div>

      <div className={styles.listWrap}>
        <LinkList
          links={links}
          onEdit={() => { /* sidebar only lists items; edit via main */ }}
          onDelete={() => { /* delete handled in main */ }}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
