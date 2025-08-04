import type { Link } from "../Link/Link";

const STORAGE_KEY = 'link-vault-links';

export const getLinksFromStorage = (): Link[] => {
  try {
    const storedLinks = localStorage.getItem(STORAGE_KEY);
    return storedLinks ? JSON.parse(storedLinks) : [];
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
