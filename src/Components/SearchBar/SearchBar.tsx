import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        placeholder="Search links by title, url, description, or tags..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
