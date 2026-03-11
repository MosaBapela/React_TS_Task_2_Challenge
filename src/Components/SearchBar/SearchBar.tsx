import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  return (
    <div className={styles['search-bar']}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        placeholder="Search by title, URL, description or tags…"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search links"
      />
    </div>
  );
};

