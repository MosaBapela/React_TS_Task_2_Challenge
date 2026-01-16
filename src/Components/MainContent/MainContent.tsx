import styles from './MainContent.module.css';
import type { Link } from '../../Types/Link/Link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
const M: any = motion;
import { SearchBar } from '../SearchBar/SearchBar';
import { LinkList } from '../LinkList/LinkList';
import { CATEGORIES, DEFAULT_CATEGORY } from '../../Types/Categories';

interface Props {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  onSearch: (q: string) => void;
  onSelectFromList?: (link: Link) => void;
}

export const MainContent: React.FC<Props> = ({ links, onEdit, onDelete, searchQuery, onSearch, onSelectFromList }) => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const totalLinks = links.length;
  const uniqueTags = useMemo(() => {
    const s = new Set<string>();
    links.forEach(l => l.tags.forEach(t => s.add(t)));
    return s.size;
  }, [links]);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    links.forEach(l => {
      const c = l.category || DEFAULT_CATEGORY;
      map.set(c, (map.get(c) ?? 0) + 1);
    });
    return map;
  }, [links]);

  const mostUsedCategory = useMemo(() => {
    let best = DEFAULT_CATEGORY;
    let bestCount = 0;
    categoryCounts.forEach((count, cat) => {
      if (count > bestCount) { best = cat; bestCount = count; }
    });
    return best;
  }, [categoryCounts]);

  // compute categories to show (include default + defined categories)
  const allCategories = useMemo(() => {
    const arr = Array.from(new Set([...CATEGORIES, DEFAULT_CATEGORY]));
    return arr;
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.intro}>
        <h2>Welcome to Link Storage</h2>
        <p className={styles.slogan}>Collect, organize, and revisit the links that matter — quickly.</p>
      </div>

      <div className={styles.topBar}>
        <div className={styles.searchWrap}>
          <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
        </div>
        <div className={styles.stats}>
          <M.button whileHover={{ scale: 1.03 }} className={styles.statBtn} onClick={() => { setCategoryFilter(null); onSearch(''); }}>Total Links: {totalLinks}</M.button>
          <M.button whileHover={{ scale: 1.03 }} className={styles.statBtn} onClick={() => { setCategoryFilter(mostUsedCategory); }}>Top Category: {mostUsedCategory}</M.button>
          <M.button whileHover={{ scale: 1.03 }} className={styles.statBtn} onClick={() => alert(`Unique tags: ${uniqueTags}`)}>Unique Tags: {uniqueTags}</M.button>
        </div>
      </div>

      {/* show search results directly under the bar when a query is active */}
      {searchQuery && (
        <div className={styles.searchResults}>
          <h4>Search results for "{searchQuery}"</h4>
          {links.filter(l => (
            l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
          )).length === 0 ? (
            <p className={styles.noLinksFound}>No results found.</p>
          ) : (
            <LinkList links={links.filter(l => (
              l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            ))} onEdit={onEdit} onDelete={onDelete} onSelect={onSelectFromList} selectedId={null} />
          )}
        </div>
      )}

      <div className={styles.breadcrumb}>
        {categoryFilter || searchQuery ? (
          <>
            <span>Home</span>
            {categoryFilter && <span>/ Category: {categoryFilter}</span>}
            {searchQuery && <span>/ Search: "{searchQuery}"</span>}
            <button className={styles.clearFilters} onClick={() => { setCategoryFilter(null); onSearch(''); }}>Clear filters</button>
          </>
        ) : (
          <span>Home</span>
        )}
      </div>

      <div className={styles.categoryTabs}>
        <M.button layout whileHover={{ y: -3 }} className={`${styles.tab} ${categoryFilter === null ? styles.activeTab : ''}`} onClick={() => { setCategoryFilter(null); onSearch(''); }}>All</M.button>
        {allCategories.map(cat => (
          <M.button key={cat} layout whileHover={{ y: -3 }} className={`${styles.tab} ${categoryFilter === cat ? styles.activeTab : ''}`} onClick={() => setCategoryFilter(cat)}>
            {cat} (<M.span layout>{categoryCounts.get(cat) ?? 0}</M.span>)
          </M.button>
        ))}
      </div>

      <div className={styles.listArea}>
        {categoryFilter ? (
          <>
            <h3 className={styles.categoryHeading}>{categoryFilter}</h3>
            <LinkList links={links.filter(l => (l.category || DEFAULT_CATEGORY) === categoryFilter)} onEdit={onEdit} onDelete={onDelete} onSelect={onSelectFromList} selectedId={null} />
          </>
        ) : (
          allCategories.map(cat => {
            const items = links.filter(l => (l.category || DEFAULT_CATEGORY) === cat);
            return (
              <div key={cat} className={styles.categoryBlock}>
                <h3 className={styles.categoryHeading}>{cat} ({items.length})</h3>
                <LinkList links={items} onEdit={onEdit} onDelete={onDelete} onSelect={onSelectFromList} selectedId={null} />
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default MainContent;
