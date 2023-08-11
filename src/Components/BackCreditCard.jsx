import styles from '../styles/CreditCard.module.scss';

export function BackCreditCard({cvc}) {
	return <div className={`${styles.credit_card_back} ${styles.credit_card}`}>
    <div className={styles.cvc}>{cvc}</div>
  </div>;
}
