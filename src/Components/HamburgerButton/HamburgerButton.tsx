import styles from './HamburgerButton.module.css';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerButton: React.FC<Props> = ({ isOpen, onToggle }) => {
  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
      aria-label="Toggle sidebar"
      onClick={onToggle}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default HamburgerButton;
