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
  onAddLink?: () => void;
}

export const MainContent: React.FC<Props> = ({
  links, onEdit, onDelete, searchQuery, onSearch, onSelectFromList, onAddLink,
}) => {
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

  const allCategories = useMemo(() => Array.from(new Set([...CATEGORIES, DEFAULT_CATEGORY])), []);

  const searchFiltered = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return links.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.url.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [links, searchQuery]);

  const clearAll = () => { setCategoryFilter(null); onSearch(''); };

  return (
    <section className={styles.main}>

      {/* ── Stats bar ── */}
      <div className={styles.statsRow}>
        <M.div whileHover={{ scale: 1.03 }} className={styles.statCard}>
          <span className={styles.statValue}>{totalLinks}</span>
          <span className={styles.statLabel}>Total Links</span>
        </M.div>
        <M.div whileHover={{ scale: 1.03 }} className={styles.statCard}>
          <span className={styles.statValue}>{uniqueTags}</span>
          <span className={styles.statLabel}>Unique Tags</span>
        </M.div>
        <M.div
          whileHover={{ scale: 1.03 }}
          className={`${styles.statCard} ${styles.statCardClickable}`}
          onClick={() => setCategoryFilter(mostUsedCategory)}
          title={`Filter by ${mostUsedCategory}`}
        >
          <span className={styles.statValue}>{mostUsedCategory}</span>
          <span className={styles.statLabel}>Top Category</span>
        </M.div>
      </div>

      {/* ── Search + filter bar ── */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
        </div>
        {onAddLink && (
          <button className={styles.fabAdd} onClick={onAddLink} title="Add new link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New Link
          </button>
        )}
      </div>

      {/* ── Category tabs ── */}
      <div className={styles.tabsRow}>
        <M.button layout whileHover={{ y: -2 }}
          className={`${styles.tab} ${categoryFilter === null && !searchQuery ? styles.activeTab : ''}`}
          onClick={clearAll}>
          All <span className={styles.tabBadge}>{totalLinks}</span>
        </M.button>
        {allCategories.map(cat => (
          <M.button key={cat} layout whileHover={{ y: -2 }}
            className={`${styles.tab} ${categoryFilter === cat && !searchQuery ? styles.activeTab : ''}`}
            onClick={() => { setCategoryFilter(cat); onSearch(''); }}>
            {cat}
            <span className={styles.tabBadge}>{categoryCounts.get(cat) ?? 0}</span>
          </M.button>
        ))}
        {(categoryFilter || searchQuery) && (
          <button className={styles.clearBtn} onClick={clearAll} title="Clear filters">
            ✕ Clear
          </button>
        )}
      </div>

      {/* ── Search results ── */}
      {searchQuery && (
        <div className={styles.searchResults}>
          <p className={styles.searchHint}>
            {searchFiltered.length} result{searchFiltered.length !== 1 ? 's' : ''} for
            <strong> "{searchQuery}"</strong>
          </p>
          {searchFiltered.length === 0
            ? <p className={styles.empty}>No links match your search.</p>
            : <LinkList links={searchFiltered} onEdit={onEdit} onDelete={onDelete}
                onSelect={onSelectFromList} selectedId={null} />
          }
        </div>
      )}

      {/* ── Link grid (category view) ── */}
      {!searchQuery && (
        <div className={styles.listArea}>
          {categoryFilter ? (
            <div className={styles.categoryBlock}>
              <h3 className={styles.categoryHeading}>
                <span className={styles.categoryDot} />
                {categoryFilter}
                <span className={styles.categoryCount}>{categoryCounts.get(categoryFilter) ?? 0}</span>
              </h3>
              <LinkList
                links={links.filter(l => (l.category || DEFAULT_CATEGORY) === categoryFilter)}
                onEdit={onEdit} onDelete={onDelete} onSelect={onSelectFromList} selectedId={null}
              />
            </div>
          ) : (
            allCategories.map(cat => {
              const items = links.filter(l => (l.category || DEFAULT_CATEGORY) === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat} className={styles.categoryBlock}>
                  <h3 className={styles.categoryHeading}>
                    <span className={styles.categoryDot} />
                    {cat}
                    <span className={styles.categoryCount}>{items.length}</span>
                  </h3>
                  <LinkList links={items} onEdit={onEdit} onDelete={onDelete}
                    onSelect={onSelectFromList} selectedId={null} />
                </div>
              );
            })
          )}

          {totalLinks === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>No links yet</h3>
              <p>Start building your vault — add your first link above.</p>
              {onAddLink && (
                <button className={styles.emptyAction} onClick={onAddLink}>+ Add Your First Link</button>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MainContent;

