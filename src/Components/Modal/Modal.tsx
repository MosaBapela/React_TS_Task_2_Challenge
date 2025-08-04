import styles from './Modal.module.css';

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-content']}>
        <p>{message}</p>
        <div className= {styles['modal-actions']}>
          <button className= {styles['modal-confirm-button']}  onClick={onConfirm}>Confirm</button>
          <button className= {styles['modal-cancel-button']}  onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
