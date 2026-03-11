import styles from './Footer.module.css';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.root}>
      <div className={styles['footer-cont']}>
        <span className={styles.copy}>© {year} Link Vault</span>
        <span className={styles.tagline}>Save links. Stay organised.</span>
      </div>
    </footer>
  );
};

