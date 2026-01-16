import type { Link } from "../Link/Link";
import { DEFAULT_CATEGORY } from '../Categories';

const STORAGE_KEY = 'link-vault-links';

export const getLinksFromStorage = (): Link[] => {
  try {
    const storedLinks = localStorage.getItem(STORAGE_KEY);
    const parsed = storedLinks ? JSON.parse(storedLinks) : [];
    // ensure backward compatibility: add default category if missing
    return parsed.map((l: any) => ({
      id: l.id,
      title: l.title ?? '',
      url: l.url ?? '',
      description: l.description ?? '',
      tags: Array.isArray(l.tags) ? l.tags : (typeof l.tags === 'string' ? l.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []),
      category: l.category ?? DEFAULT_CATEGORY,
    }));
  } catch (error) {
    console.error('Failed to parse links from local storage:', error);
    return [];
  }
};

export const saveLinksToStorage = (links: Link[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch (error) {
    console.error('Failed to save links to local storage:', error);
  }
};
