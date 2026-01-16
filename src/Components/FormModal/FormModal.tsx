import React from 'react';
import styles from './FormModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';
const M: any = motion;

interface Props {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 28 } },
  exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.18 } },
};

export const FormModal: React.FC<Props> = ({ onClose, title, children }) => {
  return (
    <AnimatePresence>
      <M.div
        className={styles.backdrop}
        role="dialog"
        aria-modal="true"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <M.div
          className={styles.modal}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <h3>{title ?? 'Add Link'}</h3>
            <button className={styles.close} aria-label="Close" onClick={onClose}>×</button>
          </div>
          <div className={styles.content}>{children}</div>
        </M.div>
      </M.div>
    </AnimatePresence>
  );
};

export default FormModal;
